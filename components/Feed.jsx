"use client";

import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PageviewIcon from '@mui/icons-material/Pageview';
import BeatLoader from "react-spinners/BeatLoader";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    setIsLoading(true);
    const response = await fetch("/api/prompt", { cache: 'no-store' });
    const data = await response.json();

    setAllPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <p className="head_text">
        <PageviewIcon fontSize="inherit" style={{ color: '#b9bbbe' }}/>
      </p>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Pretraži...'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
          style={{ backgroundColor: '#202225', borderColor: "#23272a", color: 'white'}}
        />
      </form>
      
      {/* All Prompts */}
      {isLoading ? (
        <div style={{ marginTop: "110px" }}> {/* add top margin to div */}
        <BeatLoader color={"#5865f2"} />
      </div>
      ) : searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;