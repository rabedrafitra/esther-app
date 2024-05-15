"use client";

import React, { useState } from "react";
import styles from "./search.module.css";
import Card from "../card/Card";

const searchData = async (searchTerm) => {
  let url = `https://esther-edu.vercel.app/api/posts?search=${encodeURIComponent(searchTerm)}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      try {
        const data = await searchData(term);
        setSearchResults(data.posts);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rechercher des articles </h1>
      
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.posts}>
        {searchResults.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Search;
