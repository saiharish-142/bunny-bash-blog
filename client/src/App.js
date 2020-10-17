import React,{createContext, useContext, useEffect, useReducer} from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Navbar from './components/navbar';
import Login from './screens/login';
import Signup from './screens/signup';
import Bloglist from './screens/bloglist';
import { reducer, InitialState} from './reducer/reducer'
import Editblog from './screens/Editblog';
import CreateBlog from './screens/createBlog';

export const UserContext = createContext()

var user;
user = JSON.parse(localStorage.getItem("user"))
const Routing = () => {
  // const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() => {
    if(user){
      dispatch({type:"USER",payload:user})
    }
  }, [dispatch])
  return(
    <>
          <Route 
            path='/' exact 
            component={Bloglist} 
          />
          {state && console.log(state.type)}
          <Route 
            path='/edit/:id'
            render={() => (user ? (user.type === "admin" ? <Editblog /> : <Redirect to='/'/>) : <Redirect to='/login' />)} 
          />
          <Route 
            path='/createBlog'
            render={() => (user ? (user.type === "admin" ? <CreateBlog /> : <Redirect to='/'/>) : <Redirect to='/login' />)} 
          />
          <Route 
            path='/signup' exact  
            render={() => (state ? <Redirect to="/" /> : <Signup />)} 
          />
          <Route 
            path='/login'  
            render={() => (state ? <Redirect to="/" /> : <Login />)} 
          />
    </>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState)
  // const {state,dispatch} = useContext(UserContext)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
        <Navbar />
        <div className='App__body'>
          <Routing />
        </div>
    </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
