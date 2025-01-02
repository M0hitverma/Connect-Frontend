'use client'
import React, { useEffect, useState } from 'react'
import  PostCard  from '../Common/PostCard';
import { getPosts } from '@/api/CommonApi';
 const PostContainer = () => {
    const [page, setPage]= useState(1);
    const [posts, setPosts]= useState([]);
    useEffect(()=>{
     const fetchPosts = async()=>{
        const response = await getPosts({page});
        if(response.ok && response?.posts){
            setPosts((prevPosts)=>([...prevPosts, ...response.posts]))
            
        }else{
            console.log(response);
        }
     }
      fetchPosts();
    },[page]);
  return (
    
    <div className='flex flex-col gap-3  w-full md:px-10 px-3 py-6'>
        
        {posts.map((post,index)=>(
            <div key={index}>
               <PostCard post={post}/>
               
            </div>
        ))}
    </div>

  )
}
export default PostContainer;