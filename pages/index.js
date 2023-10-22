import React,{useState,useEffect,useContext} from "react";

//internal import 

import { ToDoListContext } from "@/context/ToDolistApp";


const Home=()=>{
   const{ifwalllweifwalletisconnected}=useContext(ToDoListContext);

    useEffect (()=>{
        ifwalletisconnected() ;
     },[]);


  return (
    <div>Home</div>
  )
}

export default Home;