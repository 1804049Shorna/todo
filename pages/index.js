import React,{useState,useEffect,useContext} from "react";

import { MdVerified } from "react-icons/md";
import { RiSendPlaneFill ,RiCloseFill} from "react-icons/ri";
import {AiFillLock,AiFillUnlock} from "react-icons/ai";
import Image from "next/image";

//internal import 

import { ToDoListContext } from "@/context/ToDolistApp";

import Style from "../styles/index.module.css";
import Loading from "../loding.gif";
import Data from "../component/Data";



const Home=()=>{
   const[message,setMessage]=useState('');
   const{  ifwalletisconnected,
    toDolist,
    getToDoList,
    change,
    cuurentAccount,
    connectwallet,
    error,
    allToDoList,
    myList,
    allAdress
}=useContext(ToDoListContext);
  
    useEffect (()=>{
     // connectwallet();
        ifwalletisconnected();
        toDolist();
        getToDoList();
        change();
        //connectwallet();

     },[])


  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Loading}alt="Logo" width={50}height={50}/>
        <div className={Style.connect}>
          {!cuurentAccount ? (
            <button onClick={()=>connectwallet()}>connect wallet</button>
          ) : (
            <button >{cuurentAccount.slice(0,20)}...</button>
          )}

        </div>
      </div>
      <div className={Style.home_box}>
        <div className={Style.home_completed}>
          <h1>To Do History List</h1>
          <div>
            {myList.map((el,i)=>(
              <div className={Style.home_completed}>
                  <MdVerified className={Style.iconColor}/>
                  <p>{el.slice(0,30)}...</p>
                   
              </div>
            ))}
          </div>
        </div>
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create Blockchain To Do List</h2>
            <div className={Style.home_create_input}>
               <input type="Text" placeholder="write your to do" 
               onChange={(e)=>setMessage(e.target.value)}/>
               {cuurentAccount ? (
                <RiSendPlaneFill className={Style.iconBlack} onClick={()=>toDolist()}/>
               ) :(<RiSendPlaneFill className={Style.iconBlack} onClick={()=>connectwallet()}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;