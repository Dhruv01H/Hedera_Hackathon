// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentSplitter {
    address payable[] public recipients;
    uint256[] public percentages;
    address public owner;

    event PaymentSplit(address indexed sender, uint256 totalAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can execute this");
        _;
    }

    constructor(address payable[] memory _recipients, uint256[] memory _percentages) {
        require(_recipients.length == _percentages.length, "Mismatched inputs");
        require(_recipients.length > 0, "Must have recipients");

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < _percentages.length; i++) {
            totalPercentage += _percentages[i];
        }
        require(totalPercentage == 100, "Total percentage must be 100");

        recipients = _recipients;
        percentages = _percentages;
        owner = msg.sender;
    }

    function splitPayment() public payable onlyOwner {
        require(msg.value > 0, "Send some HBAR to split");

        for (uint256 i = 0; i < recipients.length; i++) {
            uint256 amount = (msg.value * percentages[i]) / 100;
            recipients[i].transfer(amount);
        }

        emit PaymentSplit(msg.sender, msg.value);
    }

    function getRecipients() public view returns (address payable[] memory, uint256[] memory) {
        return (recipients, percentages);
    }

    // Allow contract to receive HBAR directly
    receive() external payable {}

    fallback() external payable {}
}
