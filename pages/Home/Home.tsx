import ilustration from '../../assets/images/illustration.svg'
import logo from '../../assets/images/logo.svg'
import googleIcon from '../../assets/images/google-icon.svg'
import styles from './styles.module.scss'
import {useHistory} from 'react-router-dom'


import {FormEvent, FormEventHandler, useContext, useState} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebase'
export function Home(){
     
    

    const history = useHistory();
    const {user,handleSignIn} = useContext(AuthContext)
    const [roomCode,setRoomCode] = useState('')
  async  function handleHistory(){

        if(!user){
           await handleSignIn()
        }
 

        history.push('/room/new')

    }

  async  function handleEnterRoom(event:FormEvent){
        event.preventDefault();

        if(roomCode.trim()==''){
         
            return
        }

        const roomRef= await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()){
           alert('Essa sala não existe')
           return
        }


          history.push(`room/${roomCode}`)    
        
    }
  
    return(
        <div className={styles.container}>
            <aside >
                <img src={ilustration} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas Q&amp;A ao vivo</strong>
                <p>Tire as duvidas de sua audiência em tempo real</p>
            </aside>
            <main>
                <div className={styles.content}>
                    <img src={logo} alt="Letmeask" />
                     <button onClick={handleHistory} className={styles.gButton}>
                         <img src={googleIcon} alt="Google" />
                         Crie sua sala com o Google
                     </button>
                     <div  className={styles.separator}>ou entre em uma sala</div>
                  
                        <input value={roomCode}
                        onChange={(event)=>setRoomCode(event.target.value)} 
                        type="text" placeholder="Digite o código da sala" />
                  
                        <button onClick={handleEnterRoom}  className={styles.eButton} type="submit">
                            Entrar na sala
                        </button>
                 
                </div>
             
            </main>
        </div>
    )
}