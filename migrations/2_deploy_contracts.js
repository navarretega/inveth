const CustomToken = artifacts.require("CustomToken");
const CustomTokenSale = artifacts.require("CustomTokenSale");
const KycContract = artifacts.require("KycContract");
const ProjectFactory = artifacts.require("ProjectFactory");

module.exports = async function (deployer) {
  const addr = await web3.eth.getAccounts();
  const initialSupply = 10000;
  // Token
  await deployer.deploy(CustomToken, initialSupply);
  const customTokenInstance = await CustomToken.deployed();
  // KYC
  await deployer.deploy(KycContract);
  // Token Sale
  await deployer.deploy(CustomTokenSale, 1, addr[0], CustomToken.address, KycContract.address);
  await customTokenInstance.transfer(CustomTokenSale.address, initialSupply);
  // Projects
  await deployer.deploy(ProjectFactory);
  const projectFactoryInstance = await ProjectFactory.deployed();
  projectFactoryInstance.createProject(50, CustomToken.address);
  projectFactoryInstance.createProject(100, CustomToken.address);
};
