import { connect } from "getstream"
import bcrypt from "bcrypt"
import { StreamChat } from 'stream-chat';
import crypto from "crypto"
import dotenv from "dotenv"
import { Console } from "console";
dotenv.config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;


export const signInUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const serverClient = connect(api_key, api_secret, api_id)

        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: userName })
        if (!users.length) {
            return res.status(403).json({ message: "User not found" })
        }
        const success = await bcrypt.compare(password, users[0].hashedPassword)

        const token = serverClient.createUserToken(users[0].id);

        if (success) {
            return res.status(200).json({ token, fullName: users[0].fullName, userName, userId: users[0].id })
        } else {
            return res.status(500).json({ message: "Incorrect Password" })
        }

    } catch (error) {
        return res.status(403).json({ message: error })
    }
}

export const signUpUser = async (req, res) => {
    try {
        const { fullName, userName, password, phoneNumber, profileURL } = req.body;
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ phoneNumber: phoneNumber })


        if (users.length) {
            return res.status(403).json({ message: "This number is already registered" })
        } else {

            const { users } = await client.queryUsers({ name: userName })
            if (users.length) {
                return res.status(403).json({ message: "Username already exist" })
            }
        }




        const userId = crypto.randomBytes(20).toString("hex");
        const serverClient = connect(api_key, api_secret, api_id)
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createUserToken(userId);
        return res.status(203).json({ token, fullName, userName, userId, hashedPassword, phoneNumber });
    } catch (error) {
        return res.status(403).json({ message: error })

    }

}