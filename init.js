const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main()
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.error("Connection Error:", err);
    });

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakenewwp");
}

let allChats=[
    {

    from: "Rutuja",
    to: "Yashvardhan",
    msg: "Hey There!",
    created_at: new Date()

    },
    {

        from: "Riya",
        to: "Yash",
        msg: "Hi Dear!",
        created_at: new Date()
    
        },
        {

            from: "Rucha",
            to: "Yadu",
            msg: "Hello .",
            created_at: new Date()
        
            }
        
        ]


Chat.insertMany(allChats);

