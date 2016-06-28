var roleHealer = {
    
    run: function(creep) {
        var targets = creep.room.find(FIND_MY_CREEPS)
        if(creep.heal(targets[0]) == ERR_NOT_IN_RANGE){
            creep.moveTo(targets[0])
            console.log(creep.name + ': Healing ' + targets[0]);
        }
        else {
    		creep.moveTo(Game.spawns.Spawn1);
    	}
    }
}

module.exports = roleHealer;