import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import parser from "body-parser"
import authRoutes from "./Routes/auth.js"
import twilio from "twilio"
import path from "path"

const __dirname = path.resolve();

dotenv.config();
const app = express();

const accountSid = process.env.ACCOUNT_SID
const messagingServiceSid = process.env.MESSAGE_SID
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken)
app.use(cors())

app.use(express.json());
app.use(parser.urlencoded({ limit: "30mb", extended: true }))



app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/", authRoutes);


app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});




app.post("/", (req, res) => {
    console.log("hii i am here");
    const { message, user: sender, type, members } = req.body;
    if (type === "message.new") {
        members
            .filter((member) => member.user.id !== sender.id)
            .forEach(({ user }) => {
                if (!user.online) {
                    client.validationRequests
                        .create({ friendlyName: 'My Home Phone Number', phoneNumber: user.phoneNumber })
                        .then(validation_request => console.log(validation_request.friendlyName));
                    client.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    }).then(() => {
                        console.log("Message Sent")
                    }).catch((error) => {
                        console.log(error)
                    })
                }

            })
        return res.status(200).send("Message Sent");
    }
    return res.status(200).send("Not a new message request")
})






const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, host, function () {
    console.log("Server started.......", port);
});


