'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'


const PrompCardList = ({data, handleTagClick}) => {

  console.log(data)
    return (
      <div className="mt-16 prompt_layout">
             {console.log(data)}
            {data.map((post)=> (
            
                <PromptCard
                  key = {post._id}
                  post = {post}
                  handleTagClick = {handleTagClick} 
                  />
            ))}
      </div>
    ) 
}




function Feed() {
const [posts, setPosts]= useState([])
const [searchText, setSearchText]= useState('')


const handleSearchChange = (e)=> {

}

useEffect(()=>{
  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data)
  }
  fetchPosts();
}, [])
  return (
    <section className="feed">
        <form className="relative w-full flex-center">
             <input 
             type='text'
             placeholder="Search for a tag or username"
             value={searchText}
             onChange={handleSearchChange}
              required
              className='search_input peer'
             />
        </form>

        <PrompCardList
           data={posts}
           handleTagClick = {()=>{}}
        />

    </section>
  )
}

export default Feed