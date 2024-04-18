import Image from "next/image";
import styles from "./featured.module.css";
import Link from "next/link";
const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>ESThER&apos;s Article</h1>
        <p className={styles.desc}>
          Ce Site est dédié à la publication d&apos;article et centre de 
          documentation de l&apos;Ecole Supérieure de Théologie et d&apos;Etudes Religieuses.
        </p>
        <div className={styles.buttons}>
        <button className={styles.button}> <Link href="https://esther-edu.mg" className={styles.button}>Voir plus</Link></button>
          <button className={styles.button}> <Link href="/contact" >Contact</Link></button>
        </div>
        <div className={styles.brands}>
          <Image src="/brands.png" alt="" fill className={styles.brandImg}/>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/hero.gif" alt="" fill className={styles.heroImg}/>
      </div>
    </div>
  );
};

export default Home;
