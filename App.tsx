import React, { useEffect, useState } from 'react';
import {Home} from './pages/Home/Home'
import {CreateRoom} from './pages/CreateRoom/CreateRoom'
import {Room} from './pages/Room/Room'
import {Route,BrowserRouter,Switch} from 'react-router-dom'
import {createContext} from 'react'
import './styles/global.scss'
import {AuthContextProvder} from './contexts/AuthContext'
import {RoomUser} from './pages/roomUser/RoomUser'


type User={
  id:string,
  name:string,
  photo:string
}

type AuthContextType = {
  user:User | undefined;
  handleSignIn:() => Promise<void>


}

export const authContext = createContext({} as AuthContextType)
   function App() {

 

  return (
    <>
    <BrowserRouter>
          <AuthContextProvder>
            <Switch>
             <Route path='/' exact component={Home} />
            <Route path='/room/new'  exact component={CreateRoom}  />
            <Route path='/room/:id'  component={RoomUser} />
            <Route path='/admin/room/:id'  component={Room} />
            </Switch>
            </AuthContextProvder>
         </BrowserRouter>
     </>
  );
}

export default App;
