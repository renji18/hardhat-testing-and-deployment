const { task } = require('hardhat/config');
const { log } = require('console');

task('block-number', 'Prints the current block number').setAction(
  async(taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    log(`Current block number: ${blockNumber}`)
  }
)