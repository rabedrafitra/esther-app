import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>ESThER</h1>
        </div>
        <p className={styles.desc}>
        Ce Site est dédié à la publication d&apos;article et centre de documentation 
        de l&apos;Ecole Supérieure de Théologie et d&apos;Etudes Religieuses.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="" width={18} height={18} />
          <Image src="/instagram.png" alt="" width={18} height={18} />
          <Image src="/tiktok.png" alt="" width={18} height={18} />
          <Image src="/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Liens</span>
          <Link href="/">Accueil</Link>
          <Link href="/">Article</Link>
          <Link href="/about">Infos</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Catégories</span>
          <Link href="/blog?cat=Ancien">Ancien Testament</Link>
          <Link href="/blog?cat=Nouveau">Nouveau Testament</Link>
          <Link href="/blog?cat=Pratique">Théologie Pratique</Link>
          <Link href="/blog?cat=Systématique">Théologie Systématique</Link>
          <Link href="/blog?cat=Missiologie">Missiologie</Link>
          <Link href="/blog?cat=Historique">Théologie Historique</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
