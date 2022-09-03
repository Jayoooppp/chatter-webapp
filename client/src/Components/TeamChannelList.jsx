import React from "react"

import { AddChannel } from "../assets"

const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if (error) {
        return type === "team" ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    Connection Error, please wait a moment and try again

                </p>

            </div>

        ) : null;
    }

    if (loading) {
        return type === "team" ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    {type === "teams" ? "channels" : "Message"} Loading...

                </p>

            </div>

        ) : null;
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === "team" ? "channels" : "Direct Messages"}
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    type={type === "team" ? "team" : "messaging"}

                />
            </div>
            {children}

        </div>
    )
}
export default TeamChannelList