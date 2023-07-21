'use client'

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'
import { set } from 'mongoose'


const PrompCardList = ({data, handleTagClick}) => {

  console.log(data)
    return (
      <div className="mt-16 prompt_layout">
             
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
const [posts, setPosts]= useState([]);
const [searchText, setSearchText]= useState('');
const [searchTimeOut, setSearchTimeOut] = useState(null);
const [searchedResults, setSearchedResults] = useState([]);


const handleSearchChange = (e)=> {
   clearTimeout(searchTimeOut)
     setSearchText(e.target.value)

     setSearchTimeOut(
        setTimeout(()=>{
            const searchResult = filterPrompts(e.target.value);
             setSearchedResults(searchResult)
        }, 500)
     )

}

console.log(searchText)

useEffect(()=>{
  const fetchPosts = async () => {
    
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data)
  }
  fetchPosts();
}, [])

const filterPrompts = (searchtext) => {
  const regex= newRegExp(searchtext , "i")
  return posts.filter(
    (item)=>
       regex.test(item.username) || regex.test(item.tag) ||regex.text(item.prompt)
  )
}

const handleTagClick =(tagName) => {
   setSearchText(tagName)

   const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult)
}
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
         {
         searchText ? (
             <PrompCardList
             data={searchedResults}
             handleTagClick = {handleTagClick}
          />
              ) : (
             <PrompCardList
               data={posts}
              handleTagClick = {handleTagClick}
       />
         )}
        

    </section>
  )
}

export default Feed