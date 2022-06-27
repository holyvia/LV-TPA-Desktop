import Navbar from "./navbar"
import React, { useRef } from "react"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateEmail, updatePassword } from "firebase/auth"
import SignUp from "./SignUp"
import userEvent from "@testing-library/user-event"
import app from "../firebase"
import { query, collection, where, getDocs, getFirestore, addDoc, updateDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom"
import { async } from "@firebase/util"


export default function EditProfile(){
    const {id}= useParams()
    console.log("from editProf:"+id)
    const [email, setEmail] = useState("test@test.com")
    const [username, setUserName] = useState("example")
    const [password, setPassword] = useState("")
    const emailRef = useRef("")
    const usernameRef = useRef("")
    const passwordRef = useRef("")

    useEffect(() => {
        handlegetEmail()
        console.log("here")
    }, [])

    const handlegetEmail = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "users"), where('uid', '==', id)) 
        let getQuery = await getDocs(queryStatement)
        getQuery.forEach((e) => {
            if(e.data().userName===undefined){
                setUserName(e.data().email)
            }
            else{
                setUserName(e.data().username)
            }
            setEmail(e.data().email)
            setPassword(e.data().password)
        })
    }

    const handleSubmitChanges = async ()=>{
        const db = getFirestore()
        console.log(emailRef.current.value+" | "+passwordRef.current.value+ " | "+usernameRef.current.value)
        if(emailRef.current.value!==""){
            console.log("masuk if")
            setEmail(emailRef.current.value)
            console.log(email)
        }
        if(usernameRef.current.value!==""){
            setUserName(usernameRef.current.value)
        }
        if(passwordRef.current.value!==""){
            setPassword(passwordRef.current.value)
        }
        console.log("emai:"+email+" password: "+password+" id:"+id)
        const queryStatement = query(collection(db, "users"), where('uid', '==', id)) 
        let documents = await getDocs(queryStatement)
        documents.forEach((docum)=>{
            const auth = getAuth()
            signInWithEmailAndPassword(auth, docum.data().email, docum.data().password).
            then((user)=>{
                updateEmail(auth.currentUser,email).
                then(()=>{
                    updatePassword(auth.currentUser, password).then(()=>{
                        const docsToBeUpdate = doc(db, 'users', docum.id)
                        updating(docsToBeUpdate)
                    })
                }).catch(()=>{
                    console.log("error")
                })
            }).catch(()=>{
                console.log("error here")
            })
        })
    }

    const updating = async (docsToBeUpdate)=>{
        await updateDoc(docsToBeUpdate, {
            email:email,
            password: password
        }).then(()=>{
            console.log("successfully update")
        })
    }
     
    return(
        <React.Fragment>
        <Navbar id={id}/>
        <form class="space-y-8 divide-y divide-gray-200 w-5/6 pl-40">
            <div class="pt-20 space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Edit Profile
                    </h3>
                </div>

                <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="username"  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Username
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="text" ref={usernameRef} name="username" id="username" autocomplete="username" class="bg-slate-300 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 outline-black py-2 px-2"/>
                    </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="photo" class="block text-sm font-medium text-gray-700">
                        Photo
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <div class="flex items-center">
                        <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Change
                        </button>
                        </div>
                    </div>
                    </div>
                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="Email"  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        Email
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="text" ref={emailRef} placeholder={email} name="email" id="email" autocomplete="email" class="bg-slate-300 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 outline-black py-2 px-2"/>
                    </div>
                    </div>

                    <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label for="password" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        New Password
                    </label>
                    <div class="mt-1 sm:mt-0 sm:col-span-2">
                        <input type="password" ref={passwordRef} name="password" id="password" autocomplete="password" class="bg-slate-300 flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 outline-black py-2 px-2"/>
                    </div>
                    </div>
                </div>

            </div>

            <div class="pt-5">
                <div class="flex justify-end">
                <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button type="button" onClick={handleSubmitChanges} class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Save
                </button>
                </div>
            </div>
        </form>
        </React.Fragment>
    )
}

