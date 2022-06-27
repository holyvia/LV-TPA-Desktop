import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayMembers({admin, memberList}){
   if(admin!=undefined && memberList!=undefined){
    return (
        <React.Fragment>
        <div className="">
            <div className="float-left ml-10 mt-5 rounded shadow-2xl w-80 h-30 bg-white  py-5 pr-64 border-b border-gray-200 sm:px-6">
                <h3 className="text-base leading-6 font-medium text-gray-900">
                    {admin}
                    
                </h3>
                <p className="text-blue-600">admin</p>
            </div>
        </div>
        <div className="">
            {memberList.map((member)=>{
                return(
                    <div className="float-left ml-10 mt-5 rounded shadow-2xl w-80 h-30 bg-white  py-5 pr-64 border-b border-gray-200 sm:px-6">
                        <h3 className="text-base leading-6 font-medium text-gray-900">
                            {member}
                            
                        </h3>
                        <p className="text-[#FFDE6B]">member</p>
                    </div>
                )
            })}
        </div>
        </React.Fragment>
    );
   }
   else{
    return(
        <React.Fragment>
            Loading
        </React.Fragment>
    )
   }
}