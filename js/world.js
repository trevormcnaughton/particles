Physics(function(world){
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvas = document.getElementById('viewport');
  var ctx = canvas.getContext("2d");
  var bounds = Physics.aabb(0, 0, width, height);
  var numParticles = 50;
  var s = 10;
  // var devicePixelRatio  = window.devicePixelRatio || 1;
  // var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
  //                         ctx.mozBackingStorePixelRatio ||
  //                         ctx.msBackingStorePixelRatio ||
  //                         ctx.oBackingStorePixelRatio ||
  //                         ctx.backingStorePixelRatio || 1;
  // var ratio = devicePixelRatio / backingStoreRatio;

  // if (typeof auto === 'undefined') {
  //   auto = true;
  // }

  // // Do some retinizin' ... Kinda
  // if (auto && devicePixelRatio !== backingStoreRatio) {

  //   var oldWidth = width;
  //   var oldHeight = height;

  //   width = oldWidth * ratio;
  //   height = oldHeight * ratio;

  //   canvas.style.width = oldWidth + 'px';
  //   canvas.style.height = oldHeight + 'px';

  //   // now scale the context to counter
  //   // the fact that we've manually scaled
  //   // our canvas element


  //   }

  var renderer = Physics.renderer('canvas', {
      el: 'viewport', // id of the canvas element
      width: width,
      height: height,
      styles: {
        // set colors for the circle bodies
        'circle' : {
            strokeStyle: '#fff',
            lineWidth: 0,
            fillStyle: '#fff',
            angleIndicator: 0
        }
      }
  });

  for ( var i = 0; i < numParticles; ++i ) {
    world.add( Physics.body('circle', {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random(0,1) * 2 - 1) * .01,
      vy: (Math.random(0,1) * 2 - 1) * .01,
      mass: 0.015,
      radius: Math.floor(Math.random() * 20) + 5
    }));
  }

  world.add( renderer );
  // world.add( Physics.behavior('constant-acceleration') );
  world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds,
    restitution: 0.5
  }));

  //world.add( Physics.behavior('newtonian', {strength: 10}));

  /* to use */

  canvas.onclick = function(event) {
    world.add( Physics.body('circle', {
      x: event.clientX,
      y: event.clientY, //Math.random() * height,
      vx: (Math.random(0,1) * 2 - 1) * .1,
      vy: (Math.random(0,1) * 2 - 1) * .1,
      mass: 0.015,
      radius: Math.floor(Math.random() * 20) + 5
    }));
  };

  world.add( Physics.behavior('body-impulse-response'));
  world.add(Physics.behavior('body-collision-detection'));
  world.add(Physics.behavior('sweep-prune'));

  Physics.util.ticker.subscribe(function( time, dt ) {
    world.step( time );
  });

  Physics.util.ticker.start();

  world.subscribe( 'step', function() {
    world.render();
  });

});