const Trade = artifacts.require("Trade");
const params = [
  "0x8ea35ac607d9183378062e73fe159d6846175c0e",
  "0x74fdcdc9d698008100cbffa7696a5e5b809ace0e",
  "0x52273fdC9CD92c2777971Ea886b1AfCb6d40776E",
  200,
  1000
];

module.exports = function(deployer) {
  deployer.deploy(Trade, ...params);
};
