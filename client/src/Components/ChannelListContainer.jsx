import React, { useState } from 'react'
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie"
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import schoolIcon from "../assets/school.png"
import logoutIcon from "../assets/logout.png"
const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={schoolIcon} alt="SchoolIcon" width="30" />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={logoutIcon} alt="LogoutIcon" width="30" />
            </div>
        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">Chatter App</p>
    </div>
)

const CustomChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === "team")
}
const CustomChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === "messaging")
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();
    const logout = () => {
        cookies.remove("userId");
        cookies.remove("userName");
        cookies.remove("fullName");
        cookies.remove("profileURL");
        cookies.remove("phoneNumber");
        cookies.remove("hashedPassword");
        cookies.remove("token");

        window.location.reload();
    }
    const filters = { members: { $in: [client.userID] } }
    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />

                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={CustomChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            setToggleContainer={setToggleContainer}
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}


                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            {...previewProps}
                            type="team"


                        />
                    )}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={CustomChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            setToggleContainer={setToggleContainer}

                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}

                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            {...previewProps}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    )
}


const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false)

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                />

            </div>
            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", background: "#005fff" }}>
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prev) => !prev)}>
                    <ChannelListContent
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                </div>
            </div>
        </>
    )


}
export default ChannelListContainer