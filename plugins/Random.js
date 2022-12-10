const PluginManager = require('../lib/PluginManager')

PluginManager.CreatePlugin("рандом", (args, m) => {
    let from = Number(args[1]) || 0
    let to = Number(args[2]) || 100
    m.channel.send(Math.floor(from + Math.random() * (to - from)) + "")
})

PluginManager.CreatePlugin("рандом пикча", async (args, m) => {

    m.channel.messages.fetch({ limit: 100, before: lastMessageId }).then(msgs => {
        let lasturl = ""
        for (let i = 0; i < msgs.size; i++) {
            c = msgs.random()
            console.log(i, c.id);
            const attachment = c.attachments.first()
            if (!attachment || attachment.contentType.split("/")[0] !== 'image') continue
            lasturl = attachment.attachment
            if (Math.random() > 0.9) {
                lastMessageId = c.id
                console.log(i, lasturl)
                break;
            }
        }

        const image = lasturl
        m.channel.send({
            content: "Нате," + m.author.toString(),
            files: [image]
        })

    });


})