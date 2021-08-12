import ilustration from '../../assets/images/illustration.svg'
import {Link} from 'react-router-dom'
import logo from '../../assets/images/logo.svg'
import { useHistory } from 'react-router-dom'
import styles from './styles.module.scss'
import {FormEvent, useState} from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebase'

export function CreateRoom(){
      
    const [room,setRoom] = useState('')
     const {user} = useContext(AuthContext)
     const history = useHistory()

     async function handleCreateNewRoom(event:FormEvent){
            event.preventDefault()
            if(room.trim()==''){
           
                return
               
            }

            const roomRef = database.ref('rooms')
            const firebaseRoom= roomRef.push({
                title:room,
                authorId:user?.id
            })

            history.push(`/room/${firebaseRoom.key}`)
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
               
                 <div  className={styles.separator}>Crie uma nova sala</div>
                 
                 <form action="" onSubmit={handleCreateNewRoom}>

                    <input type="text"
                    onChange={(event)=>setRoom(event.target.value)} 
                        value={room} placeholder="Nome da sala" />

                    <button  className={styles.eButton} type="submit">
                        Criar sala
                    </button>
                 </form>
                 <p>Quer entrar em uma sala já existente ? <Link to='/'> Clique aqui </Link></p>
            </div>
         
        </main>
    </div>
     )
}