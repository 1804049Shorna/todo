
import React, {useEffect, useState} from "react";

import Web3Modal from 'web3modal';

import { ethers } from "ethers";

// internal imports 

import { toDoListABI,toDoListAddress } from "./constants";

const fetchContract = (signerorProvider)=> new ethers.Contract(toDoListAddress,toDoListABI,signerorProvider);
export const ToDoListContext= React.createContext();
export const ToDoListProvider= ({children})=>{
    
    const[cuurentAccount,setCurrentAccount]=useState("");
    const[error ,setError]=useState("");
    const[allToDoList,setAllToDoList]=useState([]);
    const[myList,setMyList]=useState([]);
    const [allAdress, setAllAddress]=useState([]);

    //connecting metamask
     const ifwalletisconnected= async()=>{
        if(!window.ethereum) return setError("Please install metamask");
        const account= await window.ethereum.request({method:"eth_accounts"});
        //console.log(account[0]);
        if(account.length){
            setCurrentAccount(account[0]);
            console.log(account[0]);
           // console.log("Heloo");
        }else{
            setError("Please install metamask &connect and reload");
        }
     };

     //connect wallet 
     //Requesting user to connect their wallet 
     const connectwallet = async()=> {
        if(!window.ethereum) return setError("Please install metamask");
        const account= await window.ethereum.request({method:"eth_requestAccounts"});

        setCurrentAccount(account[0]);
     }

     // Interacting with smart contract
     
     const  toDolist= async()=>{
       // console.log("Heloo");
       
       try{

           
           // coonecting with smart contract 
           // Here setting up the stage
           // One kind of like the making connection with the DBMS in MYSQL 
        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        
        //  const provider = new ethers.providers.Web3Provider(connection);
     
        //  const signer = provider.getSigner();
        //  const contract = await fetchContract(signer);
            
        //  console.log(contract);
           





        } catch(error){
            setError("Something wrong with creating list ")
        }

     }






    

    return (
        <ToDoListContext.Provider value={{ifwalletisconnected,toDolist,connectwallet}}>
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