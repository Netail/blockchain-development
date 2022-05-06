import { ethers } from 'hardhat';

async function main() {
    const Contract = await ethers.getContractFactory('WeightTracker');
    const contract = await Contract.deploy('https://ipfs.io/ipfs/QmcDamHSansZfsAKdmSbb3Puxw6GkNgSYAN8VgzcHbnWTZ?filename=nft.json');

    await contract.deployed();

    console.log('Contract deployed to:', contract.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
