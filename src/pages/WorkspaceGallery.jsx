import React, { useEffect, useRef, useState } from "react";
import Navbar from "./navbar";
import {useParams} from "react-router-dom"
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { async } from "@firebase/util";
import DisplayWorkspaces from "./DisplayWorskspaces";
import { useNavigate } from "react-router-dom";


const cardTemplate = (e) =>{
    return(
        <div className="float-left ml-10 mt-5 rounded shadow-2xl w-64 h-40 bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            {/* <img src="../../public/logo192.png" className="w-1/4 h-20"alt="" /> */}
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                {e}
            </h3>
        </div>
    )
}

export default function WorkspaceGallery(){

    console.log("ok")

    const [workspaceList, setWorkspaceList] = useState([])
    const [workspacePrivate, setWorkspacePrivate] = useState([])
    const[flag,setFlag] = useState(0)
    const navigate = useNavigate()
    const searchRef = useRef()
    useEffect(() => {
        handleGetWorkspace()
        // console.log("here")
    }, [flag])
    
    function goToNotifications(){
        navigate(`/notif/${id}`)
    }

    const searching = async()=>{
        const db = getFirestore()
        const queryStatement = query(collection(db, "workspaces"), where("title","==",searchRef.current.value)) 
        let tempWorkspace = []
        let tempWorkspacePrivate = []
        let getQuery = await getDocs(queryStatement)
        getQuery.forEach((e) => {
            tempWorkspace.push(e)
            // console.log(tempWorkspace)
            setWorkspaceList(tempWorkspace)
            // console.log(e)
        })
        setFlag(0)
    }
    const handleGetWorkspace = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "workspaces")) 
        let tempWorkspace = []
        let tempWorkspacePrivate = []
        let getQuery = await getDocs(queryStatement)
        getQuery.forEach((e) => {
            tempWorkspace.push(e)
            // console.log(tempWorkspace)
            setWorkspaceList(tempWorkspace)
            // console.log(e)
        })
        setFlag(0)
    }

    const {id}= useParams()

    console.log(id)
    return (
        <React.Fragment>
            <Navbar id={id}/>
            
            
            <div className="flex min-h-screen">
                <div className="hidden md:flex md:flex-shrink-0 ">
                <div className="flex flex-col w-64 ">
                <div className="flex flex-col h-0 flex-1">
                    <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                        <a className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Workspace Gallery
                        </a>
                        <a onClick={goToNotifications} className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Notification
                        </a>
                    </nav>
                    </div>
                </div>
                </div>
                <div>
                <input type="text" name="" id="" ref={searchRef} placeholder="search"/>
                <button onClick={searching}>Search</button>
                <DisplayWorkspaces workspaceList={workspaceList} id={id} setFlag={setFlag}/>
                </div>
                
            </div>
            
        </React.Fragment>   
    )
}