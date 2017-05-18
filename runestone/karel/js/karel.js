/*
var $builtinmodule = function(name)
{
    var mod = {};

    var canvas = Sk.canvas;
    var world = new World();
    var worldDrawer = new WorldDrawer(world, canvas);
    worldDrawer.draw();
    var karel = new Karel(world);
    var karelDrawer = new KarelDrawer(karel, canvas);
    karelDrawer.draw();

    function turnLeft() {
        karel.turnLeft();
        worldDrawer.draw();
        karelDrawer.draw();
    }

    function move() {
       karel.move();
       worldDrawer.draw();
       karelDrawer.draw();
    }

    mod.turnLeft = new Sk.builtin.func(function() {
        return turnLeft();
    });

    mod.move = new Sk.builtin.func(function() {
        return move();
    });

    return mod;
}*/


var $builtinmodule = function(name)
{
    var mod = {};

    var canvas = Sk.canvas;

    var world = new World(5,5);
    world.setRobotStartAvenue(1);
    world.setRobotStartStreet(1);
    world.setRobotStartDirection(EAST);
    world.putBall(4, 3);
    world.putBall(3, 5);
    world.addEWWall(1, 1, 2);
    world.addNSWall(2, 2, 2);
    world.addEWWall(2, 3, 3);
    world.addNSWall(3, 1, 2);
    world.addNSWall(3, 4, 1);
    world.addNSWall(1, 5, 1);
    world.addEWWall(4, 1, 1);
    var robot = new Robot();
    robot.setWorld(world);

    var drawer = new RobotDrawer(canvas);

    drawer.drawFrame(robot);

    function turnLeft() {
    }

    function move() {
    }

    mod.turnLeft = new Sk.builtin.func(function() {
        return turnLeft();
    });

    mod.move = new Sk.builtin.func(function() {
        return move();
    });

    return mod;
}