'use client'

import React from 'react'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Myprofile from '@components/profile';


function UserProfile({params}) {
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");
    console.log(params)
    
    const [userPosts, setUserPosts] = useState([]);
    
    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data)
        };

        if(params?.id) fetchPosts()
    }, [params.id])




  return (
    <Myprofile
    name={userName}
    desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
    data={userPosts}
  />
  )
}

export default UserProfile