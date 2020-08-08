const CustomToken = artifacts.require("CustomToken");

module.exports = async function (deployer) {
  await deployer.deploy(CustomToken, 10000);
};
