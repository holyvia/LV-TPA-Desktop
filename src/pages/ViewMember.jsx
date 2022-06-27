import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DisplayBoards from "./DisplayBoards";
import DisplayMembers from "./DisplayMembers";
import Navbar from "./navbar";
import UserDA from "./UserDA";
import { useNavigate } from "react-router-dom";

export default function ViewMember(){
    const [memberList, setMemberList] = useState([])
    const [admin, setAdmin] = useState()
    const [memberListEmail, setMemberListEmail] = useState([])
    const [adminEmail, setAdminEmail] =useState("")
    const {id,workspaceID} = useParams() 
    const navigate = useNavigate()
    // const workspaceID = "fq6bFV0TT81yRwbQWeYA"

    const [userFind, setUserFind] = useState("")
    const [userListFind, setUserListFind] = useState([])

    const getUser = async(id)=>{
        const db = getFirestore()
        const queryStatement = query(doc(db, "users",id)) 
        let getQuery = await getDoc(queryStatement)
        setUserFind(getQuery.data().email)
        setAdminEmail(userFind)
        console.log(adminEmail)
    }

    const getUserList = async (userIDList)=>{
        let tempArray=[]
        const db = getFirestore()
        for( var i=0; i< userIDList.length; i++){
            const queryStatement = query(doc(db, "users",userIDList[i])) 
            let getQuery = await getDoc(queryStatement)
            tempArray.push(getQuery.data().email)
            setUserListFind(tempArray)
        }
        setMemberListEmail(userListFind)
    }

    const handleGetMembers = async () => {
        console.log(workspaceID)
        const db = getFirestore()
        const queryStatement = query(doc(db, "workspaces",workspaceID)) 
        let getQuery = await getDoc(queryStatement)
        setMemberList(getQuery.data().memberList)
    }

    const handleGetAdmin = async () =>{
        console.log(workspaceID)
        const db = getFirestore()
        const queryStatement = query(doc(db, "workspaces",workspaceID)) 
        let getQuery = await getDoc(queryStatement)
        setAdmin(getQuery.data().adminID)
        console.log(admin)
    }


    useEffect(()=>{
        // handleGetMembers()
        console.log(workspaceID)
        if(workspaceID!=undefined){
          
            handleGetAdmin()
            handleGetMembers()
        }
        // setAdminEmail(handleGetAdmin().then(UserDA.getListUser()))
    }, [workspaceID])

    useEffect(()=>{
        if(admin!=undefined){
            getUser(admin)
        }
    }, [admin]) 

    useEffect(()=>{
        if(memberList!=undefined){
            getUserList(memberList)
        }
    }, [memberList])

    useEffect(()=>{
        if(memberListEmail>0){
        console.log("email is content")
        }
    },[memberListEmail])

    function toBoardGallery(){
        navigate(`/home/${id}/${workspaceID}`)
    }

    function toAddMember(){
        console.log(admin)
        console.log(id)
        if(admin == id){
            navigate(`/seeMember/${id}/${workspaceID}`)
        }
        else{
            alert("you're not an admin")
        }
    }

    console.log(admin)
    if(admin!=undefined&& memberList!=undefined){
        console.log(admin)
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
                            <nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                                <a onClick={toBoardGallery} class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                Board Gallery
                                </a>
                                <a class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                                See Member
                                </a>
        
                                <a onClick={toAddMember} class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
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
                    <div className=""> 
                        <DisplayMembers admin={admin} memberList={memberList}/>
                    </div>
                </div>
                
                </React.Fragment>
        )
    }
}