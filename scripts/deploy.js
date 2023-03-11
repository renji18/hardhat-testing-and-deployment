const ethers = require('hardhat').ethers;
const run = require('hardhat').run;
const network = require('hardhat').network;
const {log} = require('console');

async function main(){
  // getContractFactory fn of ethers in hardhat, accesses the artifacts folder to check for the provided contract, we can skip the wallet, abi, binary steps that we had to in ethersjs
  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
  log('Deploying contract');
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed() // to wait till the contract is deployed, self explanatory
  log(`Deployed contract to: ${simpleStorage.address}`);

  // network package of hardhat allows us to access which environment the contract is deployed to
  // network.config.chainId allows us to check for a specific network environment
  if(network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY){
    const waitXBlocks = 6
    log(`Waiting for ${waitXBlocks} block confirmations`)
    // deployTransaction.wait(x) allows us to wait some blocks to check for authenticity and then proceed forward
    await simpleStorage.deployTransaction.wait(waitXBlocks)
    await verify(simpleStorage.address, [])
  }

  // we can then access the retrieve and store methods of simpleStorage
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
    // the run package of hardhat allows us to verify and publish our contract on etherscan in the code itself after it is deployed
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