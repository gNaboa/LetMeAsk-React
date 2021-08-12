import styles from './styles.module.scss'
import logo from '../../assets/images/logo.svg'

import emptyquestions from '../../assets/images/empty-questions.svg'
import { RoomCode } from '../../components/RoomCode'
import {useParams} from 'react-router-dom'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../services/firebase'
import {Question} from '../../components/Question'
export function RoomUser(){
  type paramsProps = {
      id:string
  } 
    

 type QuestionProps= {
    question:string,
    author:{
        name:string,
        avatar:string
    },
    isHighLighted:boolean,
    isAnswered:boolean
     
 }[]

// type fireBaseQuestions= Record<string,{
//     question:string,
//     author:{
//         name:string,
//         avatar:string
//     },
 
//     isHighLighted:boolean,
//     isAnswered:boolean
// }>

const [questions,setQuestions] = useState<QuestionProps>([])
const [text,setText] = useState('')

const params = useParams<paramsProps>()

const {user} = useContext(AuthContext)

async function handleSendQuestion(event:FormEvent){
      
    event.preventDefault()
 
    if(text.trim()==''){
        alert('Envie uma pergunta !')
        return
    }
    if(!user){
       throw new Error('Faça login para enviar perguntas')
        
    }
     const sendquestion = {
         question:text,
         author:{
             name:user.name,
             avatar:user.photo
         },
         isHighLighted:false,
         isAnswered:false

     }

        await database.ref(`rooms/${params.id}/question`).push(sendquestion) 
         setQuestions([...questions,sendquestion])
         setText('')
}

//  useEffect(()=>{
   
//  const roomRef= database.ref(`/rooms/${params.id}`)
 
//  roomRef.on('value',(room)=>{
//     const databaseRoom = room.val()
//   const firebaseQuestions : fireBaseQuestions = databaseRoom.questions ?? {}
//     const parsedQuestions  = Object.entries(firebaseQuestions).map(([key,value])=>{

//      return{
//       id:key,
//      question:value.question,
//          author:value.author,
//         isHighLighted:value.isHighLighted,
//         isAnswered:value.isAnswered    }


//    })
//    setText(databaseRoom.title)
//    setQuestions(parsedQuestions)
//  })
//  },[params.id])

    return(
        <div>
        <div className={styles.header}>
                 <div className={styles.contentHeader}>
                     <img className={styles.logoImage} src={logo} alt="logo" />

                     <div className={styles.buttons}>
                            <RoomCode code={params.id} />

                              
                     </div>
                 </div>

        </div>


        <div className={styles.content}>
            
            <p className={styles.title}>Sala React Q&amp;A</p>
            <form action="" onSubmit={handleSendQuestion}>
                        <textarea value={text} onChange={(event)=>setText(event.target.value)} placeholder="O que você quer perguntar ?"></textarea>
                        <div className={styles.footForm}>
                           {user ?
                            <div className={styles.userInfo}>
                                <img src={user.photo} alt="" />
                            
                                <p>{user.name}</p>
                            </div>
                            : <p>Para enviar sua pergunta, <button className={styles.pButton} >faça login</button></p>}

                            <button  disabled={!user} className={styles.sendButton}>Enviar pergunta</button>
                        </div>
            </form>
            {
                questions.length == 0 ? 
            <div className={styles.content2}>
                 
             
                <>
                <img src={emptyquestions} alt="" />
                    <strong>Nenhuma pergunta por aqui...</strong>
                    <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
                 </> 
                     
            </div> :<ul>
                       {questions.map((ques,i)=>{
                           return(
                              <Question key={i} question={ques.question} name={ques.author.name} photo={ques.author.avatar} />
                                   
                               
                           )
                       })}
                    </ul>
        } 
        </div>
    </div>
    )
}