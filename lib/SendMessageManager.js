const { Message } = require("discord.js-selfbot-v13");

let isSending = false;

/**
 * 
 * @param {Message} message 
 * @param {string} text 
 * @returns 
 */
function send(message,text){
    if(isSending) return
    isSending = true
    message.channel.sendTyping()
    setTimeout(()=>{
        isSending = false
        message.channel.send({
            content: text
        })
    },500)
}

module.exports = send