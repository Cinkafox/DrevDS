const fs = require("fs");
const path = require("path");

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

class PluginManager {
    plugins = {}

    CreatePlugin(path, func) {
        console.log("added",path);
        this._CreatePlugin(this.plugins,path.split(" "),func)
    }

    _CreatePlugin(plugins,path,func){
        if (!plugins[path[0]]) plugins[path[0]]={}
        if(path[1])return this._CreatePlugin(plugins[path.shift()],path,func)
        plugins[path[0]] = {
            default: func
        }
    }

    Execute(args){
        return this._Execute(args,this.plugins,...arguments)
    }

    _Execute(args, commands) {
        const command = commands[args[0].toLowerCase()]

        let CustomFunctionArgument = [...arguments]
        CustomFunctionArgument.shift()
        CustomFunctionArgument.shift()

        if (!command) throw Error("Нет такой команды!")
        if (args[1] && command[args[1]]) {
            args.shift()
            return this._Execute(args, command, ...CustomFunctionArgument)
        }
        if (!command.default) return command(...CustomFunctionArgument)
        return command.default(...CustomFunctionArgument)
    }

    load(dir) {
        const normalizedPath = path.join(__dirname, dir);
        for (let file of fs.readdirSync(normalizedPath)) {
            try {
                let type = file.split(".")
                type = type[type.length - 1]
                if (type === "js") requireUncached(dir + "/" + file)
                //if (type === "json") this.loadJson(dir + "/" + file)
                console.log("Загрузка " + file)
            } catch (e) {
                console.log(e)
            }
        }
    }
}

module.exports = new PluginManager()