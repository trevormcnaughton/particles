var self = window.self;

(function(self) {

	var points = [], numPoints = 20, i, canvas, context, width, height, bounce = -1, radius = [];
    
    canvas = document.getElementById("canvas");
    width = self.innerWidth;
    height = self.innerHeight;
    context = canvas.getContext("2d");
    degrees = 1*Math.PI/180;
    
    context.canvas.width = width;
    context.canvas.height = height;
    context.translate( radius[i] / 2,  radius[i] / 2);

    self.addEventListener('resize', function() {
	    width = self.innerWidth;
	    height = self.innerHeight;
	    context.canvas.width = width;
	    context.canvas.height = height;
    });

    for(i = 0; i < numPoints; i += 1) {
      points.push({
      	x:Math.random() * width,
        y:Math.random() * height,
        vx:Math.random() * 2 - .5,
        vy:Math.random() * 2 - .5
      });
      radius.push( Math.random() * 10 + 5 );
    }
    
    function update() {
        var i, point;

        for(i = 0; i < numPoints; i += 1) {
            point = points[i];
            point.x += point.vx;
            point.y += point.vy;
            if(point.x > width) {
                point.x = width;
                point.vx *= bounce;
            }
            else if(point.x < 0) {
                point.x = 0;
                point.vx *= bounce;
            }
            if(point.y > height) {
                point.y = height;
                point.vy *= bounce;
            }
            else if(point.y < 0) {
                point.y = 0;
                point.vy *= bounce;
            }
        }
    }
    
    function draw() {
        context.clearRect(0, 0, width, height);
        var i, point;
        for(i = 0; i < numPoints; i += 1) {
            point = points[i];
            context.beginPath();
            context.arc(point.x, point.y, radius[i], 0, Math.PI * 2, false);
            context.fillStyle="#FFFFFF";
            context.fill();
            context.closePath();

            context.beginPath();
            context.rect(point.y, point.x, radius[i], radius[i]);
            context.fillStyle="#FFFFFF";
            context.fill();
            context.closePath();
        }
    }
    
    setInterval(function() {
        update();
        draw();
    }, 13);

})(self);