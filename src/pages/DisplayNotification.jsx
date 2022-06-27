import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function DisplayNotification({notifList, id}){
    const joinWorkspace = async (workspaceID, notifID) =>{
        console.log(workspaceID+" join in notif "+id)
            const db= getFirestore()
            do{
                console.log(workspaceID, notifID)
                if(workspaceID!=undefined && id!=undefined){
                    const userRef  = doc(db, "users", id)
                    await updateDoc(userRef, {
                        myWorkspace:arrayUnion(workspaceID)
                    })
                    const workspaceRef  = doc(db, "workspaces", workspaceID)
                    await updateDoc(workspaceRef, {
                        memberList:arrayUnion(id)
                    })
                }
            }while(workspaceID==undefined)
            const notifRef = doc(db, "users", id, "notifs", notifID)
            await updateDoc(notifRef,{
                type:"done"
            })
    }

    const rejectInvitation = async(notifID)=>{
        const db= getFirestore()
        const notifRef = doc(db, "users", id, "notifs", notifID)
        await updateDoc(notifRef,{
            type:"done-rejected"
        })
    }
   if(notifList!=undefined){
    return (
        <React.Fragment>
        <div className="">
            {notifList.map((notif)=>{
                if(notif.data().type=="workspace"){
                    return(
                        <div className="float-left ml-10 mt-5 rounded shadow-2xl w-80 h-30 bg-white  py-5 pr-64 border-b border-gray-200 sm:px-6">
                            <h3 className="text-base leading-6 font-medium text-gray-900">
                                {notif.data().content}
                            </h3>
                            <div className="flex space-x-4 ">
                            <button onClick={()=>joinWorkspace(notif.data().workspaceID, notif.id)} className="text-base leading-6 font-medium text-gray-900">
                                Accept
                            </button>
                            <button  onClick={()=>rejectInvitation(notif.id)}className="text-base leading-6 font-medium text-gray-900">
                                Reject
                            </button>
                            </div>
                        </div>
                    )
                }
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