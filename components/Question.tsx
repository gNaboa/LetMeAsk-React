import styles from './question.module.scss'
import like from '../assets/images/like.svg'

type QuestionProps = {
      question:string,
 
        name?:string,
        photo?:string
    
}

export function Question({question,name,photo}:QuestionProps){
    return(
        <div className={styles.container}>
              <p className={styles.question}>{question}</p>
              <div className={styles.questionFooter}>
                   <div className={styles.userInfo} >
                            <img src={photo} alt="" />
                            <p>{name}</p>
                   </div>
                   <div className={styles.likes}>
                       <p>21</p>
                      <img src={like} alt="" />

                   </div>
              </div>
        </div>
    )
}