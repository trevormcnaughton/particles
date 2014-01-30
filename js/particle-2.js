(function() {

  // Grab the canvas and context before we can draw anything.
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  if (!ctx) {
    // No context for drawing, sorry.
    return;
  }
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = '#FFF';

  // Physics particles
  var gravity = 0.5; // Occurs in the y-direction, negative y goes up.
  var physics = new Physics(gravity);
  var system = new ParticleSystem();
  var particles = system.particles;
  // var mouse = system.makeParticle();

  // canvas.onclick = function(e) {
  //   mouse.makeFixed();  
  // };
  

  var b = physics.makeParticle( 1.0, Math.random() * canvas.width , Math.random() * canvas.height , 0 );
  var c = physics.makeParticle( 1.0, Math.random() * canvas.width , Math.random() * canvas.height , 0 );

  // Particle variables
  var mass = 0.5;
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var particle;
  var radius =  [];
  var px = [];
  var py = [];
  var prtcl = [];
  var bounce = -0.981;
  var count = 15;

  //physics.makeAttraction( mouse, b, 10000, 10 );
  //physics.makeAttraction( mouse, c, 10000, 10 );
  
  for(i = 0; i < count; i += 1) {

    px.push( Math.random() * width );
    py.push( Math.random() * height );
    radius.push( Math.random() * 10 + 5 );

  }
  var render = function() {

    // Clear the previous contents of the context.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < count; ++i) {
      particle = physics.makeParticle(mass, 1, 1, 0 );
      handleBoundaryCollisions( particle );

      ctx.beginPath();
      ctx.arc( px[i], py[i] , radius[i], 0, Math.PI * 2);
      ctx.fill();
    }
    // handleBoundaryCollisions(b);
    // handleBoundaryCollisions(c);

    // ctx.beginPath();
    // ctx.arc( b.position.x, b.position.y, radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.arc( c.position.x, c.position.y, radius, 0, Math.PI * 2);
    // ctx.fill();
    // ctx.closePath();
  };

  function handleBoundaryCollisions ( p ) {
    // if ( p.position.x < 0 || p.position.x > canvas.width ) {
    //   p.position.set( p.velocity.y *= -1, p.velocity.x );
    // } 
    // if ( p.position.y < 0 || p.position.y > canvas.height ) {
    //   p.position.set( p.velocity.y , 0.9*p.velocity.x, 0 ); 
    // }

    if(p.position.x > width - radius) {
        p.position.x = width - radius;
        p.velocity.x *= bounce;
    }
    else if(p.position.x < 0 + radius) {
        p.position.x = 0 + radius;
        p.velocity.x *= bounce;
    }
    if(p.position.y > height - radius) {
        p.position.y = height - radius;
        p.velocity.y *= bounce;
    }
    else if(p.position.y < 0 - radius ) {
        p.position.y = 0 + radius ;
        p.velocity.y *= bounce;
    }
  }

  // Bind the render function to when physics updates.
  physics.onUpdate(render);

  // Render a posterframe.
  render();

  // Bind canvas click to toggle.
  physics.play();
  
  // store our physics object on the canvas so we can access it later
  //canvas.physics = physics;

})();