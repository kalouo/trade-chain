const TradeCreator = artifacts.require("TradeCreator");

module.exports = function(deployer) {
  deployer.deploy(TradeCreator);
};
