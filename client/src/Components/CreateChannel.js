import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

import { UserList } from "./"
import { CloseCreateChannel } from '../assets'




const ChannelNameInput = ({ channelName = "", setChannelName, }) => {

    const handleChange = (event) => {
        event.preventDefault();
        setChannelName(event.target.value)

    }
    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input value={channelName} onChange={(e) => { setChannelName(e.target.value) }} placeholder="channel-name (NO SPACE)" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {

    const createChannel = async (event) => {
        event.preventDefault();
        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            })
            await newChannel.watch();
            setChannelName("")
            setIsCreating(false)
            setSelectedUsers([])
            setActiveChannel(newChannel)
        } catch (error) {
            console.log(error);

        }

    }
    const { client, setActiveChannel } = useChatContext();

    const [selectedUsers, setSelectedUsers] = useState([client.userID || ""])
    const [channelName, setChannelName] = useState("");
    return (
        <div className='create-channel__container'>
            <div className="create-channel__header">
                <p>{createType === "team" ? "Create a new channel" : "Send a direct message"}</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            {createType === "team" && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='create-channel__button-wrapper' onClick={createChannel}>
                <p>{createType === "team" ? "Create Channel" : "Create Message Group"}</p>

            </div>
        </div>
    )
}

export default CreateChannel