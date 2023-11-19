const { Message } = require("discord.js-selfbot-v13");
const Logger = require("./Logger")

let isSending = false;

/**
 *
 * @type {Message| string[]}
 */
let sendQueue = []

/**
 * 
 * @param {Message} message 
 * @param {string} text 
 * @returns 
 */
function send(message,text){
    sendQueue.push([message,text])
    if(isSending)
        return

    ensureQueue()

    isSending = true
}

function ensureQueue(){
    let m = sendQueue.shift()
    if(m === undefined){
        Logger.info("Well, done!")
        isSending = false
        return
    }

    m[0].channel.sendTyping()

    setTimeout(()=>{
        Logger.info("Response number",sendQueue.length," :",m[1])
        m[0].channel.send({
            content: m[1]
        })

        ensureQueue()
    },2000)
}

module.exports = send