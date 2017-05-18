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
		var self = this;
        this.intervalHandle = setInterval(function(){draw.call(self);}, this.sleep);
    }

    function stop(){
        this.isRunning = false;
    }

    function addFrame(robot){
        this.frames.unshift(robot);
    }

    function draw(){
        if(this.frames.length===0){
            if(!this.isRunning && this.intervalHandle){
                clearInterval(this.intervalHandle);
            }
            return;
        }
        var robot = this.frames.pop();
        drawFrame.call(this, robot);
    }

    function drawFrame(robot){
		this.context.clearRect(0 ,0 ,this.width ,this.height);
		computeScale.call(this, robot);
        drawGrid.call(this, robot);
        drawWalls.call(this, robot);
        drawRobot.call(this, robot);
        drawBalls.call(this, robot);
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
        var y = (this.scale_y*street)+this.translate_y;
        y = this.height - y;
        return {x: x, y: y};
    }

    function drawWalls(robot){
        var world = robot.getWorld();
        var ctx = this.context;

        ctx.strokeStyle = "black";
        ctx.lineWidth = this.wall_width;
        //west wall
        var pt1 = worldToScreen.call(this, 1,1);
        var pt2 = worldToScreen.call(this, 1, world.getStreets());
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt2.y-this.cell_height/2);
        ctx.lineTo(pt1.x-this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.stroke();
        //south wall
        pt1 = worldToScreen.call(this, 1,1);
        pt2 = worldToScreen.call(this, world.getAvenues(), 1);
        ctx.beginPath();
        ctx.moveTo(pt1.x-this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.lineTo(pt2.x+this.cell_width/2, pt1.y+this.cell_height/2);
        ctx.stroke();
        for(var s=1;s<=world.getStreets();s++){
            for(var a=1;a<=world.getAvenues();a++){
                if(world.checkNSWall(a,s)){
                    pt1 = worldToScreen.call(this, a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x+this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y+this.cell_height/2);
                    ctx.stroke();
                }
                if(world.checkEWWall(a,s)){
                    pt1 = worldToScreen.call(this, a, s);
                    ctx.beginPath();
                    ctx.moveTo(pt1.x-this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.lineTo(pt1.x+this.cell_width/2, pt1.y-this.cell_height/2);
                    ctx.stroke();
                }
            }
        }
    }

    function drawGrid(robot){
        var world = robot.getWorld();
        var ctx = this.context;

		ctx.strokeStyle = "gray";
        ctx.fillStyle = "gray";
        ctx.lineWidth = 1;
        ctx.font = "15px Arial";
        for(var s=1;s<=world.getStreets();s++){
            var pt1 = worldToScreen.call(this, 1, s);
            var pt2 = worldToScreen.call(this, world.getAvenues(), s);
            ctx.beginPath();
            ctx.moveTo(pt1.x-this.cell_width/2, pt1.y);
            ctx.lineTo(pt2.x+this.cell_width/2, pt2.y);
            ctx.stroke();
            var str = s.toString();
			ctx.fillText(str, pt1.x - this.cell_width/2 - ctx.measureText(str).width - this.wall_width*2, pt1.y + getTextHeight(ctx.font).descent);
        }
        for(var a=1;a<=world.getAvenues();a++){
            var pt1 = worldToScreen.call(this, a, 1);
            var pt2 = worldToScreen.call(this, a, world.getStreets());
            ctx.beginPath();
            ctx.moveTo(pt1.x, pt1.y + this.cell_height/2);
            ctx.lineTo(pt2.x, pt2.y - this.cell_height/2);
            ctx.stroke();
            var str = a.toString();
            ctx.fillText(str, pt1.x - ctx.measureText(str).width/2, pt1.y + this.cell_height/2 + getTextHeight(ctx.font).ascent + this.wall_width*2);
        }
    }

    function drawRobot(robot){
        var ctx = this.context;
        var w = this.cell_width / 2;
        var h = this.cell_height / 2;
        var face = h / 3;
        ctx.fillStyle = "blue";
        var pt = worldToScreen.call(this, robot.getAvenue(), robot.getStreet());
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
        var world = robot.getWorld();
        var ctx = this.context;

        var ball_width = this.cell_width / 2;
        var ball_height = this.cell_height / 2;
        var x_offset = ball_width / 2;
        var y_offset = ball_height / 2;

        for(var a=1; a<=world.getAvenues();a++){
            for(var s=1; s<=world.getStreets();s++){
                if(world.checkBall(a, s) || world.checkHole(a, s)){
                    var pt = worldToScreen.call(this, a, s);
                    var fillStyle = "";
                    var fontStyle = "";
                    if(world.checkBall(a, s)){
                        fillStyle = "green";
                        fontStyle = "white";
                    } else {
                        fillStyle = "yellow";
                        fontStyle = "black";
                    }
                    var fontSize = 15;
                    ctx.fillStyle = fillStyle;
                    ctx.beginPath();
                    drawEllipseByCenter(ctx, pt.x, pt.y, ball_width, ball_height);
                    ctx.fill();
                    var nb = Math.abs(world.getBalls(a, s)).toString();
                    ctx.fillStyle = fontStyle;
                    ctx.font = fontSize+"px Arial";
                    while(Math.pow(ctx.measureText(nb).width,2)+Math.pow(getTextHeight(ctx.font).height,2) > ball_width * ball_height){
                        fontSize-=1;
                        ctx.font = fontSize+"px Arial";
                    }
                    ctx.fillText(nb, pt.x - ctx.measureText(nb).width/2, pt.y + getTextHeight(ctx.font).descent);
                }
            }
        }
    }

	var getTextHeight = function(font) {
		var text = $('<span>Hg</span>').css({ fontFamily: font });
		var block = $('<div style="display: inline-block; width: 1px; height: 0px;"></div>');

		var div = $('<div></div>');
		div.append(text, block);

		var body = $('body');
		body.append(div);

		try {

			var result = {};

			block.css({ verticalAlign: 'baseline' });
			result.ascent = block.offset().top - text.offset().top;

			block.css({ verticalAlign: 'bottom' });
			result.height = block.offset().top - text.offset().top;

			result.descent = result.height - result.ascent;

		} finally {
			div.remove();
		}

		return result;
	};

	function drawEllipseByCenter(ctx, cx, cy, w, h) {
		drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
	}

	function drawEllipse(ctx, x, y, w, h) {
		var kappa = .5522848,
			ox = (w / 2) * kappa, // control point offset horizontal
			oy = (h / 2) * kappa, // control point offset vertical
			xe = x + w,           // x-end
			ye = y + h,           // y-end
			xm = x + w / 2,       // x-middle
			ym = y + h / 2;       // y-middle

		ctx.beginPath();
		ctx.moveTo(x, ym);
		ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
		ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
		ctx.fill();
	}

    RobotDrawer.prototype.start = start;
    RobotDrawer.prototype.stop = stop;
    RobotDrawer.prototype.addFrame = addFrame;
    RobotDrawer.prototype.drawFrame = drawFrame;

    return RobotDrawer;
})();