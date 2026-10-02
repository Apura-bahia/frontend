import styles from "./Parceria.module.css";

import publiImg from "../../assets/imgs/como-anunciar-publicidade-portal-stiep.png";

const Parceria = () => {
    return (
        <section className={styles.parceria__container}>
            <img 
                className={styles.parceria__img}
                src={publiImg}
                alt="Imagem da parceria"
            />
        </section>
    );
}

export default Parceria;