pragma solidity ^0.5.0;

contract Trade {

    enum tradingState { created, funded, transit, completed}

    struct TradeSummary {
        address seller;
        address buyer;
        uint quantity;
        uint price;
        tradingState state; 
    }

    TradeSummary public tradeSummary;
    
    constructor (address _buyer, address _seller, uint _quantity, uint _price) public{
        tradeSummary.buyer = _buyer;
        tradeSummary.seller = _seller;
        tradeSummary.quantity = _quantity;
        tradeSummary.price = _price;
        tradeSummary.state = tradingState.created;
    }
    
    function getState() public view returns (tradingState){
        return tradeSummary.state;
    }
    
    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    modifier onlyBuyer() {
        require(msg.sender == tradeSummary.buyer,"Only buyer can call this.");
        _;
    }
    function () external payable onlyBuyer{
        uint receivable = tradeSummary.price * tradeSummary.quantity;
        if (address(this).balance == receivable * 1000000000000000000)
            tradeSummary.state = tradingState.funded;
    }
}

contract TradeRepo {
    address[] tradeRepo;
    function addTrade(address _contractAddress) public {
        tradeRepo.push(_contractAddress);
    }
    function getTrades() public view returns (address[] memory) {
        return tradeRepo;
    }
}
