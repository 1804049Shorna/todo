import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
//import Web3 from "web3";

// internal imports

import { toDoListABI, toDoListAddress } from "./constants.js";

const fetchContract = (signerorProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerorProvider);
export const ToDoListContext = React.createContext();
export const ToDoListProvider = ({ children }) => {
  const [cuurentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAdress, setAllAddress] = useState([]);
  const [provider, setProvider] = useState();



  //connecting metamask
  const ifwalletisconnected = async () => {
    if (!window.ethereum) return setError("Please install metamask");
    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
      
    } else {
      setError("Please install metamask &connect and reload");
    }
  };

  //connect wallet
  //Requesting user to connect their wallet
  const connectwallet = async () => {
    if (!window.ethereum) return setError("Please install metamask");
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(account[0]);
  };
 
 
  // Interacting with smart contract

  const toDolist = async (message) => {
    try {
    //   coonecting with smart contract
    //   Here setting up the stage
    //   One kind of like the making connection with the DBMS in MYSQL
       

       // const contract = await fetchContract(signer);
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const contract =new ethers.Contract(toDoListAddress,toDoListABI,provider);
        //console.log("heloo contract is here ")
        console.log(contract);

        const createList =await contract.createList(message);
        createList.wait();

     
    } catch (error) {
      setError("Something wrong with creating list ");
    }
  };

  const getToDoList = async () => {
    try {
    } catch (error) {
      setError("Something wrong ");
    }
  };

  return (
    <ToDoListContext.Provider
      value={{
        ifwalletisconnected,
        toDolist,
        getToDoList
        
      }}
    >
      {children}
    </ToDoListContext.Provider>
  );
};

const ToDolistApp = () => {
  return <div></div>;
};

export default ToDolistApp;
