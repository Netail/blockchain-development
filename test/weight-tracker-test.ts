import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import type { Contract } from 'ethers';
import { ethers } from 'hardhat';

let contract: Contract;
let owner: SignerWithAddress;
let addr1;
let addr2;

beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    const WeightTracker = await ethers.getContractFactory('WeightTracker');
    contract = await WeightTracker.deploy('https://www.hva.nl/webfiles/1641973328282/img/logo.svg');

    await contract.deployed();
});

describe('Weight Tracker', () => {

    it('Require goal to retrieve goal', async () => {
        await expect(contract.getGoal()).to.be.reverted;
    });

    it('Correctly set goal', async () => {
        const setContractTx = await contract.setGoal(70);

        await setContractTx.wait();

        const goal = await contract.getGoal();
        expect(goal).to.equal(70);
        expect(goal).to.not.equal(80);
    });

    it('Cannot set goal if one has been set already', async () => {
        const setContractTx = await contract.setGoal(70);

        await setContractTx.wait();

        expect(contract.setGoal(70)).to.be.reverted;
    });

    it('Require goal to add measurement', async () => {
        await expect(contract.addMeasurement(85)).to.be.reverted;
    });

    it('Correctly add measurements', async () => {
        let setContractTx;

        setContractTx = await contract.setGoal(70);
        await setContractTx.wait();

        setContractTx = await contract.addMeasurement(80);
        await setContractTx.wait();

        setContractTx = await contract.addMeasurement(75);
        await setContractTx.wait();

        const measurements = await contract.getMeasurements();
        expect(measurements).to.deep.equal([80, 75]);
        expect(measurements).to.not.deep.equal([80]);
    });

    it('Revert withdraw if goal did not got hit', async () => {
        let setContractTx;

        setContractTx = await contract.setGoal(70);
        await setContractTx.wait();

        setContractTx = await contract.addMeasurement(80);
        await setContractTx.wait();

        expect(contract.withdraw()).to.be.reverted;
    });

    it('Only allow withdraw if goal got hit', async () => {
        let setContractTx;

        setContractTx = await contract.setGoal(70);
        await setContractTx.wait();

        setContractTx = await contract.addMeasurement(70);
        await setContractTx.wait();

        expect(contract.withdraw()).to.be.ok;
    });

});
