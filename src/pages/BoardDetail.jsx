import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayListAndCard from "./DisplayListAndCard";
import Navbar from "./navbar";
import {CheckCircleIcon, ClockIcon, LinkIcon, LocationMarkerIcon, BookmarkIcon} from '@heroicons/react/solid'

export default function BoardDetail(){
    const {id, workspaceID, boardID}= useParams()
    const listTitleRef = useRef()
    const navigate = useNavigate()
    const db = getFirestore()
    //for update Card
    const [cardTitle, setCardTitle] = useState()
    const [cardDesc, setCardDesc]=useState()
    const [cardID, setCardID] = useState()
    const [listID, setListID] = useState()

    const [listList, setListList] = useState([])
    let cardList = []
    const [tempCard2, setTempCard2] = useState([])
    const [classStyle, setClassStyle] = useState("hidden fixed z-10 inset-0 overflow-y-auto")

    //for button extend
    const [classLabelButtonExtend, setClassLabelButtonExtend] = useState("hidden")
    const labelTypeRef = useRef()


    function extendLabel(){
        if(classLabelButtonExtend=="hidden")
        setClassLabelButtonExtend("block")
        else{
            setClassLabelButtonExtend("hidden")
        }
    }

    const navigation = [
        { name: 'Labels', href: '#', icon: BookmarkIcon, current: false, isClick: 2, callFunction:extendLabel },
        { name: 'Checklist', href: '#', icon: CheckCircleIcon, current: false, isClick: 3,  callFunction:extendLabel  },
        { name: 'Dates', href: '#', icon: ClockIcon, current: false, isClick: 4,  callFunction:extendLabel  },
        { name: 'Attachment', href: '#', icon: LinkIcon, current: false, isClick: 5, callFunction:extendLabel  },
        { name: 'Location', href: '#', icon: LocationMarkerIcon, current: false, isClick: 6, callFunction:extendLabel  },
    ]
    const handleGetLists = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "workspaces", workspaceID, "boards", boardID, "lists")) 
        let tempList = []
        let tempCardList =[]
        let getQuery = await getDocs(queryStatement)
        let excuteQuery = getQuery.forEach((e) => {

            tempList.push(e)
            setListList(tempList)
            // let a = async()=>setCardList(tempCard2)
        })
        
        cardList.push(tempCard2)
        setTempCard2([])
    }
    
    const  updateCard = async ()=>{
        console.log(cardID+"asd")
        const db = getFirestore()
        const document = doc(db, 'workspaces', workspaceID, 'boards', boardID, 'lists', listID, 'cards', cardID)
        await updateDoc(document, {
            title:cardTitle,
            description:cardDesc,
            label:labelTypeRef.current.value
        }).then(console.log("success"))
        setClassStyle("hidden fixed z-10 inset-0 overflow-y-auto")
    }

    function createList(){
        const db = getFirestore()
        const colls = collection(db, 'workspaces', workspaceID, 'boards', boardID, 'lists')
        const docRef = addDoc(colls, {
            title: listTitleRef.current.value
        }). then()
    }

    useEffect(()=>{
        handleGetLists().then(()=>{
            
        })
        
    }, [])

    const unsub = onSnapshot(
        doc(db, "workspaces", workspaceID, "boards", boardID), 
        { includeMetadataChanges: false }, 
        (doc) => {
            handleGetLists()
    });


    return (
        <div className="static">
            <Navbar id={id}/>
        <div className="flex min-h-screen relative md:absolute relative ">
                <div className="hidden md:flex md:flex-shrink-0 ">
                <div className="flex flex-col w-64 fixed top-16 left-0 right-0 bottom-0 z-10">
                <div className="flex flex-col h-0 flex-1">
                    <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
                    <h3 className="text-white">
                        BoardName
                    </h3>
                    </div>
                    <div className="flex-1 flex flex-col">
                    <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1 sticky top-0">
                        <a href="#" className="bg-gray-900 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Board
                        </a>
                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Board Visibility
                        </a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md">
                        Add Member
                        </a>
                    </nav>
                    </div>
                </div>
                </div>
            </div>
            <div className="flex ml-64 mt-20">
            <div class={classStyle} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>


                <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="flex">
                    <div>
                        <div class="mt-3 text-center sm:mt-5">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Card Title
                            </h3>
                            <input type="text" value={cardTitle} onChange={(e)=>setCardTitle(e.target.value)} />
                        <div class="mt-2">
                            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Card Description
                            </h3>
                            <input type="text" value={cardDesc} onChange={(e)=>setCardDesc(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <h5>Add to card</h5>
                        {navigation.map((item) => (
                            <div className="py-1">
                                <button className="flex"
                                    key={item.name}
                                    onClick={item.callFunction}
                                    >
                                    <item.icon
                                        className='text-black mr-3 h-6 w-6'
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </button>
                            </div>
                        ))}
                        <div className={classLabelButtonExtend}>
                            <label> label type </label>
                            <div class="mt-1 sm:mt-0 sm:col-span-2">
                                <select id="label-type" name="label-type" ref={labelTypeRef}>
                                    <option value="None">None</option>
                                    <option value="Urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                    
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button type="button" onClick={updateCard}class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
                    Update
                    </button>
                    <button onClick={()=>setClassStyle("hidden fixed z-10 inset-0 overflow-y-auto")} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm">
                    Cancel
                    </button>
                </div>
                </div>
            </div>
            </div>
                <DisplayListAndCard workspaceID={workspaceID} boardID={boardID} listList={listList} id={id} setClassStyle={setClassStyle} setCardTitle={setCardTitle} setCardDesc={setCardDesc} setCardID={setCardID} setListID={setListID}/>
                <div className="float-left ml-10 mt-5 rounded shadow-2xl w-80 min-h-[26%] h-fit bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <input id="listTitle" ref={listTitleRef} name="listTitle" type="listTitle" autocomplete="listTitle" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="List title"/>
                <button onClick={createList} className="text-base leading-6 font-medium text-gray-900">
                    + Create New List
                </button>
            </div>
            </div>
        </div>
        </div>
        
    )
}