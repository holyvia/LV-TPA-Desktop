import { query } from "firebase/database";
import { addDoc, collection, getDocs, getFirestore, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DisplayBoards from "./DisplayBoards";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";


export default function InvitingView(){
    const {id, workspaceID}= useParams()
    const navigate = useNavigate()
    const newmemberemailRef = useRef()
    const [newMemberID,setNewMemberID]=useState()
    const [docLink, setDocLink] = useState("")
    const linkRef = useRef()
    function goToSeeMember(){
        navigate(`/home/${id}/${workspaceID}`)
    }

    function createDocument(){
        const db=getFirestore()
        const coll = collection(db, "invitations")
        const docRef = addDoc(coll, {
            type:"workspace",
            link:workspaceID,
            approve:""
        }). then((e)=>{
            setDocLink("/signIn/"+e.id)
            console.log(docLink)
        })
    }

    const inviteByEmail = async()=>{
        const db=getFirestore()
        const queryStatement = query(collection(db, "users"),where("email","==",newmemberemailRef.current.value))
        const getQuery = await getDocs(queryStatement)
        let excuteQuery = getQuery.forEach((e) => {
            console.log("ini member ID"+ e.id)
            const coll = collection(db, "users",e.id,"notifs")
                const docRef = addDoc(coll, {
                    content:"you are invited to a workspace",
                    type:"workspace",
                    workspaceID:workspaceID
                })
        })
    }
    return (
        <React.Fragment>
            <Navbar id={id}/>
            <div className="flex min-h-screen">
                <div class="hidden md:flex md:flex-shrink-0 ">
                <div class="flex flex-col w-64 ">
                <div class="flex flex-col h-0 flex-1">
                    <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                    <h3 className="text-white">
                        WorkspaceName
                    </h3>
                    </div>
                    <div class="flex-1 flex flex-col">
                    <nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                        <a href="" class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Board Gallery
                        </a>
                        <a href="" onClick={goToSeeMember}class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        See Member
                        </a>

                        <a href="" class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Add Member
                        </a>

                        <a href="#" class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Closed Board
                        </a>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            <div className="bg-black flex justify-center"> 
                <div className="ml-48">
                    <h3>Inviting option</h3>
                    <p>{docLink}</p>
                    <button onClick={createDocument} type="button"class="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                        By Link
                    </button>
                    <input id="email-address" ref={newmemberemailRef} name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="new member email"/>
                    <button onClick={inviteByEmail} type="button"class="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                        By Email
                    </button>
            </div>
                
            </div>
        </div>
        
        </React.Fragment>
        
    )
}