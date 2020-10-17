import React,{ useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import M from 'materialize-css'

var subu;
var da = []
var htf = {
    text:'',
    link:''
}

function Editblog() {
    const history = useHistory()
    const {id} = useParams()
    const [loading, setloading] = useState(false)
    const [image, setImage] = useState('')
    const [blogdata, setblogdata] = useState([])
    const [title, settitle] = useState('')
    const [altimg, setaltimg] = useState('')
    const [description, setdescription] = useState('')
    const [hyptext, sethyptext] = useState([])
    const [htl, sethtl] = useState('')
    const [imgurl, setImgurl] = useState('')
    const [ht, setht] = useState('')
    const [bulletpoint, setbulletpoint] = useState('')
    const [bulletpoints, setbulletpoints] = useState([])
    const [link, setlink] = useState('')
    const [links, setlinks] = useState([])
    const [category, setcategory] = useState('')
    const [categorys, setcategorys] = useState([])
    const [subtitl, setsubtitl] = useState('')
    const [subtitle, setsubtitle] = useState([])
    // console.log(id)
    useEffect(() => {
        fetch('/category/',{
            method:'get',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(result=>{
            setcategorys(result)
        }).catch(err=> console.log(err))

        fetch(`/blog/${id}`,{
            method:'get',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(blog => {
            setblogdata(blog)
            console.log(blog)
            setImgurl(blog[0].imgurl)
            settitle(blog[0].title)
            setsubtitle(blog[0].subtitle)
            setaltimg(blog[0].altimg)
            setcategory(blog[0].category)
            sethyptext(blog[0].HypText)
            setbulletpoints(blog[0].bulletPoints)
            setdescription(blog[0].description)
            setlinks(blog[0].links)
        }).catch(err=> console.log(err))
    }, [])
    const upload = () =>{
        if(!image){
            M.toast({html:"wait posting......<br />Don't perform any activities"})
            updateBlog()
        }else{
            M.toast({html:"wait posting......<br />Don't perform any activities"})
            const data = new FormData()
            data.append("file",image)
            data.append("upload_preset","insta-clone")
            data.append("cloud_name","dhhb3z0nt")
            M.toast({html:"wait posting......<br />Don't perform any activities"})
            fetch("	https://api.cloudinary.com/v1_1/dhhb3z0nt/image/upload",{
                method:"post",
                body:data
            })
            .then(res => res.json())
            .then(data=>{
                setImgurl(data.url)
                console.log(data.url)
                updateBlog()
            })
            .catch(err=>{
                console.log(err)
                setloading(false)
            })
        }
    }
    const updateBlog =() =>{
        fetch(`/blog/update/${blogdata._id}`,{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                imgurl,
                altimg,
                category,
                subtitle,
                HypText:hyptext,
                links,
                description,
                bulletPoints:bulletpoints
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            console.log('updated')
            history.push('/')
        }).catch(err => console.log(err))
    }
    const postData = (pro) => {
        setloading(true)
        if(pro === postImage){
            postImage()
        }
        if(pro === postBlog){
            postBlog()
        }
    }
    const postImage = () => {
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","dhhb3z0nt")
        M.toast({html:"wait posting......<br />Don't perform any activities"})
        setloading(false)
    }
    const postBlog = () =>{
        console.log('cool')
        setloading(false)
    }
    return (
        <div className='edit__blog'>
            <div className='edit__blog__box'>
                {blogdata.length ? <form onSubmit={e=>e.preventDefault()}>
                    <div className="file-field input-field">
                        <div className="btn waves-effect #64b5f6 blue darken-2">
                            <span>File</span>
                            <input style={{zIndex:'-1'}} type="file" onChange={e => setImage(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                    <button className='btn #64b5f6 blue darken-2'>update picture of blog</button>
                    <div className="input-field col s6">
                        <div>Title</div>
                        <input placeholder='Title' id="Title" type="text" value={title} onChange={e=>settitle(e.target.value)} className="validate" />
                    </div>
                    <form onSubmit={e=>{
                        e.preventDefault()
                        subu = subtitle
                        subu.push(subtitl)
                        setsubtitle(subu)
                        setsubtitl('')
                        console.log(subtitle,subtitl)
                    }}>
                        <div className="input-field col s6">
                            <div>Sub Title</div>
                            {subtitle && subtitle.map((tit,i)=>{
                                return <div key={i}style={{width:'100%',display:"flex"}} >
                                    <div style={{width:'60%',padding:'10px',margin:0}}>{tit}</div>
                                    <i onClick={() =>{
                                        subu = subtitle.filter(x=> x!==tit)
                                        setsubtitle(subu)
                                    }} style={{margin:'0px 5px',cursor:'pointer'}} className='material-icons'>remove_circle</i>
                                    <i onClick={()=>{
                                        subu = subtitle.filter(x=>x!==tit)
                                        setsubtitle(subu)
                                        setsubtitl(tit)
                                    }} style={{margin:'0px auto 0 0',cursor:'pointer'}}  className='material-icons'>create</i>
                                </div>
                            })}
                            <div style={{display:'flex'}}><input placeholder='Sub Title' id="sub_title" type="text" value={subtitl} onChange={e=>setsubtitl(e.target.value)} className="validate" />
                            <button style={{color:'black'}} className='btn material-icons N/A transparent'>send</button></div>
                        </div>
                    </form>
                    <div className="input-field col s6">
                        <div>Alternate Image text</div>
                        <input placeholder='alternate image text' type="text" className="validate" value={altimg} onChange={e=>setaltimg(e.target.value)} />
                    </div>
                    <div>Category</div>
                    <select className="browser-default" onChange={e=>setcategory(e.target.value)} value={category}>
                        <option defaultValue="">Choose your option</option>
                        {categorys.length && categorys.map((cat,i)=><option key={i} value={cat.category}>{cat.category}</option>)}
                    </select>
                    <form className="input-field col s6" onSubmit={e=>{
                        e.preventDefault()
                        subu = hyptext
                        htf.text=ht
                        htf.link=htl
                        console.log(htf)
                        subu.push({text:ht, link: htl})
                        sethyptext(subu)
                        setht('') 
                        sethtl('')
                    }}>
                        <div style={{width:'100%'}}>
                            <div>Hyper Texts</div>
                            {hyptext && hyptext.map((hyp,i)=>{
                                return <div key={i} style={{display:"flex",padding:'10px'}}>
                                        <div>{hyp.text} -- {hyp.link}</div>
                                        <i className='material-icons' onClick={()=>{
                                            setht(hyp.text)
                                            da.push(hyp)
                                            sethtl(hyp.link)
                                            subu = hyptext
                                            subu = subu.filter(x=> !da.includes(x))
                                            sethyptext(subu)
                                            da = []
                                        }} style={{margin:'0px 0 0 auto ',cursor:'pointer'}}>create</i>
                                        <i className='material-icons' onClick={()=>{
                                            da.push(hyp)
                                            subu = hyptext
                                            subu = subu.filter(x=> !da.includes(x))
                                            sethyptext(subu)
                                            da=[]
                                        }} style={{margin:'0px',cursor:'pointer'}}>delete</i>
                                    </div>
                            })}
                            <div style={{textAlign:'center'}}>
                                <input placeholder='text' value={ht} required onChange={(e)=>setht(e.target.value)} id="text" type="text" className="validate" />
                                <input placeholder='link' value={htl} required onChange={(e)=>sethtl(e.target.value)} id="text" type="text" className="validate" />
                                <button style={{color:'black'}} className='btn material-icons N/A transparent'>add</button>
                            </div>
                        </div>
                    </form>
                    <div className="input-field col s12">
                        <div>Description</div>
                        <textarea id="textarea1" placeholder='Description' value={description} onChange={e=>setdescription(e.target.value)} class="materialize-textarea"></textarea>
                    </div>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        subu = bulletpoints
                        subu.push(bulletpoint)
                        setbulletpoints(subu)
                        setbulletpoint('')
                    }}>
                        <div>Bullet points</div>
                        {bulletpoints && bulletpoints.map((point,i)=>{
                            return  <div key={i}style={{width:'100%',display:"flex"}} >
                            <div style={{width:'60%',padding:'10px',margin:0}}>{point}</div>
                            <i onClick={() =>{
                                subu = bulletpoints.filter(x=> x!==point)
                                setbulletpoints(subu)
                            }} style={{margin:'0px 5px',cursor:'pointer'}} className='material-icons'>remove_circle</i>
                            <i onClick={()=>{
                                subu = bulletpoints.filter(x=>x!==point)
                                setbulletpoints(subu)
                                setbulletpoint(point)
                            }} style={{margin:'0px auto 0 0',cursor:'pointer'}}  className='material-icons'>create</i>
                        </div>
                        })}
                        <div style={{display:'flex'}}>
                            <input placeholder='Bullet Point' value={bulletpoint} onChange={(e)=>{setbulletpoint(e.target.value)}}  />
                            <button style={{color:'black'}} className='btn material-icons N/A transparent'>send</button>
                        </div>
                    </form>       
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        subu = links
                        subu.push(link)
                        setlinks(subu)
                        setlink('')
                    }}>
                        <div>Links related to blog</div>
                        {links && links.map((lik,i)=>{
                            return  <div key={i}style={{width:'100%',display:"flex"}} >
                            <div style={{width:'60%',padding:'10px',margin:0}}>{lik}</div>
                            <i onClick={() =>{
                                subu = links.filter(x=> x!==lik)
                                setlinks(subu)
                            }} style={{margin:'0px 5px',cursor:'pointer'}} className='material-icons'>remove_circle</i>
                            <i onClick={()=>{
                                subu = links.filter(x=>x!==lik)
                                setlinks(subu)
                                setlink(lik)
                            }} style={{margin:'0px auto 0 0',cursor:'pointer'}}  className='material-icons'>create</i>
                        </div>
                        })}
                        <div style={{display:'flex'}}>
                            <input placeholder='Links Related to Blog' value={link} onChange={(e)=>{setlink(e.target.value)}}  />
                            <button style={{color:'black'}} className='btn material-icons N/A transparent'>send</button>
                        </div>
                    </form>   
                    <button className='btn #64b5f6 blue darken-2' onClick={()=>upload()} style={{margin:'10px'}}>submit</button>   
                    <Link to='/'><button className='btn #9e9e9e grey'>cancel</button> </Link>  
                </form>
                : <div style={{margin:'10px 40%'}}>loading....</div>
                }
            </div>
        </div>
    )
}

export default Editblog
// const Blogdata = {
    //     _id:'hv489y123409anl',
//     title : 'Small',
//     category : 'super cool one',
//     subtitle : ['sub1','sub2'],
//     imgurl : '/blogImg/undefined_1602658094645.png',
//     altimg:'image blog',
//     imgHypText:[{
//         text:'cool',
//         link:'linking'
//     }],
//     description:'sample description sample description sample description sample description sample description sample description sample description sample description sample description sample description sample description sample description ',
//     bulletPoints:['Super point 1', 'Superpoint 2'],
//     links:['link1','link2'],
//     HypText:[{text:'cool',link:'link 1'},{text:'cool 2',link:'link 2'}],
//     comments:[{text:'bloging comment',by:{username:'Sai'}},{text:'bloging comment',by:{username:'Harish'}},{text:'bloging comment',by:{username:'Yadav'}}]
// }