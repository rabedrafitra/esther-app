"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./menuTop.module.css";

const MenuTop = () => {
  const [topPosts, setTopPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://esther-edu.vercel.app/api/top`);
        const data = await response.json();
      console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        setTopPosts(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();

  }, []); 

  return (
    <div className={styles.items}>
      {topPosts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.id} className={styles.item}>
          <div className={styles.imageContainer}>
            <Image src={post.user.image} alt="" fill className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <span className={styles.category.ancien}>{post.title}</span>
            <h2 className={styles.postTitle}>
              {post.user.name}
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

export default MenuTop;
