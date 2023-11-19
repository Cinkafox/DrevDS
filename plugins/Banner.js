const { createCanvas, loadImage } = require('canvas')
const Perspective = require("../lib/Perspective")
const bg = "./assets/banner.jpg"
const { Attach, RequireAttachment } = require('../lib/AttachWraper')
const PluginManager = require('../lib/PluginManager')

const bannerImg = async (img) => {
    const avatar = await loadImage(img)
    let cover = await loadImage(bg)
    const canvas = createCanvas(cover.width, cover.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(cover, 0, 0)

    var p = new Perspective(ctx, avatar)
    p.draw([
        [95, 70],
        [694, 140],
        [742, 452],
        [83, 438]
    ]);

    return canvas.toBuffer('image/png')
}

PluginManager.CreatePlugin("баннер",async (args,m)=>{
    await RequireAttachment(args, m, bannerImg)
})
