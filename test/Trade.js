const Trade = artifacts.require("./Trade.sol");
const TradeCreator = artifacts.require("./TradeCreator");

contract("Trade", accounts => {
  it("should create a contract with state 'created'", async () => {
    const myTrade = await Trade.deployed();

    const state = await myTrade.getState();

    assert.equal(state, "created");
  });
});

contract("Trade Creator", accounts => {
  it("should deploy contract instances and store them in an array", async () => {
    const creator = await TradeCreator.deployed();
    const params = [
      "0x8ea35ac607d9183378062e73fe159d6846175c0e",
      "0x74fdcdc9d698008100cbffa7696a5e5b809ace0e",
      200,
      1000
    ];

    await creator.addTrade(...params);
    const list = await creator.getTrades();
    const contract = await Trade.at(list[0]);
    const state = await contract.getState();

    assert.equal(state, "created");
    assert.equal(list.length, 1);
  });
});
