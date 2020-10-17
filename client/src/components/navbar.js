import React,{ useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import bunny from '../logoimages/bunny.svg'
import {UserContext} from '../App'

function Navbar() {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    return (
        <div className='navbar'>
            {console.log(state)}
            <Link to='/'><div className='navbar__logo'><img style={{cursor:'pointer'}} width='120px' src={bunny} alt='Bunny Bash' /></div></Link>
            {state ?<div className='navbar__icons'>
                {state? state.type==='admin' && <Link to='/createBlog'>
                    <i style={{fontSize:"50px",color:'goldenrod',cursor:'pointer'}} className="material-icons">add</i>
                </Link>: ''}
                <Link to='/login'>
                    <i style={{fontSize:"50px",color:'goldenrod',cursor:'pointer'}} onClick={()=>{localStorage.clear()
                        dispatch({type:"CLEAR"})
                        history.push('/login')}} className="material-icons">exit_to_app</i>
                </Link>
                {/* <i style={{fontSize:"50px",color:'goldenrod',cursor:'pointer'}} className="material-icons">person</i> */}
            </div>:
            <div className='navbar__icons'>
                <Link to='/login'><button className='btn #37474f blue-grey darken-3' style={{margin:'5px'}}>login</button></Link>
            </div>}
        </div>
    )
}

export default Navbar