const ColaFactory = artifacts.require("ColaFactory");
const ColaMixture = artifacts.require("ColaMixture");
const ColaPresentation = artifacts.require("ColaPresentation");

module.exports = function(deployer) {
  deployer.deploy(ColaFactory);
  deployer.deploy(ColaMixture);
  deployer.deploy(ColaPresentation)
};
