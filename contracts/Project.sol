pragma solidity ^0.6.0;

import "./CustomToken.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract ProjectFactory is Ownable {
    Project[] public deployedProjects;

    function createProject(uint256 _minTokens, address _token)
        public
        onlyOwner
    {
        Project newProject = new Project(_minTokens, _token);
        deployedProjects.push(newProject);
    }

    function getDeployedProjects() public view returns (Project[] memory) {
        return deployedProjects;
    }
}

contract Project {
    using SafeMath for uint256;
    CustomToken customToken;
    uint256 public minimumTokens;
    mapping(address => uint256) public balances;
    mapping(address => bool) public contributers;

    constructor(uint256 _minTokens, address _token) public {
        minimumTokens = _minTokens;
        customToken = CustomToken(_token);
    }

    function contribute(uint256 _tokens) public {
        require(_tokens >= minimumTokens, "Not enough tokens");
        require(
            customToken.transferFrom(msg.sender, address(this), _tokens),
            "Transferring of tokens failed"
        );
        contributers[msg.sender] = true;
        balances[msg.sender] = balances[msg.sender].add(_tokens);
    }
}
