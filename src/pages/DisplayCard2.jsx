import { async } from "@firebase/util";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import BoardDetail from "./BoardDetail";
import DisplayCards from "./DisplayCard";
import DisplayComment from "./DisplayComment";

export default function DisplayCard2 ({workspaceID, boardID, listID, cardList, id, setFlag, commentList,setClassStyle,setCardTitle, setCardDesc, setCardID, setListID}){
    const [memberList, setMemberList] = useState([]) 

    const cardTitleRef = useRef()
    const cardTitleEditRef = useRef()
    const cardDescEditRef = useRef()
    const navigate  = useNavigate()
    const [cardIDForD, SetCardIDForD] = useState()
    // const addCardWatcher =async()=>{
    //     const queryStatement = query(collection(db, 'workspaces', workspaceID, 'boards', boardID, 'lists', listID, 'cards'), where('title', '==', cardTitleRef.current.value)) 
    //     let documents = await getDocs(queryStatement)
    //     documents.forEach((doc) => {
    //         setCardID(doc.id)
    //     });
    //     const colls = collection(db, 'workspaces', workspaceID, 'boards', boardID, 'lists', listID, 'cards', cardID, 'cardwatchers')
    //     const docRef = addDoc(colls, {
    //         uid:id
    //     })
    // }
    const db = getFirestore()
    function createCard(){
        const colls = collection(db, 'workspaces', workspaceID, 'boards', boardID, 'lists', listID, 'cards')
        const docRef = addDoc(colls, {
            title: cardTitleRef.current.value,
        }).then(cardTitleRef.current= "")
    }
    

    const handleGetCardDetail=async(listID, cardID)=>{
        const db = getFirestore()
        const queryStatement = query(doc(db, "workspaces",workspaceID, "boards", boardID, "lists", listID, "cards", cardID))
        const getQuery = await getDoc(queryStatement)
        console.log(getQuery.data())
    }

    // useEffect(()=>{
    //     if(cardList!=undefined){
    //         // console.log(cardList)
    //     }
    // }, [cardList])

    if(cardList!=undefined){
        return (
            <div className="">
            
                {cardList.map((card)=>(
                    <div onClick={()=>{
                        console.log("click")
                        setCardTitle(card.data().title)
                        setCardDesc(card.data().description)
                        setCardID(card.id)
                        setListID(listID)
                        setClassStyle("fixed z-10 inset-0 overflow-y-auto")
                    }
                    
                    } className="bg-slate-300 opacity-75 ml-1 mt-4 rounded shadow-m w-37 h-content-fit px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h4 className="text-lg leading-6 font-small text-gray-900">
                            {card.data().title}
                        </h4>
                        <div className="bg-white opacity-75 ml-1 mt-4 rounded shadow-m w-37 h-content-fit">
                        </div>
                        <button className="bg-white">
                            + comment
                        </button>
                    </div>
                ))}
                <div  className="bg-slate-300 opacity-75 ml-1 mt-4 rounded shadow-m w-37 h-content-fit px-4 py-5 border-b border-gray-200 sm:px-6">
                <input id="cardTitle" ref={cardTitleRef} name="cardTitle" type="cardTitle" autocomplete="cardTitle" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="input card title"/>
                        <button onClick={createCard} className="bg-white">
                            create
                        </button>
                </div>
            </div>
        )
    }
    else{
        return(
            <h3>Loading..</h3>
        )
    }
}