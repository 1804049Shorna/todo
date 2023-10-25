import React, { useEffect, useState } from "react";

import { ethers } from "ethers";
import Web3 from "web3";

// internal imports

import { toDoListABI, toDoListAddress } from "./constants";

const fetchContract = (signerorProvider) =>
  new ethers.Contract(toDoListAddress, toDoListABI, signerorProvider);
export const ToDoListContext = React.createContext();
export const ToDoListProvider = ({ children }) => {
  const [cuurentAccount, setCurrentAccount] = useState("");
  const [error, setError] = useState("");
  const [allToDoList, setAllToDoList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [allAdress, setAllAddress] = useState([]);
  const [provider, setProvider] = useState(null);

  //connecting metamask
  const ifwalletisconnected = async () => {
    if (!window.ethereum) return setError("Please install metamask");
    const account = await window.ethereum.request({ method: "eth_accounts" });
    //console.log(account[0]);
    if (account.length) {
      setCurrentAccount(account[0]);
      console.log(account[0]);
      // console.log("Heloo");
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
  //connecting with smar contract
  const connectContract = async () => {
   // console.log(toDoListABI, toDoListAddress);

    window.web3 = await new Web3(window.ethereum);
    window.contract = await new web3.eth.Contract(toDoListABI, toDoListAddress);

    console.log(window.contract);
  };
  // Interacting with smart contract

  const toDolist = async (message) => {
    try {
      // coonecting with smart contract
      // Here setting up the stage
      // One kind of like the making connection with the DBMS in MYSQL
      //   const web3Modal = new Web3Modal();

      //   const connection = await web3Modal.connect();

      //   const provider = new ethers.providers.Web3Provider(connection);

      //   const signer = provider.getSigner();

      //   const contract = await fetchContract(signer);

      //   const createList =await contract.createList(message);
      //   createList.wait();

      window.addEventListener("load", async () => {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log(provider);
          // Rest of your code
        } else {
          console.error(
            "No Ethereum provider found. Please install MetaMask or another compatible wallet."
          );
        }
      });

      // const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        toDoListABI,
        toDoListAddress,
        signer
      );

      console.log(contract);
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
        connectwallet,
        getToDoList,
        connectContract,
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
