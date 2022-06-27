import { async } from "@firebase/util";
import { query } from "firebase/database";
import { addDoc, arrayUnion, collection, doc, getDocs, getFirestore, updateDoc, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function DisplayWorkspaces({workspaceList, id, setFlag}){
    const workspaceTitleRef = useRef("")
    const visibilityRef = useRef("")
    const memberEmailRef = useRef("")
    const [memberList, setMemberList] = useState([])
    const [memberAddFlag, setMemberAddFlag] = useState(false)
    let tempMemberList =[]
    const navigate = useNavigate()
    const db = getFirestore()
    const addWorkspaceToMember = async (workspaceID)=>{
        console.log(memberList)
        for(var i=0; i<memberList.length; i++){
            const userRef  = doc(db, "users", memberList[i])
            await updateDoc(userRef, {
                myWorkspace:arrayUnion(workspaceID)
            })
        }
        console.log("masuk sini")
    }
    function createWorkspace(){
        console.log(workspaceTitleRef.current.value)
        const colls = collection(db, 'workspaces')
        if(workspaceTitleRef.current.value!=""){
            if(memberAddFlag==true){
                if(memberList.length>0){
                    const docRef = addDoc(colls, {
                        title: workspaceTitleRef.current.value,
                        visibility: visibilityRef.current.value,
                        adminID: id, 
                        memberList: memberList
                    }).then((e)=>{
                        addWorkspaceToMember(e.id).then(setFlag(1))
                    }).catch(console.error())
                }
            }
            else{
                const docRef = addDoc(colls, {
                    title: workspaceTitleRef.current.value,
                    visibility: visibilityRef.current.value,
                    adminID: id, 
                    memberList: memberList
                }).then(setFlag(1)).catch(console.error())
            } 
        }
    }
    
    function addMember(newMemberEmail){
        subAddMember(newMemberEmail)
        setMemberAddFlag(true)
    } 
    const subAddMember = async (newMemberEmail)=>{
        const queryStatement = query(collection(db, "users"), where("email", "==", newMemberEmail))
        let getQuery = await getDocs(queryStatement)
        setMemberAddFlag(true)
        let excuteQuery = getQuery.forEach((e) => {
            tempMemberList.push(e.data().uid)
            setMemberList(tempMemberList)
            // console.log(memberList)
        })

    }
    function goToBoardGallery(workspaceID){
        
        navigate(`${workspaceID}`)
    }
    useEffect(()=>{
        if(memberList.length>0){
            alert("member Added")
        }
    },[memberList])

    function isMember(workspace){
        for(var i=0; i<workspace.data().memberList; i++){
            if(memberList[i] == id){
                console.log("member")
                return true;
            }
            else{
                console.log("not member")
                return false;
            }
        }
    }

    return (
        <div className="">
            {workspaceList.map((workspace)=>{
                let cekIsMember = isMember(workspace)
                if(workspace.data().visibility=="Public" || (workspace.data().visibility=="Private"&& (workspace.data().adminID==id||workspace.data().memberList.includes(id)))){
                    return(
                        <div onClick={()=>goToBoardGallery(workspace.id)} className="float-left ml-10 mt-5 rounded shadow-2xl w-64 h-40 bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                            <h3 className="text-base leading-6 font-medium text-gray-900">
                                {workspace.data().title}
                            </h3>
                        </div>
                    )
                }
            })}
            <div className="float-left ml-10 mt-5 rounded shadow-2xl w-64 h-40 bg-slate-300 px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-base leading-6 font-medium text-gray-900 font-bold">
                    Create New Workspace
                </h3>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <input type="text" ref={workspaceTitleRef} name="workspaceTitle" id="workspaceTitle" autocomplete="workspaceTitle" class="bg-white flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300 outline-black py-1 px-2 mt-2"/>
                </div>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                    <select id="visibility" name="visibility" ref={visibilityRef}>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>
                </div>
                <div className="px-3 px-2">
                    Add member
                    <input type="text" ref={memberEmailRef} name="memberemail" id="memberemail" autocomplete="memberemail" class="bg-white flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded sm:text-sm border-gray-300 outline-black py-1 px-2 mt-2"/>
                    <button type="button" onClick={()=>addMember(memberEmailRef.current.value)} class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        add member
                    </button>
                </div>
                <button type="button" onClick={createWorkspace} class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create
                </button>
            </div>
        </div>
    );
}