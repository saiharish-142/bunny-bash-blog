import React,{useState, useEffect} from 'react'
import Blog from '../components/Blog'

function Bloglist() {
    useEffect(() => {
        fetch('/blog/',{
            method:'get',
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(blogs=>{
            setBlogData(blogs)
            console.log(blogs)
        }).catch(err => console.log(err))
    }, [])
    const [blogData, setBlogData] = useState('')
    return (
        <div className='blogList'>
            {blogData ? blogData.map((blogda,i)=> <Blog key={i} blogdata={blogda} />) : <div style={{margin:'10px 40%',fontSize:'30px'}}>Loading....</div>}
        </div>
    )
}

export default Bloglist

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
// {/* <Blog blogdata={Blogdata} />  */}