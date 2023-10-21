// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ToDoList{

    uint256 public _iduser;
    address public ownerofContract;

    address[] public creators;
    string[] public message;
    uint256[] public messageId;

    //property of every single user 

    struct ToDoListApp{
        address account;
        uint256 userId;
        string message;
        bool completed;

    }
    event ToDoEvent(

        address indexed account ,
        uint256 indexed userId,
        string message,
        bool completed
    );

   // map to get user information and their property
   mapping (address => ToDoListApp) public ToDoListApps;

   constructor(){
    ownerofContract=msg.sender;

   }
   //Implementing the function that will inncrement the user id 
   function inc()internal{
    _iduser++;

   }
   //function to implement the list 
   function createList (string calldata _message) external {
    inc();

    uint256 idNumber=_iduser;
    ToDoListApp storage toDo=ToDoListApps[msg.sender];

    toDo.account=msg.sender;
    toDo.message=_message;
    toDo.completed=false;
    toDo.userId=idNumber;

    creators.push(msg.sender);
    message.push(_message);
    messageId.push(idNumber);

    emit ToDoEvent(msg.sender, toDo.userId, _message,  toDo.completed);


   }
  //This is a function to get the single user data
   function getcreator (address) public view returns(address,uint256,string memory,bool){

     ToDoListApp memory singleUserData= ToDoListApps[msg.sender];
     return(
        singleUserData.account,
        singleUserData.userId,
        singleUserData.message,
        singleUserData.completed
     );

   }
   // to get the all the creators data
   function getAddress() external view returns (address[]memory){
    return creators;
   }

   // to get all the messages that has been enlisted by the creators 
   function getMessage() external view returns (string[] memory){
    return message;
   }

   // changing the satate of the task whether that is completed or not 
   function toogle(address _creator)public{
    ToDoListApp storage singleUserData=ToDoListApps[_creator];
    singleUserData.completed=!singleUserData.completed;
   }
   











}
