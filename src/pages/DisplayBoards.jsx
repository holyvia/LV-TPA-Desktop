import { addDoc, collection, doc, getDocs, getFirestore, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayBoards({workspaceID, boardList, id, setFlag, setPopUpClass}){
    const [memberList, setMemberList] = useState([])
    const navigate = useNavigate()

    function createBoard(){
        setPopUpClass("flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0")
    }

    function goToBoardDetail(boardID){
        
        navigate(`${boardID}`)
    }
    useEffect(()=>{
    },[])

    function getUser(){
        const db = getFirestore()
        const queryStatement = query(doc(db, "users", id)) 
        let document = getDocs(queryStatement)
        const getDocument = document.forEach((e) => {
        console.log(e)
    })
    }
    
    return (
        <div className="">
            {boardList.map((board)=>(
                <div onClick={()=>goToBoardDetail(board.id)} className="float-left ml-10 mt-5 rounded shadow-2xl w-64 h-40 bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <h3 className="text-base leading-6 font-medium text-gray-900">
                        {board.data().title}
                    </h3>
                </div>
            ))}
            <div onClick={createBoard} className="float-left ml-10 mt-5 rounded shadow-2xl w-64 h-40 bg-slate-300 px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-base leading-6 font-medium text-gray-900 font-bold">
                    + Create New Board
                </h3>
            </div>
        </div>
    );
}