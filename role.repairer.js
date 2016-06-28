var roleRepairer = {
    
    run: function(creep) {
        if(creep.memory.healing && creep.carry.energy == 0) {
            creep.memory.healing = false;
	    }
	    if(!creep.memory.healing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.healing = true;
	    }
        
        if(creep.memory.healing) {
	        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL)
                    && structure.hits < 10000
                    && structure.pos.x != 0
                    && structure.pos.x != 49
                    && structure.pos.y != 0
                    && structure.pos.y != 49
                    }
                   });
                   
            var roads = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_ROAD)
                && structure.hits < structure.hitsMax
            }
            });
            
            var ramparts = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_RAMPART)
                    && structure.hits < 15000
                    && structure.pos.x != 0
                    && structure.pos.x != 49
                    && structure.pos.y != 0
                    && structure.pos.y != 49
                    }
                });
                
            var container = creep.room.find(FIND_STRUCTURES, {
               filter: (structure) => {
                   return (structure.structureType == STRUCTURE_CONTAINER)
                   && structure.hits < structure.hitsMax
               }
            });
                   
                if(ramparts.length) {
                    if(creep.repair(ramparts[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(ramparts[0]);
                    }
                }
                if(targets.length && !ramparts.length){
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
                if(container.length && !targets.length && !ramparts.length){
                    if(creep.repair(container[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0]);
                    }
                }
                if(roads.length && !container.length && !targets.length && !ramparts.length){
                    if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roads[0]);
                    }
                    else {
                        creep.moveTo(16, 22)
                    }
                }
            }
	    else{
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
	    }
    }
}

module.exports = roleRepairer;