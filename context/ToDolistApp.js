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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract =new ethers.Contract(toDoListAddress,toDoListABI,provider);
         //console.log("heloo contract is here ")
        // console.log(contract);
        const getAllAddress=await contract.getAddress();
        setAllAddress(getAllAddress);
        console.log(getAllAddress);
        getAllAddress.map(async(el)=>{

            const getSingleData=await contract.getcreator(el);
            setAllToDoList.push(getToDoList);
            console.log(getSingleData);
        });

        const allMessage= await contract.getMessage();
        setMyList(allMessage);

        
    } catch (error) {
      setError("Something wrong ");
    }
  };

  //Change state of Todolist 
  const change=async(address)=>{
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract =new ethers.Contract(toDoListAddress,toDoListABI,provider);
        
        const state=await contract.toogle(address);
        state.wait();
        console.log(state);
    
    }catch(error){
        setError("Something Wrong here ");
    }
    

  }

  return (
    <ToDoListContext.Provider
      value={{
        ifwalletisconnected,
        toDolist,
        getToDoList,
        change,
        connectwallet,
        cuurentAccount,
        error,
        allToDoList,
        myList,
        allAdress



        
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
