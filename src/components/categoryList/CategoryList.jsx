"use client";

import React, { useState, useEffect } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
        const data = await response.json();
      console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchData();

  }, []); // Le tableau vide en tant que deuxième argument signifie que ce useEffect s'exécutera une seule fois après le montage initial.

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Nos Catégories</h1>
      <div className={styles.categories}>
        {categories.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
