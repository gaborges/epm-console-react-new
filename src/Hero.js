import React, {useEffect, useState} from "react";
import {database} from  "./fire"
import {child, get, ref} from "firebase/database";
import UserList from "./components/UserList"

const Hero = ({handleLogout}) => {

    const[usersList,setUsersList] = useState([]);

    async function GetUsers() {
        const dbRef = ref(database);
        get(child(dbRef, `Users/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setUsersList(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        return(0);
    }

    const RefreshButton = async () => {
        console.log("refresh button");
        await GetUsers();
    }

    useEffect(async ()=>{
        await GetUsers();
    },[]);

    return(
        <section className="hero">
            <nav>
                <h2>EPM Console</h2>
                <button hidden={true} onClick={RefreshButton}>Refresh</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <UserList userlist={usersList} func={GetUsers}/>
        </section>
    )
}

export default Hero;