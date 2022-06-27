import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import {useNavigate, useParams} from "react-router-dom"
import { arrayUnion, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { async } from "@firebase/util";
import DisplayWorkspaces from "./DisplayWorskspaces";



export default function Invitation(){
    
    const {id,documentID} = useParams()
    const navigate = useNavigate()
    const [workspaceID, setWorkspaceID] = useState()
    const goToHome=async()=>{
        const db= getFirestore()
        const inviteRef  = doc(db, "invitations", documentID)
        await updateDoc(inviteRef, {
            approve:"no"
        })
        navigate(`/home/${id}`)
    }

    const acceptInvitation=async ()=>{
        console.log(documentID)
        const db= getFirestore()
        do{
            console.log(workspaceID)
            if(workspaceID!=undefined){
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
        
    }

    const getWorkspace= async()=>{
        const db= getFirestore()
        const queryStatement  = query(doc(db, "invitations", documentID))
        let getQuery = await getDoc(queryStatement)
        setWorkspaceID(getQuery.data().link)
    }

    useEffect(()=>{
        getWorkspace()
    },[])

    console.log(id)
    return (
        <React.Fragment>
            <Navbar id={id}/>
            <div className="flex min-h-screen">
                <div className="hidden md:flex md:flex-shrink-0 ">
                <div className="flex flex-col w-64 ">
                <div className="flex flex-col h-0 flex-1">
                    <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                        <a href="#" className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Invitation Page
                        </a>
                    </nav>
                    </div>
                </div>
                </div>
                <div className="">
                    Do you want to join?
                    <button type="submit" onClick={acceptInvitation} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Accept
                    </button>
                    <button type="submit" onClick={goToHome} class="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Reject
                    </button>
                </div>
            </div>
            
        </React.Fragment>   
    )
}