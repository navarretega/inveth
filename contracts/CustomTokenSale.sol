pragma solidity ^0.6.0;

import "./Crowdsale.sol";
import "./KycContract.sol";

contract CustomTokenSale is Crowdsale {
    
    KycContract kyc;
    constructor(uint256 rate, address payable wallet, IERC20 token, KycContract _kyc) Crowdsale(rate, wallet, token) public {
        kyc = _kyc;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(kyc.kycCompleted(beneficiary), "KYC not completed yet, aborting");
    }
}