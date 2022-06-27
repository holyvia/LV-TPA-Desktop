import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DisplayBoards from "./DisplayBoards";
import DisplayMembers from "./DisplayMembers";
import Navbar from "./navbar";
import UserDA from "./UserDA";
import { useNavigate } from "react-router-dom";
import DisplayNotification from "./DisplayNotification";

export default function ViewNotification(){
    const [notifList, setNotifList] = useState([])
    const {id} = useParams() 
    const navigate = useNavigate()

    const handleGetNotifs = async () => {
        // console.log(id+"in handle")
        const db = getFirestore()
        let tempList=[]
        const queryStatement = query(collection(db, "users",id, "notifs")) 
        let getQuery = await getDocs(queryStatement)
        let excuteQuery = getQuery.forEach((e) => {
            tempList.push(e)
            setNotifList(tempList)
            // console.log(notifList)
        })
    }

    useEffect(()=>{
        // console.log(id+"in useEffect")
        if(id!=undefined){
            handleGetNotifs()
        }
    }, [id])

    const db = getFirestore()
    const unsub = onSnapshot(
        collection(db, "workspaces", id, "notifs"), 
        { includeMetadataChanges: false }, 
        (doc) => {
            handleGetNotifs()
    });


    function toWorkspaceGallery(){
        navigate(`/home/${id}`)
    }

    if(notifList!=undefined){
        // console.log(memberListEmail)
        return(
                <React.Fragment>
                    {/* <Navbar id={id}/> */}
                    <div className="flex min-h-screen">
                        <div class="hidden md:flex ">
                        <div class="flex flex-col w-64 ">
                        <div class="flex flex-col h-0 flex-1">
                            <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                            <h3 className="text-white">
                                WorkspaceMember
                            </h3>
                            </div>
                            <div class="flex-1 flex flex-col">
                            <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                                <a onClick={toWorkspaceGallery}className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                Workspace Gallery
                                </a>
                                <a className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                Notification
                                </a>
                            </nav>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className=""> 
                        <DisplayNotification notifList={notifList} id={id}/>
                    </div>
                </div>
                
                </React.Fragment>
        )
    }
}