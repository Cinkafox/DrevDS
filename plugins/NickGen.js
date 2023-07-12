const PluginManager = require('../lib/PluginManager')
const send = require('../lib/SendMessageManager')


let A = "Киря Кирилл Майн Киллер Боня Бро Про Даня Диджей Саня Витя Петр Федя Вася Китти Бебра".split(" ")
let B = "Про Бро Крафт Силач Куб Спид Бебра".split(" ")
let C = "228 2004 2005 2006 2007 2008 2009 69 15 1992 2020 2022".split(" ")
const rnd = (Arr) => {
    return Arr[Math.floor(Math.random() * Arr.length)]
} 

PluginManager.CreatePlugin("ник",(args,m)=>{
    send(m,(rnd(A) + rnd(B) + rnd(C)))
})