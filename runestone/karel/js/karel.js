var $builtinmodule = function(name)
{
    var mod = {};

    var drawer = Sk.Karel.drawer;

    var config = Sk.Karel.config;

    var robot = new Robot();
    robot.setWorld(config.getWorld());

    drawer.drawFrame(robot);

    function turnLeft() {
		robot.turnLeft();
		drawer.addFrame(robot.clone());
    }

	function turnRight() {
		robot.turnRight();
		drawer.addFrame(robot.clone());
    }

    function move() {
		robot.move();
		drawer.addFrame(robot.clone());
    }

	function frontIsClear() {
		return robot.frontIsClear();
    }

	function ballsPresent() {
		return robot.ballsPresent();
    }

	function pickBall() {
		robot.pickBall();
		drawer.addFrame(robot.clone());
    }

	function putBall() {
		robot.putBall();
		drawer.addFrame(robot.clone());
	}

    mod.turnLeft = new Sk.builtin.func(function() {
        return turnLeft();
    });

	mod.turnRight = new Sk.builtin.func(function() {
        return turnRight();
    });

    mod.move = new Sk.builtin.func(function() {
        return move();
    });

	mod.frontIsClear = new Sk.builtin.func(function() {
        return frontIsClear();
    });

	mod.ballsPresent = new Sk.builtin.func(function() {
        return ballsPresent();
    });

	mod.pickBall = new Sk.builtin.func(function() {
        return pickBall();
    });

	mod.putBall = new Sk.builtin.func(function() {
        return putBall();
    });

    return mod;
}