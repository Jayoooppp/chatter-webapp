import React, { useState } from 'react'
import { StreamChat } from "stream-chat"
import { Chat } from "stream-chat-react"
import Cookies from "universal-cookie"


import { ChannelContainer, ChannelListContainer, Auth } from "./Components"
import "stream-chat-react/dist/css/index.css"
import "./App.css"
const cookies = new Cookies();
const authToken = cookies.get("token");

const apikey = "2yx9ux8aq87f"
const client = StreamChat.getInstance(apikey);

if (authToken) {
  client.connectUser({
    id: cookies.get("userId"),
    name: cookies.get("userName"),
    fullName: cookies.get("fullName"),
    image: cookies.get("profileURL"),
    phoneNumber: cookies.get("phoneNumber"),
    hashedPassword: cookies.get("hashedPassword"),
  }, authToken)
}
const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!authToken) {
    return <Auth />
  }
  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>

    </div >
  )
}

export default App