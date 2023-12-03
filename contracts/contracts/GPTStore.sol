// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IERC4907.sol";


contract GPTStore is IERC4907, ERC721URIStorage,  ReentrancyGuard {
    

    struct Assistant {
        string assistantID;
        uint256 pricePerHour;
    }

    struct UserInfo 
    {
        address user;   // address of user role
        uint64 expires; // unix timestamp, user expires
        uint256 payment;
        uint256 assistantNo;
    }

    uint256 private nftId = 1;
    address private devAddress;

    uint256 public minRentalTime = 1800; // 30 mins
    uint256 public maxRentalTime = 2592000; // 30 days

    mapping(uint256 => UserInfo) private _userInfo;
    mapping(uint256 => Assistant) public assistantsGroups;
    // Mapping to store rented assistants for each user
    mapping(address => uint256[]) private userRentedAssistants;
    uint256[] private assistantIds; // Array to store assistant IDs


    // Event emitted when a user rents an assistant
    event Rent(uint256 nftId, address indexed user);


    constructor()
     ERC721("GPTStore", "GPT")
     {
        devAddress = msg.sender;
     }

    function setAssistants(uint256 id, string memory serverId, uint256 priceHour) external {
        assistantsGroups[id] = Assistant(serverId, priceHour);
        assistantIds.push(id); // Add the assistant ID to the array
    }

    function getAssistantIds() external view returns (uint256[] memory) {
        return assistantIds;
    }

    function removeTemplate(uint256 id) external  {
        delete assistantsGroups[id];
    }

    function setMinRentalTime(uint256 time) external  {
        minRentalTime = time;
    }

    function setMaxRentalTime(uint256 time) external  {
        maxRentalTime = time;
    }
    
    
    function setUser(uint256, address, uint64) external pure override {
    revert("cannot change user");
  }

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    /// @param tokenId The NFT to get the user address for
    /// @return The user address for this NFT
    function userOf(uint256 tokenId) public view virtual returns(address){
        if( uint256(_userInfo[tokenId].expires) >=  block.timestamp){
            return  _userInfo[tokenId].user;
        }
        else{
            return address(0);
        }
    }

    /// @notice Get the user expires of an NFT
    /// @dev The zero value indicates that there is no user
    /// @param tokenId The NFT to get the user expires for
    /// @return The user expires for this NFT
    function userExpires(uint256 tokenId) public view virtual returns(uint256){
        return _userInfo[tokenId].expires;
    }

    function rent(string memory metadata, uint256 assistantNo) external payable nonReentrant {
        require(assistantsGroups[assistantNo].pricePerHour > 0, "Assistant template not found");
        cleanUpOldRentals();
        uint256 timeRequested = msg.value * 3600 / assistantsGroups[assistantNo].pricePerHour;
        require(timeRequested >= minRentalTime, "Minimum rental time not met");
        require(timeRequested <= maxRentalTime, "Exceeded maximum rental time");

        // Emit event before state changes
        emit Rent(nftId, msg.sender);

        // Transfer the correct payment to the seller
        payable(devAddress).transfer(msg.value);

        // Mint the NFT
        _mint(msg.sender, nftId);
        _setTokenURI(nftId, metadata);

        // Set user information for the rented NFT
        UserInfo storage info = _userInfo[nftId];
        info.user = msg.sender;
        info.expires = uint64(block.timestamp + timeRequested);
        info.assistantNo = assistantNo;
        info.payment = msg.value; // Store the actual payment
        emit UpdateUser(nftId, info.user, info.expires);

        // Store the rented assistant ID for the user
        userRentedAssistants[msg.sender].push(nftId);

        nftId++;
    }



   function extendRental(uint256 tokenId) external payable nonReentrant {
        require(userOf(tokenId) == msg.sender, "Caller is not owner");
        UserInfo storage user = _userInfo[tokenId];
        Assistant memory template = assistantsGroups[user.assistantNo];
        uint256 timeRequested = msg.value * 3600 / template.pricePerHour;
        require(user.expires + timeRequested < block.timestamp + maxRentalTime, "Max rental time exceeded");

        // Emit event before state changes
        emit Rent(nftId, msg.sender);

        // Transfer the correct payment to the seller
        payable(devAddress).transfer(msg.value);

        // Update user information for the extended rental
        user.expires = uint64(user.expires + timeRequested);
        user.payment += msg.value;
    }

    function stopRental(uint256 tokenId) external nonReentrant {
        require(userOf(tokenId) == msg.sender, "Caller is not owner");
        UserInfo storage user = _userInfo[tokenId];
        Assistant memory template = assistantsGroups[user.assistantNo];
        uint256 secondsLeft = (user.expires - block.timestamp) - 60; // Adjusted subtraction
        require(secondsLeft > 0, "Rental has already expired");

        // Emit event before state changes
        emit Rent(nftId, msg.sender);

        // Calculate the refund to be given to the renter
        uint256 creditsToGive = secondsLeft * template.pricePerHour / 3600;

        // Check contract balance
        require(address(this).balance >= creditsToGive, "Insufficient contract balance");

        // Transfer the correct payment to the renter
        payable(msg.sender).transfer(creditsToGive);

        // Update user information for the stopped rental
        user.payment -= creditsToGive;

        // Burn the NFT
        _burn(tokenId);
    }

    function getUserRentedAssistants(address user) external view returns (UserInfo[] memory) {
        uint256[] storage rentedIds = userRentedAssistants[user];
        UserInfo[] memory rentedAssistants = new UserInfo[](rentedIds.length);

        for (uint256 i = 0; i < rentedIds.length; i++) {
            rentedAssistants[i] = _userInfo[rentedIds[i]];
        }

        return rentedAssistants;
    }


    function cleanUpOldRentals() public  {
        for (uint256 tokenId = 1; tokenId < nftId; tokenId++) {
            if (userOf(tokenId) != address(0) && userExpires(tokenId) < block.timestamp) {
                // NFT has expired, burn it
                _burn(tokenId);
            }
        }
    }


    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC4907).interfaceId || super.supportsInterface(interfaceId);
    }

} 