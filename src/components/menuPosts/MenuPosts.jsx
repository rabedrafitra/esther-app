"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./menuPosts.module.css";

const MenuPosts = () => {
  const [topPosts, setTopPosts] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://esther-edu.vercel.app/api/top`);
        const data = await response.json();
      console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch Top Posts');
        }
        setTopPosts(data);
      } catch (error) {
        console.error("Failed to fetch Top Posts:", error);
      }
    };

    fetchData();

  }, []); 

  return (
    <div className={styles.items}>
      {topPosts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.id} className={styles.item}>
          {
            <div className={styles.imageContainer}>
              <Image src={post.user.image} alt="" fill className={styles.image} />
            </div>
          }
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.catSlug]}`}>{post.user.name}</span>
            <h2 className={styles.postTitle}>
              {post.title}
            </h2>
            <div className={styles.detail}>
              <span className={styles.username}>{post.catSlug}</span>
              <span className={styles.date}> - {new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
