import React, { useState, useContext } from 'react'
import Avatar from  '@material-ui/core/Avatar'
import {UserContext} from '../App'

// var con;

function Comments({id,comments}) {
    const [commentss, setcommentss] = useState(comments)
    const [text, settext] = useState('')
    const {state} = useContext(UserContext)
    // console.log(commentss,id)
    return (
        <div className='comments'>
            <div className='comments__title'>Comments</div>
            <div>{
                commentss.map((comment,i)=>{
                    return <div key={i} className='comments__comment'>
                        <Avatar
                            className='post__avatar'
                            alt={comment.by.username}
                            src='/'
                        />
                        <div className='comment__text'>{comment.text}</div>
                    </div>
                })
            }</div>
            {state && <form onSubmit={(e)=>{
                e.preventDefault()
                fetch('/blog/comment',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        text:text,
                        blogId:id
                    })
                }).then(res=>res.json())
                .then(result => {
                    setcommentss(result.comments)
                }).catch(err=>console.log(err))
                settext('')
                // makeComment(e.target[0].value,post._id)
            }}  style={{display:"flex",padding:'10px 30px'}}
            >
                <input type='text' value={text} onChange={e=>{
                    settext(e.target.value)
                    }} placeholder='comment' />
                <button className='btn #ffffff white'><i className="material-icons" style={{color:"#64b5f6"}} >{"send"}</i></button>
            </form>}
        </div>
    )
}

export default Comments
