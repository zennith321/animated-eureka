var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleGuard = require('role.guard');
var roleArcher = require('role.archer');
var roleHealer = require('role.healer')

var numHarvesters = 3
var numUpgraders = 3
var numBuilders = 2
var numRepairers = 4
var numGuards = 3
var numHealers = 0

module.exports.loop = function () {
   
    
    var tower = Game.getObjectById('bc5596547ae881a926f216ad');
    if(tower) {
        
        var walls = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL)
                    && structure.hits < 10000
                    && structure.pos.x != 0
                    && structure.pos.x != 49
                    && structure.pos.y != 0
                    && structure.pos.y != 49
                    }
                   });
                   
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure && !walls);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');
    console.log('Harvesters: ' + harvesters.length + ' Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Repairers: ' + repairers.length + ' Guards: ' + guards.length + ' Healers: ' + healers.length);

    if(harvesters.length < numHarvesters) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    else{
            if(upgraders.length < numUpgraders) {
                var newName = Game.spawns.Spawn1.createCreep([WORK,CARRY,MOVE,MOVE], {role: 'upgrader'});
                console.log('Spawning new upgrader: ' + newName);
            }
            if(builders.length < numBuilders) {
                var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE], {role: 'builder'});
                console.log('Spawning new builder: ' + newName);
            }
            if(repairers.length < numRepairers) {
                var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE,MOVE], {role: 'repairer'});
                console.log('Spawning new repairer: ' + newName);
            }
            if(guards.length < numGuards) {
                var newName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,ATTACK], {role: 'guard'});
                console.log('Spawning new guard: ' + newName);
            }
            if(healers.length < numHealers) {
                var newName = Game.spawns.Spawn1.createCreep([TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,CARRY,HEAL], {role: 'healer'});
                console.log('Spawning new healer: ' + newName);
            }
        }
    
    
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'guard') {
	        roleGuard.run(creep);
        }
        if(creep.memory.role == 'archer') {
	        roleArcher.run(creep);
        }
        if(creep.memory.role == 'healer') {
	        roleArcher.run(creep);
        }
    }
}