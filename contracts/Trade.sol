pragma solidity ^0.5.0;

contract Trade {

    enum tradingState { created, funded, transit, completed}

    struct TradeSummary {
        address payable seller;
        address payable buyer;
        address carrier;
        uint quantity;
        uint price;
        tradingState state; 
    }

    TradeSummary public tradeSummary;
    
    constructor (address payable _buyer, address payable _seller, address _carrier, uint _quantity, uint _price) public{
        tradeSummary.buyer = _buyer;
        tradeSummary.seller = _seller;
        tradeSummary.carrier = _carrier;
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

    modifier onlyCarrier() {
        require(msg.sender == tradeSummary.carrier,"Only carrier can call this.");
        _;
    }
    
    modifier inTransit(){
        require(tradeSummary.state == tradingState.transit, "Shipment must be in transit for collection of proceeds.");
        _;
    }

    function dispatchCargo() external onlyCarrier {
        tradeSummary.state = tradingState.transit;
    }

    function sendFunds() external payable inTransit {
        tradeSummary.seller.transfer(address(this).balance);
        tradeSummary.state = tradingState.completed;
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
