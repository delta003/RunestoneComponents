var Robot = (function () {
    function Robot() {
        this.location = {x: 1, y: 1};
        this.direction = "N";
        this.numBalls = 0;
        this.infiniteBalls = false;
        this.lastMessage = "";
    }

    Robot.prototype.clone = function(){
        var r = new Robot();
        r.location.x = this.location.x;
        r.location.y = this.location.y;
        r.direction = this.direction;
        r.numBalls = 0;
        r.infiniteBalls = this.infiniteBalls;
        r.lastMessage = this.lastMessage;
        r.world = this.world.clone();
        return r;
    }

    Robot.prototype.setWorld = function (w) {
        this.world = w;
        this.location.x = w.getRobotStartAvenue();
        this.location.y = w.getRobotStartStreet();
        this.direction = w.getRobotDirection();
    };

    Robot.prototype.getWorld = function () {
        return this.world;
    };

    Robot.prototype.setAvenue = function (avenue) {
        this.location.x = avenue;
    };

    Robot.prototype.setStreet = function (street) {
        this.location.y = street;
    };

    Robot.prototype.setDirection = function (dir) {
        this.direction = dir;
    };

    Robot.prototype.setBalls = function (balls) {
        this.numBalls = balls;
    };

    Robot.prototype.setInfiniteBalls = function (b) {
        this.inifiniteBalls = b;
    };

    Robot.prototype.getAvenue = function () {
        return this.location.x;
    };

    Robot.prototype.getStreet = function () {
        return this.location.y;
    };

    Robot.prototype.getDirection = function () {
        return this.direction;
    };

    Robot.prototype.getBalls = function () {
        return this.numBalls;
    };

    Robot.prototype.getAvenue = function () {
        return this.location.x;
    };

    Robot.prototype.turnLeft = function () {
        switch (this.getDirection()) {
            case "N": this.setDirection("W"); break;
            case "E": this.setDirection("N"); break;
            case "S": this.setDirection("E"); break;
            case "W": this.setDirection("S"); break;
        }
    };

    Robot.prototype.turnRight = function () {
        switch (this.getDirection()) {
            case "N": this.setDirection("E"); break;
            case "E": this.setDirection("S"); break;
            case "S": this.setDirection("W"); break;
            case "W": this.setDirection("N"); break;
        }
    };

    Robot.prototype.move = function () {
        switch (this.getDirection()) {
            case "N":
                if(!(this.world.isInBounds(this.getAvenue(), this.getStreet()+1))){
                    throw "Out of bounds"
                } else if(this.world.checkEWWall(this.getAvenue(), this.getStreet())) {
                    throw "Crashed";
                } else{
                    this.setStreet(this.getStreet()+1);
                }
                break;
            case "S":
                if(!(this.world.isInBounds(this.getAvenue(), this.getStreet()-1))){
                    throw "Out of bounds"
                } else if(this.world.checkEWWall(this.getAvenue(), this.getStreet()-1)) {
                    throw "Crashed";
                } else{
                    this.setStreet(this.getStreet()-1);
                }
                break;
            case "E":
                if(!(this.world.isInBounds(this.getAvenue()+1, this.getStreet()))){
                    throw "Out of bounds"
                } else if(this.world.checkNSWall(this.getAvenue(), this.getStreet())) {
                    throw "Crashed";
                } else{
                    this.setAvenue(this.getAvenue()+1);
                }
                break;
            case "W":
                if(!(this.world.isInBounds(this.getAvenue()-1, this.getStreet()))){
                    throw "Out of bounds"
                } else if(this.world.checkNSWall(this.getAvenue()-1, this.getStreet())) {
                    throw "Crashed";
                } else{
                    this.setAvenue(this.getAvenue()-1);
                }
                break;
        }
    };

    Robot.prototype.frontIsClear = function () {
        var isDirBlocked = false;
        switch (this.getDirection()) {
            case "N":
                isDirBlocked = this.world.checkNSWall(this.getAvenue(), this.getStreet());
                break;
            case "E":
                isDirBlocked = this.world.checkEWWall(this.getAvenue(), this.getStreet());
                break;
            case "S":
                isDirBlocked = this.getStreet()===1 ? true : this.world.checkNSWall(this.getAvenue(), this.getStreet()-1);
                break;
            case "W":
                isDirBlocked = this.getAvenue()===1 ? true : this.world.checkEWWall(this.getAvenue()-1, this.getStreet());
                break;
        }
        return !isDirBlocked;
    };

    Robot.prototype.ballsPresent = function () {
        return this.world.checkBall(this.getAvenue(), this.getStreet());
    };

    Robot.prototype.pickBall = function () {
        return this.world.pickBall(this.getAvenue(), this.getStreet());
        this.setBalls(this.getBalls()+1);
    };

    Robot.prototype.putBall = function () {
        if((this.getBalls()===0) && (!this.inifiniteBalls)){
            throw "No balls with Karel";
        }

        this.world.putBall(this.getAvenue(), this.getStreet());
        this.setBalls(this.getBalls()-1);
    };

    Robot.prototype.show = function (s) {
        this.lastMessage = s;
    };

    Robot.prototype.getLastMessage = function () {
        return this.lastMessage;
    };

    return Robot;
});