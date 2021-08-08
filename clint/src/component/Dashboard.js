import React , {useEffect} from 'react';
import axios from 'axios'

const Dashboard = (props) => {

    const { tok , refr } = props

    console.log(refr)

    useEffect(() => {

        try {

            axios({
                url : '/user/dashboard',
                method : "get",
                headers: { 
                    'content-type': 'application/x-www-form-urlencoded',
                    'auth-token' : tok
                }
            })
            .then( res => console.log(res) )
            .catch( () => console.log("erro"))
            
        } catch {
            axios({
                url : '/user/token',
                method : "post",
                data : {
                    refToken : refr
                }
            })
            .then(e => console.log( "newtoken" , e))

            console.log("error")
        }
        

    }, [tok , refr])


    const su = () => {
        console.log("hi")

        axios({
            url : '/user/token',
            method : "POST",
            data : {
                refToken : refr
            }
        })
        .then(e => console.log( "newtoken" , e))
    }

    return (
        <div>
            <h1>Dashboard</h1>

            <button onClick={su}> submit token </button>
        </div>
    )
}

export default Dashboard
