/*
//Class World
function World() {
    this.size = { rows: 9, cols: 9 };
    this.boardWidth = 0;
    this.boardHeight = 0;
}
World.prototype.getSize = function () {
    return this.size;
};
World.prototype.getCellSize = function () {
    return {w:this.boardWidth / this.cols,h:this.boardHeight / this.rows};
};
World.prototype.getCellCenter = function (row, col) {
    var cellWidth=this.boardWidth / this.size.cols;
    var cellHeight = this.boardHeight / this.size.rows;
    return { x:(col*cellWidth) + (cellWidth/2) , y: (row* cellHeight) + (cellHeight/2) };
};
*/

var World = (function () {
    function World(avenues, streets) {
        this.numAvenues = avenues;
        this.numStreets = streets;
        this.corners = [];
        this.robotStartAvenue = 0;
        this.robotStartStreet = 0;
        this.robotStartDirection = "N";
        this.robotStartBalls = 0;

        for(var av=0; av<avenues; av++){
            var avenue = [];
            for(var st=0; st<streets; st++){
                avenue.push(new Corner(av+1, st+1));
            }
            this.corners.push(avenue);
        }

        this.addEWWall(1, streets, avenues);
        this.addNSWall(avenues, 1, streets);
    }

    World prototype.clone = function(
        var w = new World(this.numAvenues, this.numStreets);
        w.corners = [];
        w.robotStartAvenue = this.robotStartAvenue;
        w.robotStartStreet = this.robotStartStreet;
        w.robotStartDirection = this.robotStartDirection;
        w.robotStartDirection = this.robotStartDirection;
        w.robotStartBalls = this.robotStartBalls;

        for(var av=0; av<avenues; av++){
            var avenue = [];
            for(var st=0; st<streets; st++){
                avenue.push(this.getCorner(av+1, st+1).clone());
            }
            w.corners.push(avenue);
        }

        return w;
    );

    World.prototype.getAvenues = function () {
        return this.numAvenues;
    };

    World.prototype.getStreets = function () {
        return this.numStreets;
    };

    World.prototype.getCorner = function (avenue, street) {
        return this.corners[avenue-1][street-1];
    };

    World.prototype.addEWWall = function (startAvenue, northOfStreet, nBlocks) {
        for(var i=0; i<nBlocks; i++){
            this.getCorner(startAvenue+i, northOfStreet).setEastWall(true);
        }
    };

    World.prototype.addNSWall = function (eastOfAvenue, startStreet, nBlocks) {
        for(var i=0; i<nBlocks; i++){
            this.getCorner(eastOfAvenue, startStreet+i).setNorthWall(true);
        }
    };

    World.prototype.checkNSWall = function (eastOfAvenue, atStreet) {
        return getCorner(eastOfAvenue, atStreet).hasNorthWall();
    };

    World.prototype.checkEWWall = function (atAvenue, northOfStreet) {
        return getCorner(atAvenue, northOfStreet).hasEastWall();
    };

    World.prototype.getRobotStartAvenue = function () {
        return this.robotStartAvenue;
    };

    World.prototype.setRobotStartAvenue = function (avenue) {
        this.robotStartAvenue = avenue;
    };

    World.prototype.getRobotStartStreet = function () {
        return this.robotStartStreet;
    };

    World.prototype.setRobotStartStreet = function (street) {
        this.robotStartStreet = street;
    };

    World.prototype.getRobotStartDirection = function () {
        return this.robotStartDirection;
    };

    World.prototype.setRobotStartDirection = function (dir) {
        this.robotStartDirection = dir;
    };

    World.prototype.getRobotStartBalls = function () {
        return this.robotStartBalls;
    };

    World.prototype.setRobotStartBalls = function (b) {
        this.robotStartBalls = b;
    };

    World.prototype.isInBounds = function (a, s) {
        return (1<=a) && (a<=this.getAvenues()) && (1<=s) && (s<=this.getStreets());
    };

    World.prototype.checkBall = function (a, s) {
        return this.getCorner(a,s).getBalls() > 0;
    };

    World.prototype.checkHole = function (a, s) {
        return this.getCorner(a,s).getBalls() < 0;
    };

    World.prototype.pickBall = function (a, s) {
        var c = this.getCorner(a,s);
        if(c.getBalls()>0){
            c.setBalls(c.getBalls()-1);
            return true;
        }
        throw "No ball at corner";
    };

    World.prototype.putBall = function (a, s) {
        var c = this.getCorner(a,s);
        c.setBalls(c.getBalls()+1);
    };

    World.prototype.putBalls = function (a, s, n) {
        for(var i=0; i<n; i++){
            this.putBall(a, s);
        }
    };

    World.prototype.putHole = function (a, s) {
        var c = this.getCorner(a,s);
        c.setBalls(c.getBalls()-1);
    };

    World.prototype.putHoles = function (a, s, n) {
        for(var i=0; i<n; i++){
            this.putHole(a, s);
        }
    };

    World.prototype.getBalls = function (a, s) {
        return this.getCorner(a,s).getBalls();
    };

    World.prototype.getHoles = function (a, s) {
        return this.getCorner(a,s).getHoles();
    };

    return World;
});

