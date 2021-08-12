import styles from './roomCode.module.scss'
import copy from '../assets/images/copy.svg'

   type copyProps={
    code:string
}


export function RoomCode(props:copyProps){
   
    function handleCopyCode(){
        navigator.clipboard.writeText(props.code)
    }
 return( 
      <div className={styles.roomButton}>
        <div onClick={handleCopyCode} className={styles.divCopyIcon}>
            <img className={styles.copyIcon} src={copy} alt="" />
        </div>
     
          <p>Sala {props.code}</p>
    </div> 
    )
}