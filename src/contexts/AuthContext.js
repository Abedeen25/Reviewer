import React, {useState, useEffect, useContext} from "react";
import {auth, db} from '../Services/FireService';

const AuthContext = React.createContext();

const useAuth = ()=>{
    return useContext(AuthContext);
}

const postReview = (BookID, reviewBody) =>{
    console.log("ASHSE!");
    var doc_ref = db.collection("review").doc(BookID.toString()).get();
    console.log(BookID);
    if (doc_ref.exists)
    {
        console.log("MAAL ACHE!");
    }

}

const AuthProvider = (props)=>{
    const [currentUser,setCurrentUser] = useState({});
    const signup = (email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password);
    }

    const login = (email,password) =>{
        return auth.signInWithEmailAndPassword(email,password);
    }

    const logout = ()=>{
        return auth.signOut();
    }

    const updateEmail = (email)=>{
        return currentUser.updateEmail(email);
    }

    const updatePassword = (password)=>{
        return currentUser.updatePassword(password)
    }


    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    },[]);

    return(
        <AuthContext.Provider value={{
            currentUser, signup, login, logout, updateEmail, updatePassword, postReview
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthProvider,useAuth, postReview};