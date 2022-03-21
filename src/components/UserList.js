import React, {useEffect, useState} from "react";
import { getDatabase, ref,remove, onValue, get ,child,set, query, orderByChild } from "firebase/database";
import {database} from "../fire";

function UserList(props) {

    async function UpdateUser(userid,user){
        console.log("update_user_func_enable->" + userid);

        user.Enabled = true;

        const db = getDatabase();
        await set(ref(db, 'Users/' + userid), {
            AcademicTitles:user.AcademicTitles,
            Address:user.Address,
            Company:user.Company,
            Course:user.Course,
            Dicas:user.Dicas,
            Email:user.Email,
            Enabled:user.Enabled,
            FirstName:user.FirstName,
            Gender:user.Gender,
            Id:user.Id,
            LastName:user.LastName,
            Lat:user.Lat,
            Lon:user.Lon,
            OENumber:user.OENumber,
            OESpecialization:user.OESpecialization,
            OriginCountry:user.OriginCountry,
            OtherInfo:user.OtherInfo,
            Password:user.Password,
            PhoneNumber:user.PhoneNumber,
            ProfileURL:user.ProfileURL,
            Subcollege:user.Subcollege,
            University:user.University
        });
        props.func();
    }

    async function UpdateUser_disable(userid,user){
        console.log("update_user_func_disable->" + userid);

        user.Enabled = false;

        const db = getDatabase();
        await set(ref(db, 'Users/' + userid), {
            AcademicTitles:user.AcademicTitles,
            Address:user.Address,
            Company:user.Company,
            Course:user.Course,
            Dicas:user.Dicas,
            Email:user.Email,
            Enabled:user.Enabled,
            FirstName:user.FirstName,
            Gender:user.Gender,
            Id:user.Id,
            LastName:user.LastName,
            Lat:user.Lat,
            Lon:user.Lon,
            OENumber:user.OENumber,
            OESpecialization:user.OESpecialization,
            OriginCountry:user.OriginCountry,
            OtherInfo:user.OtherInfo,
            Password:user.Password,
            PhoneNumber:user.PhoneNumber,
            ProfileURL:user.ProfileURL,
            Subcollege:user.Subcollege,
            University:user.University
        });
        props.func();
    }

    async function DeleteUser(userid,user){
        console.log("delete_user_func->" + userid);

        const db = getDatabase();
        await remove(ref(db, 'Users/' + userid));
        props.func();
    }

    const[strSearch, onStrSearch] = useState("")

    const[disabledlist, setdisabledlist] = useState( [])

    const[enabledlist, setenabledlist] = useState( [])


    useEffect(() => {

        let data = props.userlist;

        console.log("data",data)

        let listdata = Object.entries(data);
        console.log("listdata",listdata)

        let t = listdata.filter((item)=>{
            return (item[1].Enabled === false);
        })
        setenabledlist(t)

        let t1 = listdata.filter((item)=>{
            return (item[1].Enabled === true);
        })
        setdisabledlist(t1)

        console.log("t", t)
        console.log("enabledlist",enabledlist)
        console.log("disabledlist",disabledlist)

    }, [props])

    useEffect( ()=>{
        let data = props.userlist;

        console.log("data",data)

        let listdata = Object.entries(data);
        console.log("listdata",listdata)

        if (strSearch.length)
            listdata = listdata.filter((item)=>{
                return (
                    item[1].Email.toLowerCase().includes(strSearch.toLowerCase()) ||
                    item[1].FirstName.toLowerCase().includes(strSearch.toLowerCase()) ||
                    item[1].LastName.toLowerCase().includes(strSearch.toLowerCase()) ||
                    item[1].OENumber.toLowerCase().includes(strSearch.toLowerCase()) ||
                    item[1].OESpecialization.toLowerCase().includes(strSearch.toLowerCase()));
            })




        let t = listdata.filter((item)=>{
            return (item[1].Enabled === false);
        })
        setenabledlist(t)

        let t1 = listdata.filter((item)=>{
            return (item[1].Enabled === true);
        })
        setdisabledlist(t1)

        console.log("t", t)
        console.log("enabledlist",enabledlist)
        console.log("disabledlist",disabledlist)

    }, [strSearch])

    return(
        <div>
            <input placeholder="Search" id="search_input" value={strSearch} onChange={e=>{
                onStrSearch(e.target.value)
            }}/>
            <h2 id="table_title">Inactive Users</h2>
        {enabledlist && enabledlist.length ?
        <table id="bixo-table">
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>OE Number</th>
                <th id="ngr"></th>
            </tr>

            {enabledlist.map((user) =>
                <>
                    <tr>
                        <td>{user[1].FirstName}</td>
                        <td>{user[1].LastName}</td>
                        <td>{user[1].Email}</td>
                        <td>{user[1].OENumber}</td>
                        <td ><button id="button-allow" onClick={async()=>{
                            await UpdateUser(user[0],user[1]);
                        }}>Allow</button></td>
                        <td ><button id="button-delete" onClick={async()=>{
                            await DeleteUser(user[0],user[1]);
                        }}>Delete</button></td>
                    </tr>
                </>
            )}

        </table>:
            <h1 id="no-users">No Users to activate</h1>
        }
            <h2 id="table_title">Active Users</h2>
        {disabledlist && disabledlist.length ?
            <table id="bixo-table">
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>OE Number</th>
                    <th id="ngr"></th>
                </tr>

                {disabledlist.map((user) =>
                    <>
                        <tr>
                            <td>{user[1].FirstName}</td>
                            <td>{user[1].LastName}</td>
                            <td>{user[1].Email}</td>
                            <td>{user[1].OENumber}</td>
                            <td ><button id="button-allow" onClick={async()=>{
                                await UpdateUser_disable(user[0],user[1]);
                            }}>Block</button></td>
                            <td ><button id="button-delete" onClick={async()=>{
                                await DeleteUser(user[0],user[1]);
                            }}>Delete</button></td>
                        </tr>
                    </>
                )}

            </table>:
            <h1 id="no-users">No Users Registered</h1>
        }

        </div>
    );
}

export default UserList;