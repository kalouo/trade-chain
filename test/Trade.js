const Trade = artifacts.require("./Trade.sol");
const TradeRepo = artifacts.require("./TradeRepo.sol");

contract("Trade", accounts => {
  it("should create a contract with state 'created'", async () => {
    const myTrade = await Trade.deployed();

    const state = await myTrade.getState();

    assert.equal(state, "created");
  });
  it("should create a contract with balance of 'zero", async () => {
    const myTrade = await Trade.deployed();

    const balance = await myTrade.getBalance();

    assert.equal(balance, 0);
  });
  it("should have a call to return tradeSummary", async () => {
    const params = [
      "0x8ea35ac607d9183378062e73fe159d6846175c0e",
      "0x74fdcdc9d698008100cbffa7696a5e5b809ace0e",
      200,
      1000
    ];
    const myTrade = await Trade.deployed();

    const info = await myTrade.tradeSummary.call();
    assert.equal(params[0], info.buyer.toLowerCase());
    assert.equal(params[1], info.seller.toLowerCase());
    assert.equal(params[2], info.quantity.words[0]);
    assert.equal(params[3], info.price.words[0]);
  });
});

// contract("Trade Repo", accounts => {
//   it("should retain contract instance addresses and store them in an array", async () => {
//     const creator = await TradeRepo.deployed();
//     const params = [
//       "0x8ea35ac607d9183378062e73fe159d6846175c0e",
//       "0x74fdcdc9d698008100cbffa7696a5e5b809ace0e",
//       200,
//       1000
//     ];

//   const creation = await Trade.new(...params)
//     .then(async res => {
//       const created = await Trade.at(res.address);
//       return created;
//     })
//     .then(async created => {
//       await creator.addTrade(created);
//       const state = await created.state.call();
//       const buyer = await created.buyer.call();
//       assert.equal(state, "created");
//       assert.equal(buyer, params[0]);
//     });
// });
// });
