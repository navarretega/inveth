const CustomToken = artifacts.require("CustomToken");
const CustomTokenSale = artifacts.require("CustomTokenSale");
const KycContract = artifacts.require("KycContract");

module.exports = async function (deployer) {
  const addr = await web3.eth.getAccounts();
  const initialSupply = 10000;
  await deployer.deploy(CustomToken, initialSupply);
  await deployer.deploy(KycContract);
  await deployer.deploy(CustomTokenSale, 1, addr[0], CustomToken.address, KycContract.address);
  const customTokenInstance = await CustomToken.deployed();
  await customTokenInstance.transfer(CustomTokenSale.address, initialSupply);
};
