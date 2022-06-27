import { async } from "@firebase/util";
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query, QuerySnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayCard2 from "./DisplayCard2";


export default function DisplayCards({workspaceID, boardID, listID, id, setClassStyle, setCardTitle, setCardDesc, setCardID, setListID}){
    const [memberList, setMemberList] = useState([])
    const navigate = useNavigate()


    function goToBoardDetail(boardID){
        
        navigate(`${boardID}`)
    }
    

    const [cardList, setCardList] = useState([])
    const [flag, setFlag] = useState(0)
    const [commentList, setCommentList] = useState()
    const [tempCommentList, setTempCommmentList] = useState([])
    let comment = []
    const handleGetCards = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "workspaces", workspaceID, "boards", boardID,"lists", listID, "cards")) 
        let tempCard = []
        let getQuery = await getDocs(queryStatement)
        const getCard = getQuery.forEach((card) => {
            // console.log(e.data())
            tempCard.push(card)
            setCardList(tempCard)
        })
        for( var i=0; i<tempCard.length; i++){    
            const queryStatement2 = query(collection(db, "workspaces", workspaceID, "boards", boardID,"lists", listID, "cards", tempCard[i].id, "comments"))
            let tempComment = []
            let getQuery = await getDocs(queryStatement2)
            const getComment = getQuery.forEach((comment)=>{
                tempComment.push(comment)
                setTempCommmentList(tempComment)
            })
            comment.push(tempCommentList)
            setCommentList(comment)
        }
        // console.log(commentList)
    }


    // console.log(commentList)
    

    useEffect(()=>{
        handleGetCards()
    }, [])
    const db = getFirestore()

    const unsub = onSnapshot(
        doc(db, "workspaces", workspaceID, "boards", boardID, "lists", listID), 
        { includeMetadataChanges: true }, 
        (doc) => {
            // 
    });

    function updateDisplay(){
        onSnapshot(collection(db,"worksaces", workspaceID, "boards", boardID, "list", listID, "cards"),
        querySnapshot=>{
            let cards=[]
            querySnapshot.forEach(card=>{
                cards.push(card)
                setCardList(cards)
            })
            console.log(cardList)
        })
    }

    useEffect(()=>{
        if(id!=undefined){
            updateDisplay()
        }
    },[id]) 
    

    return (
        <div>
       
        <DisplayCard2 workspaceID={workspaceID} boardID={boardID} listID={listID} cardList={cardList} id={id} setFlag={setFlag} commentList={commentList} setClassStyle={setClassStyle} setCardTitle={setCardTitle} setCardDesc={setCardDesc} setCardID={setCardID} setListID={setListID}/>
        </div>
    )
}