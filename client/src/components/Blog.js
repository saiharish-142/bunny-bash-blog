import React,{useContext} from 'react'
import Comments from './comments'
import {UserContext} from '../App'
import { Link } from 'react-router-dom'

function Blog({blogdata}) {
    const {state} = useContext(UserContext)
    return (
        <div className='blog'>
            {state && state.type==="admin" ? <>
            <Link to='/'><i style={{
                fontSize:"20px",
                margin:'0 auto',
                padding:'10px',
                color:'goldenrod',
                cursor:'pointer',
                float:'right'
                }} className='material-icons'>delete</i></Link>
            <Link to={`/edit/${blogdata._id}`}><i style={{
                fontSize:"20px",
                margin:'0 auto',
                padding:'10px',
                color:'goldenrod',
                cursor:'pointer',
                float:'right'
                }} className='material-icons'>create</i></Link>
                </>:''}
            <img src={blogdata.imgurl} style={{padding:'10px',width:'95%'}} alt={blogdata.altimg} /><br />
            <u className='blog__category'>{blogdata.category}</u>
            <div className='blog__title'>{blogdata.title}</div>
            <div className='blog__subtitles'>
                <ul style={{listStyle:'none',display:'flex',margin:0}}>
                    {blogdata.subtitle && blogdata.subtitle.map((tit,i) =>{
                        return <li style={{padding:'5px',display:'flex'}} key={i}>
                                <i style={{fontSize:"10px",padding:'10px',color:'goldenrod',cursor:'pointer'}} className='material-icons'>
                                    spa
                                </i> 
                                {tit}
                            </li>
                    })}
                </ul>
            </div>
            <p className='blog__description'>{blogdata.description}</p>
            <ul className='blog__bulletPoints'>
                {blogdata.bulletPoints && blogdata.bulletPoints.map((point,i)=>{
                    return <li key={i}>{point}</li>
                })}
            </ul>
            <div className='blog__links'>
                You can also refer or see<br /> 
                {blogdata.links && blogdata.links.map((link,i)=>{
                    return <a key={i} href={link}>{link}<br /></a>
                })}
            </div>
            <div className='blog__hyptext' style={{display:'flex'}} >
                {blogdata.HypText.map((link,i)=>{
                    return <div key={i} className='blog__hyptext__tab' ><a href={link.link}>{link.text}</a></div>
                })}
            </div>
            <hr />
            <Comments id={blogdata._id} comments={blogdata.comments} />
        </div>
    )
}

export default Blog
