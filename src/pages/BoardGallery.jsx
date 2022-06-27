import { query } from "firebase/database";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import DisplayBoards from "./DisplayBoards";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";


export default function BoardGallery(){
    const boardTitleRef = useRef("")
    const visibilityRef = useRef("")
    const [memberList, setMemberList] = useState([])
    const [admin, setAdmin] = useState()
    const {id, workspaceID} = useParams() 
    const [boardList, setBoardList] = useState([])
    const [popUpClass, setPopUpClass] = useState("hidden flex items-end justify-center pt-4 pb-20 text-center ") 
    const navigate = useNavigate()

    const handleGetBoards = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "workspaces", workspaceID, "boards")) 
        let tempBoard = []
        let getQuery = await getDocs(queryStatement)
        getQuery.forEach((e) => {
            tempBoard.push(e)
            setBoardList(tempBoard)
        })
    }

    function toAddMember(){
        console.log(admin)
        console.log(id)
        if(admin == id){
            navigate(`/addMember/${id}/${workspaceID}`)
        }
        else{
            alert("you're not an admin")
        }
    }

    function removePopUp(){
        setPopUpClass("hidden flex items-end justify-centerpt-4 pb-20 text-center pl-48")
    }

    function createBoard(){
        console.log(boardTitleRef.current.value)
        const db = getFirestore()
        const colls = collection(db, 'workspaces', workspaceID, 'boards')
        const docRef = addDoc(colls, {
            title: boardTitleRef.current.value,
            visibility: visibilityRef.current.value,
            adminID: id, 
            memberList: memberList
        }).then(()=>{
            setFlag(2)
            setPopUpClass("hidden flex items-end pl-48 pt-4 pb-20 text-center")
            boardTitleRef = ""
        })
    }


    function goToSeeMember(){
        navigate(`/seeMember/${id}/${workspaceID}`)
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
        }
    }, [workspaceID])

    const[flag,setFlag] = useState(0)

    useEffect(()=>{
        handleGetBoards()
        console.log("id di board gall:"+id)
        console.log("workspace id  sekarang:"+ workspaceID)
        setFlag(0)
    }, [flag])

    return (
        <React.Fragment>
            <Navbar id={id}/>
            <div className="flex min-h-screen">
                <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class={popUpClass}>
                        <div class="bg-slate-400 opacity-50 fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                        <div class="inline-block bg-white rounded-lg ml-96 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all ml-96">
                        <div className="">
                            <div class="mt-3 text-center sm:mt-5">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Create Board
                            </h3>
                            <div class="mt-2">
                                <div class="mt-1 s m:mt-0 sm:col-span-2">
                                    <input  type="text" ref={boardTitleRef} name="boardTitle" id="boardTitle" autocomplete="boardTitle" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Board Title"/>
                                </div>
                                <br />
                                <label>
                                    Board Visibility
                                </label>
                                <div class="mt-1 sm:mt-0 sm:col-span-2">
                                    <select id="visibility" name="visibility" ref={visibilityRef} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                        <option value="Public">Public</option>
                                        <option value="Workspace Visibility">Workspace Visibility</option>
                                        <option value="Board Visibility">Board Visibility</option>
                                    </select>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="mt-5 sm:mt-6 flex">
                            <button type="button" onClick={createBoard} class="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                            Create
                            </button>
                            <button type="button" onClick={removePopUp} class="justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                            Cancel
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
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
                        <a href="#" class="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Board Gallery
                        </a>
                        <a href="" onClick={goToSeeMember}class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        See Member
                        </a>

                        <a href="" onClick={toAddMember}class="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Add Member
                        </a>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            <div className=""> 
                <DisplayBoards workspaceID={workspaceID} boardList={boardList} id={id} setFlag={setFlag} setPopUpClass={setPopUpClass}/>
            </div>
        </div>
        
        </React.Fragment>
        
    )
}