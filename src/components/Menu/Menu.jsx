import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuTop from "../menuTop/MenuTop";
import MenuCategories from "../menuCategories/MenuCategories";
import MenuPosts from "../menuPosts/MenuPosts";

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>{"Decouvrez!"}</h2>
      <h1 className={styles.title}>Les Meilleures vues par titre</h1>
      <MenuTop />
      <h2 className={styles.subtitle}>Decouvrez par</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />
      <h2 className={styles.subtitle}>Choisissez par Auteur</h2>
      <h1 className={styles.title}>Editeur</h1>
      <MenuPosts  />
    </div>
  );
};

export default Menu;
