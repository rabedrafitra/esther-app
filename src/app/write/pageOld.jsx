"use client";

import Image from "next/image";
import axios from 'axios';
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';

// import ReactQuill from "react-quill";


const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  // const [ReactQuill, setReactQuill] = useState(null); // Laissez-le null initialement
  const [value, setValue] = useState("");
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
  const [quillActivated, setQuillActivated] = useState(false);



  

  


  useEffect(() => {
    
    const uploadImage = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const response = await axios.post("/api/upload", formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          if (response.status === 200) {
            const data = response.data;
            setMedia(data.url);
          } else {
            console.error("Failed to upload file");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    };
    uploadImage();
  }, [file]);


  const handleActivateQuill = () => {
    
    setQuillActivated(true);

  };
  


  if (status === "loading") {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  // const slugify = (str) => {
  //   if (typeof document === 'undefined') {
  //     // Environnement côté serveur
  //     // Vous pouvez traiter le slugification différemment ou ignorer cette étape si nécessaire
  //     return str;
  //   }
  const slugify = (str) => {
    if (typeof document === 'undefined') {
      // Environnement côté serveur
      // Vous pouvez traiter le slugification différemment ou ignorer cette étape si nécessaire
      return str;
    }
  
    // Environnement côté client
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "Ancien", //If not selected, choose the general category
      }),
    });

    if (res.status === 408) {
      alert('Compte non vérifié! Vous n\êtes pas autorisé à publier');
      router.push(`/`);
    }
    

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  

   
  };
 



  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Ecrire un Article</h1>
       <input
        type="text"
        placeholder="Titre"
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
    
    
      <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
        <option value="Ancien">Ancien Testament</option>
        <option value="Nouveau">Nouveau Testament</option>
        <option value="Pratique">Théologie Pratique</option>
        <option value="Culture">Théologie Systématique</option>
        <option value="Missiologie">Missiologie</option>
        <option value="Historique">Théologie Historique</option>
      </select>

      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={30} height={30} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={30} height={30} />
              </label>
            </button>
            <button className={styles.addButton}>
            <label htmlFor="image">
              <Image src="/external.png" alt="" width={30} height={30} />
            </label>
            </button>
            
            <button className={styles.addButton}>
            <label htmlFor="image">
              <Image src="/video.png" alt="" width={30} height={30} />
            </label>
            </button>
            
          </div>
   )}
        

        {!quillActivated && (
          <button className={styles.addButton} onClick={handleActivateQuill}>
            <Image src="/pencil.png" alt="Pencil Icon" width={30} height={30} />
          </button>
        )}
        
        {quillActivated && (
          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Écrire ici votre article..."
          />
        )}
        

       
       <div>
          <button className={styles.publish} onClick={handleSubmit}>
            Publier
          </button>
       </div>
        
         
      </div>
      
      
    
    
    </div>
  );
};

export default WritePage;
