const TradeRepo = artifacts.require("TradeRepo");

module.exports = function(deployer) {
  deployer.deploy(TradeRepo);
};
