"use client";

import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import ReactPlayer from 'react-player';


 // Function to check if a URL points to an image
const isImageUrl = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);
// Function to check if a URL points to a video
const isVideoUrl = (url) => /\.(mp4|webm|ogg)$/i.test(url);
// Function to check if a URL points to a document
const isDocumentUrl = (url) => /\.(doc|docx|xls|xlsx|pdf)$/i.test(url);
     
const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>
      


    {item.img && (
          <div className={styles.imageContainer}>

            {isImageUrl(item.img) && (
              <Image src={item.img}  alt='Uplaoded Media' fill className={styles.image} />
            )}
            {isVideoUrl(item.img) && (
              <ReactPlayer url={item.img} controls={true} />
            )}

            {isDocumentUrl(item.img) && (
            <div className={styles.documentContainer}>
              <Image src="/document.png" alt='Document' fill className={styles.documentIcon} />
              <Link href={item.img} passHref>
                <span className={styles.documentLink}>View Document</span>
              </Link>
            </div>
            )}
          </div>
        )}

      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item.desc.substring(0, 60)}</p> */}
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0,60) }}/>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Lire plus
        </Link>
      </div>
    </div>
  );
};

export default Card;
