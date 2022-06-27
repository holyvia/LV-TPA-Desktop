import SignIn from "./SignIn";
import { useEffect, useState } from "react"
import app, {auth} from "../firebase"
import React from "react";
import { getAuth, setAuth } from "firebase/auth";
import { query, collection, where, getDocs, getFirestore } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";

function Navbar({id}) {
    const [auth, setAuth] = useState(getAuth(app));
    const user = auth.currentUser
    const [email, setEmail] = useState("test@test.com")
    const [dropDownClass, setDropDownClass] = useState("hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none")
    const [profileExpand, setProfileExpand] = useState(false)
    const [profileExpClass, setProfileExpClass] = useState("hidden px-4 py-2 text-sm text-gray-700")
    let navigate = useNavigate()
    useEffect(() => {
        handlegetEmail()
        console.log("here")
    }, [])

    const handlegetEmail = async () => {
        const db = getFirestore()
        const queryStatement = query(collection(db, "users"), where('uid', '==', id)) 
        let getQuery = await getDocs(queryStatement)
        getQuery.forEach((e) => {
            setEmail(e.data().email)
        })
    }
    function goToWorkspaceGallery(){
        navigate(`/home/${id}`)
    }
    function goToEditProfile(){
        navigate(`/editProfile/${id}`)
    }
    function profileClicked(){
        if(profileExpand === false){
            setProfileExpand(true)
            setProfileExpClass("block px-4 py-2 text-sm text-gray-700")
            setDropDownClass("origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none")
            console.log(profileExpand)
        }
        else if(profileExpand == true){
            setProfileExpand(false)
            setProfileExpClass("hidden px-4 py-2 text-sm text-gray-700")
            setDropDownClass("hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none")
            console.log(profileExpand)
        }
    }
    function goToSignIn(){
        // navigate('/signIn')
    }
    return (
    <div className="sticky top-0">
        <nav className="bg-indigo-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                <div className="flex-shrink-0">
                    <h2 className="text-white px-3 py-2 rounded-md text-lg font-medium">CHello</h2>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                    <a href="#" onClick={goToWorkspaceGallery} className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Workspace</a>

                    <a href="#" className="text-white hover:bg-indigo-500 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium">Create</a>

                    </div>
                </div>
                </div>
                <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                    <button className="p-1 bg-indigo-600 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    </button>

                    <div className="ml-3 relative">
                    <div>
                        <button type="button" className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" onClick={profileClicked} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=nkXPoOrIl0&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                        </button>
                    </div>

                    <div className={dropDownClass} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                        <button onClick={goToEditProfile} className={profileExpClass} role="menuitem" tabindex="-1" id="user-menu-item-0">EditProfile</button>

                        <button onClick={goToSignIn} className={profileExpClass} role="menuitem" tabindex="-1" id="user-menu-item-2">Sign Out</button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                <button type="button" className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>

                    <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>
            </div>

            <div className="md:hidden" id="mobile-menu">
            <div className="pt-4 pb-3 border-t border-indigo-700">
                <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=nkXPoOrIl0&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium text-white">name</div>
                    {/* <div className="text-sm font-medium text-indigo-300">{email}</div> */}
                </div>
                <button className="ml-auto bg-indigo-600 flex-shrink-0 p-1 rounded-full text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">You Profile</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">Settings</a>

                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75">Sign out</a>
                </div>
            </div>
            </div>
        </nav>

    </div>
  );
}

export default Navbar;




