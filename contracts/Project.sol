pragma solidity ^0.6.0;

import "./CustomToken.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";

contract ProjectFactory is Ownable {
    using SafeMath for uint256;
    Project[] public deployedProjects;
    mapping(address => uint256) public totalBalances;

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

    function setTotalBalances(address _sender, uint256 _tokens) public {
        totalBalances[_sender] = totalBalances[_sender].add(_tokens);
    }
}

contract Project {
    using SafeMath for uint256;
    CustomToken customToken;
    ProjectFactory projectFactory;
    uint256 public minimumTokens;
    mapping(address => uint256) public balances;
    mapping(address => bool) public contributers;

    constructor(uint256 _minTokens, address _token) public {
        minimumTokens = _minTokens;
        customToken = CustomToken(_token);
    }

    function contribute(uint256 _tokens, address _projectFactory) public {
        require(_tokens >= minimumTokens, "Not enough tokens");
        require(
            customToken.transferFrom(msg.sender, address(this), _tokens),
            "Transferring of tokens failed"
        );
        contributers[msg.sender] = true;
        balances[msg.sender] = balances[msg.sender].add(_tokens);
        projectFactory = ProjectFactory(_projectFactory);
        projectFactory.setTotalBalances(msg.sender, _tokens);
    }
}
