"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import prisma from "../../utils/connect";
import { NextResponse } from "next/server";



const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `https://esther-edu.vercel.app/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await fetch("https://esther-edu.vercel.app/api/comments", {
      method: "POST",
      body: JSON.stringify({ desc, postSlug }),
    });
    mutate();
  };




  const handleDeleteComment = async (id) => {
    try {
      const res = await fetch("https://esther-edu.vercel.app/api/comments", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Refresh comments after deleting one
        mutate();
      } else {
        if (res.status === 403) {
          setError("You are not authorized to delete this comment!");
          alert('Vous n\'êtes pas autorisé à supprimer ce commentaire');
        } else {
          setError(data.message);
        }
        setTimeout(() => {
          setError(null); // Clear the error after 5 seconds
        }, 5000);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert('Erreur lors de la suppresion du commentaire');
    }
  };

 

 


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Commenter</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="Ecrire un commentaire..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Envoyer
          </button>
        </div>
      ) : (
        <Link href="/login">Connecter pour écrire un commentaire</Link>
      )}
     
  

      <div className={styles.comments}>
        {isLoading
          ? "Chargement"
          : data?.map((item) => (
              <div className={styles.comment} key={item.id}>
                <div className={styles.user}>
                  {item?.user?.image && (
                    <Image
                      src={item.user.image}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                  )}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span>
                    <span className={styles.date}>{item.createdAt}</span>
                  </div>
                </div>
                <p className={styles.desc}>{item.desc}</p>
                {status === "authenticated" && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteComment(item.id)}
                    >
                      Supprimer
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
