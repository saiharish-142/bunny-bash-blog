import React,{ useState, useContext } from 'react'
import M from 'materialize-css'
import { Link, useHistory } from 'react-router-dom'
import {UserContext} from '../App'

function Signup() {
    const history = useHistory()
    const {dispatch} = useContext(UserContext)
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const loginfo = () => {
        M.toast({html:"signing in please wait", classes:'#9e9d24 lime darken-3'})
        fetch('/auth/signup',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,password
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error){
                M.toast({html:data.error, classes:'#ff5252 red accent-2'}) 
            }else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signedin Successfully", classes:'#69f0ae green accent-2'})
                history.push('/')
            }
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div className='login'>
            <div className='login__box'>
                <div className='login__title'>SIGN UP</div>
                <form className='login__form'
                    onSubmit={e=>e.preventDefault()}
                >
                    <input type='text' required placeholder='username' value={username} onChange={e=>setusername(e.target.value)} />
                    <input type='password' required placeholder='password' value={password} onChange={e=>setpassword(e.target.value)} />
                    <button className='btn' onClick={() => loginfo()} type='submit'>signup</button>
                </form>
                <div style={{paddingBottom:'20px'}}>Have an account? <Link to='/login'>login</Link></div>
            </div>
        </div>
    )
}

export default Signup
