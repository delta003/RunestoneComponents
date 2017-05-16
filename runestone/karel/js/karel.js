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
}