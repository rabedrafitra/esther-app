"use client"

import Menu from "../../../components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "../../../components/comments/Comments";
import ReactPlayer from 'react-player'
import Link from "next/link";



const getData = async (slug) => {
  const res = await fetch(`https://esther-edu.vercel.app/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed1");
  }

  return res.json();
};






const handleDeletePost = async (id) => {
  try {
    const res = await fetch("https://esther-edu.vercel.app/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    
    const data = await res.json();
   

    if (res.ok) {
      alert('Post supprimer avec succès!');
    
    } else {
      if (res.status === 403) {
        setError("You are not authorized to delete this post!");
        alert('Vous n\'êtes pas autorisé à supprimer ce post!');
      } else {
        setError(data.message);
      }
      setTimeout(() => {
        setError(null); // Clear the error after 5 seconds
      }, 5000);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    alert('erreur lors de la suppression du post');
  }
};





const SinglePage = async ({ params }) => {
  const { slug } = params;
  
// Function to check if a URL points to an image
const isImageUrl = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);
// Function to check if a URL points to a video
const isVideoUrl = (url) => /\.(mp4|webm|ogg)$/i.test(url);
// Function to check if a URL points to a document
const isDocumentUrl = (url) => /\.(doc|docx|xls|xlsx|pdf)$/i.test(url);
  

  const data = await getData(slug);



  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}<button className={styles.addButton} onClick={() => handleDeletePost(data?.id)}>
              <label htmlFor="image" >
                <Image src="/x.png" alt="" width={30} height={30} />
              </label>
            </button> 
        </h1> 
          
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}

            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user?.name}</span>
              <span className={styles.date}>{data?.createdAt}</span>
            </div>
          </div>
        </div>
        

        {data?.img && (
           <div className={styles.imageContainer}>
            
            {isImageUrl(data.img) && (
              
                <Image src={data.img}  alt='Uplaoded Media' fill className={styles.image} />
              
            )}
            
            {isVideoUrl(data.img) && (
              
                <ReactPlayer url={data.img} controls={true} />
              
            )}

            {isDocumentUrl(data.img) && (
            <div className={styles.documentContainer}>

                
                <div className={styles.documentLink}>
                      <Link href={data.img} > 
                      <button className={styles.documentButton}> Voir le document</button>
                  </Link>
                     
                </div>
             
            </div>
            
            )}
            
          </div>
        )}


      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
            <button className={styles.deleteButton} onClick={() => handleDeletePost(data?.id)} >
                      Supprimer Post
                  </button>


          <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
