pragma solidity ^0.5.0;

contract Trade {
    struct TradeSummary {
        address seller;
        address buyer;
        uint quantity;
        uint price;
        string state; 
    }

    TradeSummary public tradeSummary;
    
    constructor (address _buyer, address _seller, uint _quantity, uint _price) public{
        tradeSummary.buyer = _buyer;
        tradeSummary.seller = _seller;
        tradeSummary.quantity = _quantity;
        tradeSummary.price = _price;
        tradeSummary.state = "created";
    }
    
    function getState() public view returns (string memory){
        return tradeSummary.state;
    }
    
    function getBalance() public view returns (uint){
        return address(this).balance;
    }

    modifier onlyBuyer() {
        require(msg.sender == tradeSummary.buyer,"Only buyer can call this.");
        _;
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
