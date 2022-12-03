const { createCanvas, loadImage } = require('canvas')
/**
 * 
 * @param {import("discord.js-selfbot-v13").MessageAttachment} img 
 * @param {[String]} title
 * @returns {Buffer}
 */

const demotivatorImage = async (img, args) => {
    const data = args.join(" ").split(",")
    const title = data[0] || ""
    const subtitle = data[1] || ""

    const avatar = await loadImage(img.attachment)
    const IWidth = 1280
    const IHeight = IWidth * avatar.height / avatar.width

    const Height = IHeight*1.25
    const Width = IWidth*1.25

    let textSize = Height / 8
    const coefUmen = 0.6
    
    const StrLength = title.length
    const CanvasHeight = Height + textSize * 1.5
    let CanvasWidthRaz = (((StrLength / 1.5 * textSize) > IWidth) ? (StrLength * textSize / 1.5 / 2) : 0)

    const CanvasWidth = Width + CanvasWidthRaz
    const canvas = createCanvas(CanvasWidth, CanvasHeight)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);

    const LineWidth = Width/500
    ctx.lineWidth = LineWidth
    ctx.strokeStyle = "#ffffff"

    CanvasWidthRaz /=2
    const raz = 4 + LineWidth
    const AX = (Width - IWidth) / 2 + CanvasWidthRaz
    const AY = (Height - IHeight) / 2

    ctx.strokeRect(AX, AY, IWidth, IHeight)
    ctx.drawImage(avatar, AX + raz, AY + raz, IWidth - raz*2, IHeight - raz*2)

    ctx.font = 'normal ' + textSize + 'px Times New Roman'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(title, Width / 2 + CanvasWidthRaz, IHeight*1.25+5)

    textSize *= coefUmen

    ctx.font = 'normal ' + textSize + 'px Times New Roman'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(subtitle, Width / 2 + CanvasWidthRaz, IHeight * 1.25 + 2 + textSize/coefUmen)

    const buffer = canvas.toBuffer('image/png')
    return buffer
}

module.exports = demotivatorImage