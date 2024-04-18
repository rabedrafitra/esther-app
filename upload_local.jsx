import Image from "next/image";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"; // Suppression de getDownloadURL
import { app } from "@/utils/firebase";
import ReactQuill from "react-quill";

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          console.log("File uploaded successfully");
          // Remplacer l'ancienne logique par la nouvelle
          setMedia(name); // Enregistrer le nom du fichier téléversé
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === "loading") {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    // Envoi des données de formulaire à l'API
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value,
        img: media, // Utiliser le nom du fichier téléversé au lieu de l'URL Firestore
        slug: slugify(title),
        catSlug: catSlug || "Ancien",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    } else {
      console.error("Failed to publish article");
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

      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
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
              <Image src="/external.png" alt="" width={30} height={30} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={30} height={30} />
            </button>
          </div>
        )}

        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Ecrire ici votre article..."
        />

        <button className={styles.publish} onClick={handleSubmit}>
          Publier
        </button>
      </div>
    </div>
  );
};

export default WritePage;
