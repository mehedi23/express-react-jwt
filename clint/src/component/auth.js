import React , { useState } from 'react';
import axios from 'axios'

const Auth = () => {
    const [ userName , setUserName ] = useState('');
    const [ password , setPassword ] = useState('');


    const userNamefunction = e => {
        setUserName(e.target.value)
    }

    const passwordFunction = e => {
        setPassword(e.target.value)
    }

    const submit = () =>{
        let data = {
            username : userName,
            password : password
        }

        axios({
            url: '/user/login',
            method: "POST",
            data: data
        })
        .then(function (res) {

            let get_token = {
                "access" : res.headers['auth-token'],
                "refresh" : res.headers['refresh-token']
            }

            localStorage.setItem( "get_token" , JSON.stringify(get_token))

            console.log(res)

        })
        .catch(function (error) {
            console.log(error);
        });

    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Username"
                value={userName}
                onChange={userNamefunction}
            />
            <br/>
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={passwordFunction}
            />
            <br/>
            <br/>

            <button onClick={submit}> Log In </button>
        </div>
    )
}

export default Auth
