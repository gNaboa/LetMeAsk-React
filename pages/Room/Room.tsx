import styles from './styles.module.scss'
import logo from '../../assets/images/logo.svg'
import copy from '../../assets/images/copy.svg'
import emptyquestions from '../../assets/images/empty-questions.svg'
export function Room(){

    type copyProps={
        code:string
    }
     function handleCopyCode(props:copyProps){
         navigator.clipboard.writeText(props.code)
     }
 
 
    return(
        <div>
        <div className={styles.header}>
                 <div className={styles.contentHeader}>
                     <img className={styles.logoImage} src={logo} alt="logo" />

                     <div className={styles.buttons}>
                            <div className={styles.roomButton}>
                                <div onClick={()=>handleCopyCode({code:'123'})} className={styles.divCopyIcon}>
                                    <img className={styles.copyIcon} src={copy} alt="" />
                                </div>
                             
                                  <p>Sala 456356</p>
                            </div>   

                            <button>Encerrar sala</button>       
                     </div>
                 </div>

        </div>


        <div className={styles.content}>
            
            <p className={styles.title}>Sala React Q&amp;A</p>
            <div className={styles.content2}>
                    <img src={emptyquestions} alt="" />
                    <strong>Nenhuma pergunta por aqui...</strong>
                    <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
            </div>
        </div>
    </div>
    )
}