declare global{
    var takenNames: {}
}

if(!global.takenNames){
    global.takenNames = {}
}

var takenNames = global.takenNames

export default takenNames