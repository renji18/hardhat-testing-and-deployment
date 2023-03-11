const ethers = require('hardhat').ethers
const {expect, assert} = require('chai')

// describe(name, function)
describe("SimpleStorage", function(){
  let simpleStorageFactory, simpleStorage

  // this.beforeEach, runs test cases on all occurance of the code in it running
  this.beforeEach(async function (){
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // 'it' checks for particular cases
  // it(desc, function)
  it("Should start with a favNum of 0", async function(){
    const currentFavNum = await simpleStorage.retrieve()
    const expectedVal = '0'
    assert.equal(currentFavNum.toString(), expectedVal)
    // expect(currentFavNum.toString()).to.equal(expectedVal)
  }),

  it("Should update when we call store", async function(){
    const expectedVal = '7'
    const txnResponse = await simpleStorage.store(expectedVal)
    await txnResponse.wait(1)
    const currentFavNum = await simpleStorage.retrieve()
    assert.equal(currentFavNum.toString(). expectedVal)
  })
})