# Blockchain Development

This is a dApp project made for an assignment of the Amsterdam University of Applied Sciences.

The project subject is a weight tracker which let's you set a weight goal, add weight measurements and gives you a reward in the form of an ERC271 (NFT) when the goal has been reached.

## Structure

```bash
.
├── frontend            # A Next.JS frontend to interact with the smart contract
│   ├── components
│   ├── constants
│   ├── pages
│   ├── public
│   └── styles
├── hardhat             # A Hardhat smart contract development environment 
│   ├── contracts
│   ├── scripts
│   └── tests
└── ipfs                # A local copy of the ERC271 (NFT) Metadata which is stored on the IPFS
```
