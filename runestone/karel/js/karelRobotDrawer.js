var RobotDrawer = (function () {
    function RobotDrawer(canvas, sleep) {
        this.frames = [];
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.sleep = sleep || 500;
        this.intervalHandle = null;
        this.isRunning = false;
    }

    function start(){
        if(this.intervalHandle){
            clearInterval(this.intervalHandle);
        }
        this.frames = [];
        this.isRunning = true;
        this.intervalHandle = setInterval(draw, this.sleep);
    }

    function stop(){
        this.isRunning = false;
    }

    function addFrame(robot){
        this.frames.unshift(robot);
    }

    function draw(){
        if(this.frames.length===0){
            if(!isRunning && this.intervalHandle){
                clearInterval(this.intervalHandle);
            }
            return;
        }
        var robot = this.frames.pop();
        this.drawFrame(robot);
    }

    function drawFrame(robot){
        this.drawWalls(robot);
        this.drawGrid(robot);
        this.drawRobot(robot);
        this.drawBalls(robot);
    }

    function computeScale(robot){
        var world = robot.getWorld();
        this.translate_x = 0;
        this.translate_y = 0;
        this.scale_x = this.width / (world.getAvenues()+1);
        this.scale_y = this.height / (world.getStreets()+1);
        this.scale_x = Math.min(this.scale_x, this.scale_y);
        this.scale_y = Math.min(this.scale_x, this.scale_y);
        this.cell_width = this.scale_x;
        this.cell_height = this.scale_y;
        this.wall_width = 3;
    }

    function worldToScreen(avenue, street){
        var x = (this.scale_x*avenue)+this.translate_x;
        var y = (this.scale_y*avenue)+this.translate_y;
        y = height - y;
        return {x: x, y: y};
    }

    function drawWalls(robot){
        var world = robot.getWorld();
        var ctx = this.context;

        ctx.strokeStyle = "black";
        ctx.lineWidth = wall_width;
        //west wall
        var pt1 = worldToScreen(1,1);
        var pt2 = worldToScreen(1, world.getStreets());
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt2.y-this.cellHeight/2);
        ctx.lineTo(pt1.x-this.cell_width/2, pt1.y+this.cellHeight/2);
        ctx.stroke();
        //south wall
        pt1 = worldToScreen(1,1);
        pt2 = worldToScreen(world.getAvenues(), 1);
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt1.y+this.cellHeight/2);
        ctx.lineTo(pt2.x+this.cell_width/2, pt1.y+this.cellHeight/2);
        ctx.stroke();
        for(var s=1;s<=world.getStreets();s++){
            for(var a=1;s<=world.getAvenues();a++){
                if(world.checkNSWall(a,s)){
                    pt1 = worldToScreen(a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x+this.cell_width/2, pt1.y-this.cellHeight/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y+this.cellHeight/2);
                    ctx.stroke();
                }
                if(world.checkEWWall(a,s)){
                    pt1 = worldToScreen(a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x-this.cell_width/2, pt1.y-this.cellHeight/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y-this.cellHeight/2);
                    ctx.stroke();
                }
            }
        }
    }

    function drawGrid(robot){

    }

    function drawRobot(robot){
        var ctx = this.context;
        var w = this.cell_width / 2;
        var h = this.cell_height / 2;
        var face = h / 3;
        ctx.fillStyle = "blue";
        var pt = worldToScreen(robot.getAvenue(), robot.getStreet());
        pt.x = pt.x - h / 2;
        pt.y = pt.y - w / 2;
        ctx.fillRect(pt.x, pt.y, w, h);

        ctx.fillStyle = "red";
        switch(robot.getDirection()){
            case "E":
                ctx.fillRect(pt.x + w - face, pt.y, face, h);
                break;
            case "N":
                ctx.fillRect(pt.x, pt.y, w, face);
                break;
            case "S":
                ctx.fillRect(pt.x, pt.y + h - face, w, face);
                break;
            case "W":
                ctx.fillRect(pt.x, pt.y, face, h);
                break;

        }
    }

    function drawBalls(robot){

    }

    RobotDrawer.prototype.start = this.start;
    RobotDrawer.prototype.stop = this.stop;
    RobotDrawer.prototype.addFrame = this.addFrame;
    RobotDrawer.prototype.drawFrame = this.drawFrame;

    return RobotDrawer;
})();