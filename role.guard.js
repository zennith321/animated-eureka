var roleGuard = {

run: function(creep) {
    	var targets = creep.room.find(FIND_HOSTILE_CREEPS);
    	if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
    		creep.moveTo(targets[0]);
    		console.log(creep.name + ': Attacking ' + targets[0]);
    	}
    	else {
    		creep.moveTo(Game.spawns.Spawn1);
    	}
    }
}

module.exports = roleGuard;