const { createCanvas, loadImage } = require('canvas')

const bg = "./assets/thn.jpg"

module.exports = async (img, args) => {
    //const data = args.join(" ").split(",")
    let cover = await loadImage(bg)
    const canvas = createCanvas(cover.width * 2, cover.height * 2)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(cover, 0, 0, cover.width * 2, cover.height * 2)

    const avatar = await loadImage(img.attachment || img)
    ctx.drawImage(avatar, 26, 26, 160, 160)

    ctx.fillStyle = "#fff";
    ctx.fillRect(200, 100, 300, 30);

    ctx.font = 'normal 15px Arial'
    ctx.fillStyle = '#5a0'
    ctx.textAlign = 'Left'
    ctx.fillText(args[0] + " 42 года(300 метров от вас)", 202, 122)

    const buffer = canvas.toBuffer('image/png')
    return buffer
}