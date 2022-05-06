import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import type { Contract } from 'ethers';
import { ethers } from 'hardhat';

describe('Weight Tracker', () => {
    let contract: Contract;
    let owner, addr1: SignerWithAddress;

    beforeEach(async () => {
        [owner, addr1] = await ethers.getSigners();

        const WeightTracker = await ethers.getContractFactory('WeightTracker');
        contract = await WeightTracker.deploy('https://www.hva.nl/webfiles/1641973328282/img/logo.svg');

        await contract.deployed();
    });

    it('Require goal to retrieve goal', async () => {
        await expect(contract.getGoal()).to.be.reverted;
    });

    it('Correctly set goal', async () => {
        await contract.setGoal(70);

        const goal = await contract.getGoal();
        expect(goal).to.equal(70);
        expect(goal).to.not.equal(80);
    });

    it('Cannot set goal if one has been set already', async () => {
        await contract.setGoal(70);

        expect(contract.setGoal(70)).to.be.reverted;
    });

    it('Require goal to add measurement', async () => {
        await expect(contract.addMeasurement(85)).to.be.reverted;
    });

    it('Correctly add measurements', async () => {
        await contract.setGoal(70);
        await contract.addMeasurement(80);
        await contract.addMeasurement(75);

        const measurements = await contract.getMeasurements();
        expect(measurements).to.deep.equal([80, 75]);
        expect(measurements).to.not.deep.equal([80]);
        expect(measurements).to.not.deep.equal([75]);
    });

    it('Revert withdraw if goal did not got hit', async () => {
        await contract.setGoal(70);
        await contract.addMeasurement(80);

        expect(contract.withdraw()).to.be.reverted;
    });

    it('Only allow withdraw if goal got hit', async () => {
        await contract.setGoal(70);
        await contract.addMeasurement(70);

        expect(await contract.withdraw()).to.be.an('object');
    });

    it('Only allow withdraw if goal got hit (Below goal)', async () => {
        await contract.setGoal(70);
        await contract.addMeasurement(65);

        expect(await contract.withdraw()).to.be.an('object');
    });
});
