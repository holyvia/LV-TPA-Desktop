import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword, get, getAuth} from "firebase/auth"
import app, { auth } from "../firebase"
import { getDatabase }from "firebase/database"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";


function SignUp(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const confPasswordRef = useRef()
    const auth = getAuth()
    const [uid, setUid] = useState()
    let navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault();
        console.log(e.user)
        createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(async e => {
            try {
                setUid(e.user.uid)
                const db = getFirestore()
                const colls = collection(db, 'users')
                if(uid!=undefined){
                    const docRef = setDoc(doc(db, 'users', e.user.uid), {
                        uid: e.user.uid,
                        email: e.user.email, 
                        password: passwordRef.current.value,
                        myWorkspace:[]
                    }).then(() => 
                        navigate(`/home/${uid}`))
                }
            }
            catch(e){
                console.log(e)
            }
        // addDoc(doc(db, "Users", user.uid), {
        //     username: emailRef.current.value,
        //     email: emailRef.current.value,
        //     password:passwordRef.current.value
        // });
        
        // 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign up
                </h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true"/>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div className="pb-8 pt-8">
                    <label for="email-address" className="sr-only">Email address</label>
                    <input id="email-address" ref={emailRef} name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address"/>
                    </div>
                    <div className="pb-8">
                    <label for="password" className="sr-only">Password</label>
                    <input id="password" ref={passwordRef} name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password"/>
                    </div>
                    <div>
                    <label for="conf-password" className="sr-only">ConfirmPassword</label>
                    <input id="conf-password" ref={confPasswordRef} name="conf-password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password"/>
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-sm">
                    <a href="/signIn" class="font-medium text-indigo-600 hover:text-indigo-500">
                        Have any accounts
                    </a>
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        
                    </span>
                    Sign up
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp