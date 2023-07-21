
"use client";

import React from 'react'
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import {pathname, usePathname, useRouter} from 'next/navigation'
import { useState } from 'react';


function PromptCard({post, handleTagClick, handleEdit, handleDelete}) {
  const {data:session} = useSession();
  const pathName= usePathname();
  const router= useRouter()

  const [copied, setCopied] = useState("");
  const handleCopy = ()=> {
    setCopied(post.prompt); //update the 'copied' state with the prompt content
    navigator.clipboard.writeText(post.prompt); //copy the prompt text and write it to the clip board
    setTimeout(()=>setCopied(""), 3000); //after 3s, update the 'copied' state to an  empty string
  }

  const handleProfileClick = () => {
         router.push('/user-profile');
  }
  return (
    <div className='promt_card'>
        <div className='flex justify-between items-start gap-5'>
               <div className="flex-1 flex justify-start items-center
               gap-3 cursor-pointer">
      
                  <Image
                  src={post.creator.image} 
                  alt="user_image"
                  width= {40}
                  height={40}
                  className="rounded-full object-contain"
                  onClick={handleProfileClick}
                  />  

                  <div className="flex flex-col">
                    <h3 className='font-satoshi font-semibold
                     text-gray-900'>
                      {post.creator.username}
                      </h3>
                    <p className="font-inter text-sm text-gray-500">
                      {post.creator.email}
                      </p>
                  </div>
               </div>
                {/* button starts // copy-to-clipboard functionality*/}
               <div className='copy_btn' onClick={handleCopy}>
                     <Image 
                        src={copied===post.prompt ? '/assets/icons/tick.svg'
                        : 'assets/icons/copy.svg'}
                        width={12}
                        height={12}
                        
                     />
               </div>
               {/* button ends */}
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className='font-inter text-sm blue_gradient
         cursor-pointer'
         onClick={()=> handleTagClick && handleTagClick(post.tag)}
         >
          #{post.tag}</p>


{session?.user.id === post.creator._id && pathName ==='/profile' && (
    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
        <p className='font-inter text-sm green_gradient cursor-pointer'
        onClick={handleEdit}
        >
           Edit
        </p>

         <p className='font-inter text-sm orange_gradient cursor-pointer'
        onClick={handleDelete}
        >
           Delete
        </p>
    </div>
) }
    </div>
  )
}

export default PromptCard