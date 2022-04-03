import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: '0.8.5',
    networks: {
        kovan: {
            url: `https://eth-kovan.alchemyapi.io/v2/`, // Append Alchemy API Token
            accounts: [''] // Add secret key
        }
    }
}

export default config;
