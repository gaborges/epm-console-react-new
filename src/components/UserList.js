import React, {useEffect, useState} from "react";
import { getDatabase, ref,remove, set} from "firebase/database";
import {auth, database} from "../fire";
import {SignInMethod } from "firebase/auth";



function UserList(props) {

    async function IsEmailVerified(email,password){
        var auth = SignInMethod.EMAIL_PASSWORD(email,password);
        var content = auth.onAuthStateChanged;
        if (content.userid.IsEmailVerified === true){
            return "confirmado"
        }
        else return "não confirmado"
    }

    async function UpdateUser(userid,user){
        console.log("update_user_func_enable->" + userid);

        user.Enabled = true;
        
        const db = getDatabase();
        await set(ref(db, 'Users/' + userid), {
            AcademicTitles:user.AcademicTitles,
            Address:user.Address,
            Company:user.Company,
            Course:user.Course,
            City:user.City,
            CurrentCountry:user.CurrentCountry,
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
            Linkedin:user.Linkedin,
            Password:user.Password,
            PhoneNumber:user.PhoneNumber,
            ProfileURL:user.ProfileURL,
            Subcollege:user.Subcollege,
            University:user.University,
            RegisterDate:user.RegisterDate,
            //EmailChecked: IsEmailVerified(user.Email,user.Password)
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
            City:user.City,
            CurrentCountry:user.CurrentCountry,
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
            Linkedin:user.Linkedin,
            Password:user.Password,
            PhoneNumber:user.PhoneNumber,
            ProfileURL:user.ProfileURL,
            Subcollege:user.Subcollege,
            University:user.University,
            RegisterDate:user.RegisterDate,
            //EmailChecked: IsEmailVerified(user.Email,user.Password)
        });
        props.func();
    }

    async function DeleteUser(userid,user) {
        console.log("delete_user_func->" + userid);

        if (window.confirm('Are you sure you wish to delete this item?\n\nWarning: be aware that if you just activated the web service, the first deleted user action takes nearly 1 minute because the firebase must load all libraries and verify the authenticity from the SDK access.'))
        {

            console.log("Ação deletar: Resgata utilizador")
            console.log(user)



            var data = JSON.stringify({
                'id': userid,
                'email': user.Email
            });

            await fetch('http://localhost:5000/delete_user', {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("result data: "+data);
                    console.log("Pronto, excluído")
                    //setPosts((posts) => [data, ...posts]);
                    //setTitle('');
                    //setBody('');
                })
                .catch((err) => {
                    console.log(err.message);
                });

            console.log("Teste ação");
        } else {
            console.log("Cancelar ação");
        }
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
                    item[1].OESpecialization.toLowerCase().includes(strSearch.toLowerCase()) //||
                    //item[1].EmailChecked.toLowerCase().includes(strSearch.toLowerCase())
                  );
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
                <th>Register Date</th>
                <th id="ngr"></th>
            </tr>

            {enabledlist.map((user) =>
                <>
                    <tr>
                        <td>{user[1].FirstName}</td>
                        <td>{user[1].LastName}</td>
                        <td>{user[1].Email}</td>
                        <td>{user[1].OENumber}</td>
                        <td>{user[1].RegisterDate}</td>
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
                    <th>RegisterDate</th>
                    <th id="ngr"></th>
                </tr>

                {disabledlist.map((user) =>
                    <>
                        <tr>
                            <td>{user[1].FirstName}</td>
                            <td>{user[1].LastName}</td>
                            <td>{user[1].Email}</td>
                            <td>{user[1].OENumber}</td>
                            <td>{user[1].RegisterDate}</td>
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