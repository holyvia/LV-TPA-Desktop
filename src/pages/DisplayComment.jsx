import { async } from "@firebase/util"
import { addDoc, collection, doc, getDocs, getFirestore, onSnapshot, query } from "firebase/firestore"
import { comment } from "postcss"
import { useEffect, useRef, useState } from "react"


export const commentListOut = []

export default function DisplayComment({workspaceID, boardID, listID, cardID, commentList}){

    function createComment(){
        const db = getFirestore()
        const colls = collection(db, 'workspaces', workspaceID, 'boards', boardID, 'lists', listID, 'cards', cardID, 'comments')
        const colls1 = collection(db, 'users')
        const docRef = addDoc(colls, {
            content:commentContentRef.current.value
        }). then(()=>{
                commentContentRef.current.value = ""
        })
    }
    const commentContentRef = useRef()
    // const [commentList, setCommentList] = useState([])

    // const handleGetComments = async () => {
    //     const db = getFirestore()
    //     const queryStatement = query(collection(db, "workspaces", workspaceID, "boards", boardID,"lists", listID, "cards", cardID, "comments")) 
    //     let tempComment = []
    //     let getQuery = await getDocs(queryStatement)
    //     const getCard = await getQuery.forEach((comment) => {
    //         // console.log(e.data())
    //         tempComment.push(comment)
    //         setCommentList(tempComment)
    //     })
    // }

    // useEffect(()=>{

    //     handleGetComments().then(()=>{
    //         commentListOut.push(commentList)
    //     })
    // }, [])

    // const db = getFirestore()
    // const unsub = onSnapshot(
    //     doc(db, "workspaces", workspaceID, "boards", boardID, "lists", listID, "cards", cardID), 
    //     { includeMetadataChanges: true }, 
    //     (doc) => {
    //         handleGetComments()
    // });
    
    // console.log(commentListOut[1].length)
    // console.log(commentList[0].data().content)
    // if(commentList.length>0){
    // 
    console.log(commentList)
    if(commentList!=undefined){
        // 
        return(
            <div className="">
                {
                    commentList.map((commentList1)=>(
                        commentList1.map((comment)=>(
                            <p>{comment.data().content}</p>
                        ))
                    ))
                }
                <div className="bg-slate-300 opacity-75 ml-1 mt-4 rounded shadow-m w-37 h-content-fit px-8 py-5 border-b border-gray-200 sm:px-6">
                    <input id="commentContent" ref={commentContentRef} name="commentContent" type="commentContent" autocomplete="commentContent" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="input comment"/>
                        <button onClick={createComment} className="bg-white">
                            create
                        </button>
                </div>
            </div>
            
        )
    }
    else{
        <p>
            loading..
        </p>
    }
    // }
    
}