(function() {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.fillStyle = '#333';

  var physics = new Physics();

  var radius = 50;
  var mass = 25;

  // var x1 = canvas.width * 0.25;
  // var x2 = canvas.width * 0.75;
  // var y = canvas.height / 2;

  // var a = physics.makeParticle(mass, x1, y);
  // var b = physics.makeParticle(mass, x2, y);

  // Create an attraction between the particles.

  // The strength of the bond between two particles.
  var strength = 5000;

  // The proximity at which the attraction will be enabled.
  var minDistance = canvas.width;

  // Make the attraction and add it to physics
  var attraction = physics.makeAttraction(a, b, strength, minDistance);

  var render = function() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x1 = a.position.x;
    var y1 = a.position.y;

    var x2 = b.position.x;
    var y2 = b.position.y;

    // Draw a
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, Math.PI * 2, false);
    ctx.fill();

    // Draw b
    ctx.beginPath();
    ctx.arc(x2, y2, radius, 0, Math.PI * 2, false);
    ctx.fill();

  };

  // Bind the render function to when physics updates.
  physics.onUpdate(render);

  // Render a posterframe.
  render();

  physics.play();
  
  // store our physics object on the canvas so we can access it later
  canvas.physics = physics;

})();