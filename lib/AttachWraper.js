const {MessageAttachment} = require('discord.js-selfbot-v13');
const Logger = require('./Logger');
const send = require('./SendMessageManager');

async function Attach(args,message,func,attachment){
    try {
        await message.channel.sendTyping()
        Logger.info("Successfuly attach image")
        const image = await func(attachment, args, message)
        message.channel.send({
            content: "Нате," + message.author.toString(),
            files: [image]
        })
    } catch (e) {
        Logger.error(e);
        message.channel.send("Пукб срынбк я абасрался бы выполнении кода(((")
    }
}

async function RequireAttachment(args, message, func,force = true) {
    let attach = new MessageAttachment(message.attachments.first()?.attachment) || null
    if (!attach.attachment && force) {
        Logger.error("Command will not executed, where is picture?")
        send(message,"Чел, а картина?")
        return
    }
    await Attach(args, message, func, attach.attachment)
}

module.exports = {Attach,RequireAttachment}

