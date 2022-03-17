// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ReentrancyGuard.sol";

contract PolkaWar is Ownable, ReentrancyGuard {

    IERC20 public PWAR;
    uint256 public rewardMultiplier;
    // uint256[] public poolIdsForPlayer;
    mapping(uint256 => mapping(address => bool)) claimList;
    enum GameState { Opening, Waiting, Finished }

    constructor(address _tokenAddress, uint256 _rewardMultiplier) {
        PWAR = IERC20(_tokenAddress);
        rewardMultiplier = _rewardMultiplier;
    }

    struct GamePool {
        GameState state;
        uint256 id;
        // uint256 numberOfPlayers;
        uint256 tokenAmount; // token amount needed to enter pool
        bool drawStatus;
        address[] players;
        address[] winners;        
    }

    GamePool[] public pools;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event LogClaimAward(uint256 indexed pid, address indexed winnerAddress, uint256 award);

    // get number of pools
    function poolLength() external view returns (uint256) {
        return pools.length;
    }

    // add pool
    function addPool(
        // uint256 _numberOfPlayers,
        uint256 _tokenAmount
    ) external returns (uint256) {
        uint256 pid = pools.length;
        pools.push(
            GamePool({
                id : pools.length,
                // numberOfPlayers : _numberOfPlayers,
                state : GameState.Waiting,
                tokenAmount : _tokenAmount,
                players : new address[](0),
                winners : new address[](0),
                drawStatus: false
            })
        );
        pools[pid].players.push(msg.sender);
        PWAR.transferFrom(msg.sender, address(this), _tokenAmount);
        return pid;
    }

    // update pool
    function updatePool(
        uint256 _pid,
        // uint256 _numberOfPlayers,
        uint256 _tokenAmount
    ) external {
        require(_tokenAmount > 0, "zero token amount");
        GamePool storage pool = pools[_pid];
        require(pool.players[0] == msg.sender, "no permission");
        pool.tokenAmount = _tokenAmount;
        // pool.numberOfPlayers = _numberOfPlayers;
        
    }

    //get pool by pool id
    function getPoolInfoById(uint256 _pid) external view returns (
        GameState,
        uint256,
        uint256, // token amount needed to enter each pool\
        bool,
        address[] memory,
        address[] memory
        )  {
            GamePool storage pool = pools[_pid];
            return (pool.state, pool.id, pool.tokenAmount, pool.drawStatus, pool.players, pool.winners);
    }

    //get pool id by player address
    function getPoolIdsContainingPlayer(address _player) external view returns (uint256[] memory)
    {        
        for(uint256 i=0; i<pools.length; i++) 
            if(getPlayerIndexInPool(_player, i) >= 0 && pools[i].state != GameState.Finished)                
                // poolIds.push(i);
                length ++;
        uint256[] memory poolIds = new uint256[](length);
        uint256 index;
        for(uint256 i=0; i<pools.length; i++) 
            if(getPlayerIndexInPool(_player, i) >= 0 && pools[i].state != GameState.Finished) {
                poolIds[index] = i;
                index ++;
            }
        return poolIds;
    }

    //check if player in player list
    function getPlayerIndexInPool(address _player, uint256 _pid) public view returns (int256) {
        int256 playerIndex = -1;
        for(uint256 i=0;i<pools[_pid].players.length; i++)
            if(pools[_pid].players[i] == _player)
            {
                playerIndex = int(i);
                break;
            }
        return playerIndex;
    }

    //check if player in winner list
    function getWinnerIndexInPool(address _player, uint256 _pid) public view returns (int256) {
        int256 winnerIndex = -1;
        for(uint256 i=0;i<pools[_pid].winners.length; i++)
            if(pools[_pid].winners[i] == _player)
            {
                winnerIndex = int(i);
                break;
            }
        return winnerIndex;
    }

    // bet game
    function bet(uint256 _pid) external {        
        // check balance
        GamePool storage pool = pools[_pid];
        address[] storage players = pool.players;
        require(PWAR.balanceOf(msg.sender) >= pool.tokenAmount, "insufficient funds");        
        // check game status
        // require(pool.state == GameState.Opening || pool.state == GameState.Waiting, "unavailable status");
        require(pool.state == GameState.Waiting, "game was not created");
        require(getPlayerIndexInPool(msg.sender, _pid) < 0, "already existing player");
        players.push(msg.sender);

        // deposit token
        PWAR.transferFrom(msg.sender, address(this), pool.tokenAmount);
        emit Transfer(msg.sender, address(this), pool.tokenAmount);
    }

    // cancel game
    function revoke(uint256 _pid) external {
        GamePool storage pool = pools[_pid];
        address[] storage players = pool.players;
        // check balance
        require(PWAR.balanceOf(address(this)) >= pool.tokenAmount, "insufficient funds");
        require(players.length > 0, "invalid state");

        int256 playerIndex = getPlayerIndexInPool(msg.sender, _pid);
        require(playerIndex >= 0, "player not in the pool");
        // withdraw token
        uint256 refund = pool.tokenAmount * rewardMultiplier / 100;
        uint256 fee = pool.tokenAmount * (100 - rewardMultiplier) / 100;
        PWAR.transfer(msg.sender, refund);
        PWAR.transfer(owner(), fee);
        
        pool.state = GameState.Waiting;
        removePlayer(_pid, uint256(playerIndex));
        if(players.length <= 0)
            removePool(_pid);

        emit Transfer(address(this), msg.sender, refund);
    }

    //remove player from player list
    function removePlayer(uint256 _pid, uint256 _index) internal {
        address[] storage players = pools[_pid].players;
        for (uint256 i=_index; i<players.length - 1; i++)
            players[i] = players[i + 1];
        players.pop();
    }

    //remove pool from pool list
    function removePool(uint256 _pid) internal {
        for (uint256 i=_pid; i<pools.length - 1; i++)
            pools[i] = pools[i + 1];
        pools.pop();
    }

    // get game players
    function getGamePlayers(uint256 _pid) public view returns (address[] memory) {
        return pools[_pid].players;        
    }

    // update game status
    function updateGameStatus(uint256 _pid, address[] memory _winners, bool drawStatus) external onlyOwner {
        GamePool storage pool = pools[_pid];
        // check game status
        require(pool.players.length >= 2, "no valid time");
        pool.drawStatus = drawStatus;
        pool.winners = _winners;
        require(pool.drawStatus == true || pool.winners.length > 0, "failed in updating state");
        pool.state = GameState.Finished;
    }

    // claim award
    function claimAward(uint256 _pid) external nonReentrant {
        GamePool storage pool = pools[_pid];
        // check game status
        require(pool.state == GameState.Finished, "no valid time");
        address[] memory players = pool.players;
        require(getPlayerIndexInPool(msg.sender, _pid) >= 0, "player not found");
        // check if winner already claimed
        require(claimList[_pid][msg.sender] == false, "already claimed winner");
        if(pool.drawStatus == true) {
            uint256 refund = pool.tokenAmount * rewardMultiplier / 100;
            for(uint256 i=0; i<players.length; i++)
                PWAR.transfer(players[i], refund);
            uint256 fee = pool.tokenAmount * players.length * (100 - rewardMultiplier) / 100;
            PWAR.transfer(owner(), fee);
            emit LogClaimAward(_pid, msg.sender, refund);
            removePool(_pid);
        } else 
        {
            //check if caller is in winner list of the pool
            require(getWinnerIndexInPool(msg.sender, _pid) >= 0, "not winner, no permission");
            // send award
            uint256 award = pool.tokenAmount * players.length * rewardMultiplier / 100 / pool.winners.length;
            uint256 fee = pool.tokenAmount * players.length * (100 - rewardMultiplier) / 100;            
            PWAR.transfer(msg.sender, award);
            PWAR.transfer(owner(), fee);
            claimList[_pid][msg.sender] = true;
            emit LogClaimAward(_pid, msg.sender, award);
            // check all winners claimed, then remove pool
            bool claimedPool = true;
            for (uint256 i=0; i<pool.winners.length; i++)
                if(claimList[_pid][pool.winners[i]] != true)
                    claimedPool = false;
            if(claimedPool == true)
            {                
                removePool(_pid);
                for (uint256 i=0; i<pool.winners.length; i++)
                    claimList[_pid][pool.winners[i]] = false;
            }
        }        
    }

    // withdraw funds
    function withdrawFund() external onlyOwner {
        uint256 balance = PWAR.balanceOf(address(this));
        require(balance > 0, "not enough fund");
        PWAR.transfer(msg.sender, balance);
    }
}