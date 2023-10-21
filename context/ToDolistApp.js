
import React, {useEffect, useState} from "react";

import Web3Modal from 'web3modal';

import { ethers } from "ethers";

// internal imports 

import { toDoListABI,toDoListAddress } from "./constants";

const fetchContract = (signerorProvider)=> new ethers.Contract(toDoListAddress,toDoListABI,signerorProvider);
export const ToDoListContext= React.createContext();
export const ToDoListProvider= ({children})=>{
    
    const[cuurentAccount,setCurrentAccount]=useState();
    const[error ,setError]=useState();
    const[allToDoList,setAllToDoList]=useState();
    const[myList,setMyList]=useState();
    const [allAdress, setAllAddress]=useState();

    //connecting metamask
     const ifwalletisconnected= async()=>{
        if(!window.ethereum) return setError("Please install metamask");
        const account= await window.ethereum.request({method:"eth_accounts"});

        if(account.length){
            setCurrentAccount=account[0];
            console.log(account[0]);
        }else{
            setError("Please install metamask &connect and reload");
        }
     };
    //  useEffect (()=>{
    //     ifwalletisconnected() ;
    //  },[]);

    return (
        <ToDoListContext.Provider value={{ifwalletisconnected}}>
            {children}
        </ToDoListContext.Provider>
    )

}

const ToDolistApp =()=>{

    return (
        <div></div>
    )
}

export default ToDolistApp;