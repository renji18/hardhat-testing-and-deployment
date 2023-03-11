const ethers = require('hardhat').ethers;
const run = require('hardhat').run;
const network = require('hardhat').network;
const {log} = require('console');

async function main(){
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  log('Deploying contract');
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  log(`Deployed contract to: ${simpleStorage.address}`);
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    const waitXBlocks = 6
    log(`Waiting for ${waitXBlocks} block confirmations`)
    await simpleStorage.deployTransaction.wait(waitXBlocks)
    await verify(simpleStorage.address, [])
  }

  const currentFavNum = await simpleStorage.retrieve()
  log(`Current value: ${currentFavNum}`)
  
  const updateFavNum = await simpleStorage.store(89)
  await updateFavNum.wait(1)
  const updatedFavNum = await simpleStorage.retrieve()
  log(`Updated value: ${updatedFavNum}`)
}

async function verify(contractAddress, args){
  log("Verifying contract...")
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (error) {
    if(e.message.toLowerCase().includes("already verified")){
      log("Already verified")
    } else {
      log(error)
    }
  }
  
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1)
  })