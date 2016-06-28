// Basic Guard
var roleArcher = {
    run: function (creep) {
    	var targets = creep.room.find(Game.HOSTILE_CREEPS);
    	if(targets.length > 0) {
    		creep.moveTo(targets[0]);
    		creep.rangedAttack(targets[0]);
    		console.log(creep.name + ': Shooting at ' + targets[0]);
    	}
    	else {
    		creep.moveTo(Game.spawns.Spawn1);
    	}
    }
}
module.exports = roleArcher