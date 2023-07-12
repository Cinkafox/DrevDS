const Logger = require('../lib/Logger')
const PluginManager = require('../lib/PluginManager')
const send = require("../lib/SendMessageManager")

const data = {
    "who1":["Зеленый","Мудрый","Вкусный","Приятный","Злой","Добрый","Старый","Молодой","Гендерфлюидный","Жирный","Худой","Мелкий"],
            "who2":["Пацанчик","Эльф","Бутерброд","Пипяу","Симпл димпл","Кролик","Инопланетянин","Мадам","Вертосексуал","Боба","Биба","Магамет","Магазин","Депутат","Кабель","Кальмар","биба","Автор","Телевизор"],
            "randYes":["Агась!", "Неа!", "Точно нет!", "Наверн да", "Естественно!", "Ясень пень!", "хз лол!", "Лучше не!", "Ясное дело!", "Капец! тычо куку? нет конечн!", "Ты чооооо! естественно да!"]
}

function genWho(){
    return data.who1[Math.floor(Math.random() * data.who1.length)] + " " + data.who2[Math.floor(Math.random() * data.who2.length)]
}

PluginManager.CreatePlugin("выбери",(args,m) =>{
    let vib = args.join(" ").split(" или ")
    let ors = vib[Math.floor(Math.random() * vib.length)]
    send(m,ors)
})

PluginManager.CreatePlugin("инфа",(args,m) =>{
    send(m,"Где то " + Math.floor(Math.random()*100) + "%")
})

PluginManager.CreatePlugin("напиши",(args,m) =>{
    send(m,args.join(" "))
})

PluginManager.CreatePlugin("правда",(args,m) =>{
    let vib = data.randYes
    let ors = vib[Math.floor(Math.random() * vib.length)]
    send(m,ors)
})

PluginManager.CreatePlugin("кто",async (args,m,client) =>{
    let user
    let count = 0
    if (m.mentions.users) {
        user = m.mentions.users.last()
        count = m.mentions.users.size
    } else if (m.mentions.members) {
        user = m.mentions.members.last()
        count = m.mentions.members.size
    } 
    
    if(count <= 1){
        send(m,"Хз чел")
        return
    }

    send(m,"я думаю " + user.toString() + " у нас " + genWho())
})

PluginManager.CreatePlugin("кто я",(args,m) =>{
    send(m,"я думаю что ты " + genWho())
})
