import React, {useState, useEffect} from 'react';
import { createUserWithEmailAndPassword , 
  signInWithEmailAndPassword , 
  onAuthStateChanged, 
  signOut } from "firebase/auth";
import {auth} from  "./fire"
import Login from "./Login"
import Hero from "./Hero"
import './App.css';

function App() {

  const [user, setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }

  const handleLogin = async () =>{

    clearErrors();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
      })
      .catch((err) => {

        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }
  
  const handleSignUp = async () =>{

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;
        // ...
      })
      .catch((err) => {
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  }
  const handleLogout = async () => {
    await signOut(auth)
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      clearInputs();
      setUser(user);
    } else {
      setUser("");
    }
  });

  useEffect(()=>{
    //authListener();
  }, []);
    
  return (
    <div className="App">
      {user ? (
        <Hero 
          handleLogout={handleLogout}/>
      ):(
        <Login 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          handleSignUp={handleSignUp}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError} />
      )}
    </div>
  );
}

export default App;
