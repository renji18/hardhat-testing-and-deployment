// task package in hardhat/config allows us to create custom plugin which we can import in hardhat.config and use to do custom functionality on our contract
const { task } = require('hardhat/config');
const { log } = require('console');

// task(name, desc).setAction(async(args, hre) => {code})

task('block-number', 'Prints the current block number').setAction(
  async(taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    log(`Current block number: ${blockNumber}`)
  }
)