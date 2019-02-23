pragma solidity ^0.5.0;

contract Trade {
    address public seller;
    address public buyer;
    uint quantity;
    uint price;
    string state; 
    
    constructor (address _buyer, address _seller, uint _quantity, uint _price) public{
        buyer = _buyer;
        seller = _seller;
        quantity = _quantity;
        price = _price;
        state = "created";
        
    }
    
    function getState() public view returns (string memory){
        return state;
    }
    
    function getBalance() public view returns (uint){
        return address(this).balance;
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
