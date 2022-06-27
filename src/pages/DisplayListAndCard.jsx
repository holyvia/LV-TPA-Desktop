import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { list } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCards from "./DisplayCard";
// import DisplayCards.cardDescRef from "./DisplayCard";


export default function DisplayListAndCard({workspaceID, boardID, listList, id, setClassStyle, setCardTitle, setCardDesc, setCardID, setListID}){
    const navigate = useNavigate()

    
    useEffect(()=>{
        
    },[])

    return (
        <div className="">
           
            {listList.map((list)=>(
                <div className="float-left ml-10 mt-5 rounded shadow-2xl w-80 min-h-[26%] h-fit bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-base leading-6 font-medium text-gray-900">
                        {list.data().title}
                    </h3>
                    <DisplayCards workspaceID={workspaceID} boardID ={boardID} listID={list.id} id={id} setClassStyle={setClassStyle} setCardTitle={setCardTitle} setCardDesc={setCardDesc} setCardID={setCardID} setListID={setListID}/>
                </div>
            ))}
        </div>
    );
}