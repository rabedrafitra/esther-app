
import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=missiologie"
        className={`${styles.categoryItem} ${styles.style}`}
      >
        Missiologie
      </Link>
      <Link href="/blog?cat=ancien" className={`${styles.categoryItem} ${styles.at}`}>
        Ancien
      </Link>
      <Link href="/blog?cat=nouveau" className={`${styles.categoryItem} ${styles.nt}`}>
        Nouveau
      </Link>
      <Link href="/blog?cat=systématique" className={`${styles.categoryItem} ${styles.ts}`}>
        Systématique
      </Link>
      <Link href="/blog?cat=pratique" className={`${styles.categoryItem} ${styles.tp}`}>
        Pratique
      </Link>
      <Link href="/blog?cat=historique" className={`${styles.categoryItem} ${styles.th}`}>
        Historique
      </Link>
    </div>
  );
};

export default MenuCategories;
