import styles from "../styles/home.module.css"
import Board from "../images/board.jpg"
import founder from "../images/founder.jpg"
import care from  "../images/care.jpg"

const Awards = () => {
    return (<div className={styles.awardsInterface}>
      <img className={styles.firstImage} src={Board} />
        <div className={styles.nextImages}>
    <img src={founder}/>
    <img src={care} />
        </div>

    </div>)
}

export default Awards;