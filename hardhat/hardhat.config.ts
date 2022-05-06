import dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';

dotenv.config();

const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY || '';
const ALCHEMY_KOVAN_KEY = process.env.ALCHEMY_KOVAN_KEY || '';

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            // Default settings
        },
    },
    solidity: {
        version: '0.8.5',
    },
    paths: {
        tests: './tests',
    },
}

if (ETH_PRIVATE_KEY && ALCHEMY_KOVAN_KEY) {
    config.networks!.kovan = {
        url: `https://eth-kovan.alchemyapi.io/v2/${ALCHEMY_KOVAN_KEY}`,
        accounts: [ETH_PRIVATE_KEY]
    }
}

export default config;
