import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>Qui sommes nous ?</h2>
        <h1 className={styles.title}>
         Ecole Supérieure de Théologie et d&apos;Etudes Religieuses
        </h1>
        <p className={styles.desc}>
        Force est de constater que la source de la culture moderne et de l&apos;identité de la nation malgache proviennent 
        de l&apos;esprit du protestantisme hybridisé avec la philosophie et la vision du monde des dirigeants précoloniaux, 
        dont ni les missionnaires, ni la puissance coloniale n&apos;a pu éradiquer. A cet effet, l&apos;objectif global des formations délivrées
         à l&apos;Ecole est de former des pasteurs et des laïcs pouvant converger d&apos;une manière hybride la tradition Réformée du 16ème siècle 
         et la culture Malagasy pour faire face à l&apos;autodestruction de cette culture et de la société ainsi que l&apos;ambigüité de l&apos;esprit 
         du protestantisme à Madagascar.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>FJKM</h1>
            <p>Nous sommes avec la FJKM</p>
          </div>
          <div className={styles.box}>
            <h1>ONIFRA</h1>
            <p>Nous sommes avec l&apos;Oniversity FJKM Ravelojaona</p>
          </div>
          <div className={styles.box}>
            <h1>Online</h1>
            <p>Enseignement en ligne</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;
