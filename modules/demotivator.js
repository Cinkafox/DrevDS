//Код взят у https://github.com/zispidd/discord_demotivator_bot и чуть изменен.за что сябки
const { createCanvas, loadImage } = require('canvas')
/**
 * 
 * @param {import("discord.js-selfbot-v13").MessageAttachment} img 
 * @param {[String]} title
 * @returns {Buffer}
 */

const demotivatorImage = async (img, title,subtitle) => {

    const avatar = await loadImage(img.attachment)
    const IWidth = 1280
    const IHeight = IWidth * avatar.height / avatar.width

    const Height = IHeight*1.25
    const Width = IWidth*1.25

    let textSize = Height / 8
    const coefUmen = 0.6
    
    const CanvasHeight = Height + textSize * 1.5

    const CanvasWidth = Width 
    const canvas = createCanvas(CanvasWidth, CanvasHeight)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, CanvasWidth, CanvasHeight);

    const LineWidth = Width / 500
    ctx.lineWidth = LineWidth
    ctx.strokeStyle = "#ffffff"

    const raz = 4 + LineWidth
    const AX = (Width - IWidth) / 2
    const AY = (Height - IHeight) / 2

    ctx.strokeRect(AX, AY, IWidth, IHeight)
    ctx.drawImage(avatar, AX + raz, AY + raz, IWidth - raz * 2, IHeight - raz * 2)

    ctx.font = 'normal ' + CanvasWidth / ctx.measureText(title).width * 53 + '% Times New Roman'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(title, Width / 2, IHeight * 1.25 + 5)

    textSize *= coefUmen
    ctx.font = 'normal ' + textSize + 'px Times New Roman'
    ctx.fillStyle = '#fff'
    ctx.textAlign = 'center'
    ctx.fillText(subtitle, Width / 2, IHeight * 1.25 + 2 + textSize / coefUmen)

    const buffer = canvas.toBuffer('image/png')
    return buffer
}

module.exports = demotivatorImage