import React,{useState,useEffect,useContext} from "react";
import {Mdverified} from 'react';


//internal import 

import { ToDoListContext } from "@/context/ToDolistApp";


const Home=()=>{
   const{ifwalletisconnected,toDolist,connectContract}=useContext(ToDoListContext);
  
    useEffect (()=>{
        
        ifwalletisconnected();
        connectContract();
        toDolist();
     },[])


  return (
    <div>Home</div>
  )
}

export default Home;