const fs = require('fs')

let readFile = () => {
    let obj = JSON.parse(fs.readFileSync('permission.json'))
    return obj;
}
let writeFile = (obj) => {
    fs.writeFileSync("permission.json",JSON.stringify(obj))
}

let addOwner = (name)=>{
    let obj = readFile()
    const index = obj.owner.indexOf(name);
    if (index > -1) return
    obj.owner.push(name)
    writeFile(obj)
}

let removeOwner = (name)=>{
    let obj = readFile()
    const index = obj.owner.indexOf(name);
    if (index > -1) { 
        obj.owner.splice(index, 1); 
    }
    writeFile(obj)
}


let addIgnore = (name)=>{
    let obj = readFile()
    const index = obj.ignore.indexOf(name)
    if (index > -1) return
    obj.ignore.push(name)
    writeFile(obj)
}

let removeIgnore = (name)=>{
    let obj = readFile()
    const index = obj.ignore.indexOf(name)
    if (index > -1) { 
        obj.ignore.splice(index, 1)
    }
    writeFile(obj)
}

let hasInIgnorance = (name)=>{
    let obj = readFile()
    const index = obj.ignore.indexOf(name)
    return index > -1
}

let hasInOwner = (name)=>{
    let obj = readFile()
    const index = obj.owner.indexOf(name)
    return index > -1
}

module.exports = {addIgnore,addOwner,removeIgnore,removeOwner,hasInIgnorance,hasInOwner}