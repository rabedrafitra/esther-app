import CardList from "../../components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "../../components/Menu/Menu";
import Navbar from "../../components/navbar/Navbar";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;
  
  return (
    
    <div className={styles.container}>
      <h1 className={styles.title}> Article sur le thème {cat}</h1>
      <div className={styles.content}>
        
        <CardList page={page} cat={cat}/>
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
