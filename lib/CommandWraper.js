function CommandWraper (args, commands) {
    const command = commands[args[0].toLowerCase()]
    
    let CustomFunctionArgument = [...arguments]
    CustomFunctionArgument.shift()
    CustomFunctionArgument.shift()

    if (!command) throw Error("Нет такой команды!")
    if (args[1] && command[args[1]]){
        args.shift()
        return CommandWraper(args, command, ...CustomFunctionArgument)
    }
    if (!command.default) return command(args,...CustomFunctionArgument)
    return command.default(args, ...CustomFunctionArgument)
}

module.exports = CommandWraper