import React from 'react'
import "./friendschat.css"
import UserDetailsBar from "./UserDetailsBar"
import { AuthContext } from "../logic/AuthContext";

function FriendsAndChat() {
  return (
    <div className='friends-chat-mobile'>
        <UserDetailsBar/>
    </div>
  )
}

export default FriendsAndChat
