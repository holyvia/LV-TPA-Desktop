import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext } from "react";
import app from "../firebase";

let globalContext  = createContext({
    auth: getAuth(),
    id: '',
    email:'',
    password:'',
    firestore: getFirestore(app)
})

export const useGlobalContext = ()=>useContext(globalContext)

export const ContextProvider = ({children})=>{
    const firestore = getFirestore(app)
    const auth = getAuth()
    const id = auth.id
    const userDataRef = collection(firestore, "users");
    const {status: statusUser, data: resUser} = useFirestoreCollectionData(query(userDataRef,
        where(KeyUser.userUid, '==', userUid),
    ));
}