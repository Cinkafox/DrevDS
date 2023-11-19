const { createCanvas, loadImage } = require('canvas')
const Perspective = require("../lib/Perspective")
const bg = "./assets/spray.jpg"
const { Attach, RequireAttachment } = require('../lib/AttachWraper')
const PluginManager = require('../lib/PluginManager')
const Logger = require('../lib/Logger')

const spray = async (img, args) => {
    args.shift()
    const data = args.join(" ").split(",")
    let mess0 = data[0]
    if (mess0 === undefined) {
        return Logger.error("Срынбк(")
    }
    let mess1 = data[1] || ""

    let cover = await loadImage(bg)
    const canvas = createCanvas(cover.width, cover.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(cover, 0, 0)

    ctx.font = 'normal 73px Arial'
    ctx.fillStyle = '#036'
    ctx.textAlign = 'center'
    ctx.fillText("Спрей от", cover.width / 2, 360)
    if (img !== undefined) {
        const avatar = await loadImage(img)
        var p = new Perspective(ctx, avatar)
        p.draw([
            [134, 370],
            [450, 370],
            [450, 580],
            [134, 580]
        ])
        mess1 = mess0
    } else spText(ctx, mess0.split(" "), cover.width / 2, 420, 60)

    let size = 40

    ctx.font = 'normal ' + size + 'px Arial'
    ctx.fillStyle = '#fff'
    spText(ctx, mess1.split(" "), cover.width / 2, 660, size + 10)

    return canvas.toBuffer('image/png')
}

function spText(ctx, text, x, y = 660, s) {
    if (text.length === 0) return
    let txt = text.shift()

    b()
    function b() {
        if (ctx.measureText(txt).width > 220 || text.length === 0) return
        txt = txt + " " + text.shift()
        b()
    }
    ctx.fillText(txt, x, y)
    spText(ctx, text, x, y + s)
}

PluginManager.CreatePlugin("спрей от", async (args, m) => {
    await RequireAttachment(args, m, spray,false)
})
