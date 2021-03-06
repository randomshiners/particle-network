var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var context = canvas.getContext("2d");


  times = [];
  function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
    bounce();
    nolines();
    requestAnimationFrame(loop);
  }

  function Dot () {
    this.rad = Math.floor((Math.random() * 6) + 2);
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vel = {
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1
    };
    this.update = function() {
      this.x += this.vel.x;
      this.y += this.vel.y;

    if (this.x < this.rad || this.x > canvas.width - this.rad)
        this.vel.x = -this.vel.x;

    if (this.y < this.rad || this.y > canvas.height - this.rad)
        this.vel.y = -this.vel.y;
    };

    this.draw = function() {
      context.beginPath();
      context.strokeStyle = '#e670a0';
      context.fillStyle = '#000000';
      context.lineWidth = 2;
      context.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, this.rad, 0, 2*Math.PI, false);
      context.stroke();
      context.fill();
    }
  }

  var dots = [];
  for (var i = 0; i < canvas.width * canvas.height / (150*150); i++) {
    dots.push(new Dot(Math.random() * canvas.width, Math.random() * canvas.height));
  }

  var lastTime = Date.now();
  function update() {
    var difference = Date.now() - lastTime;
    for (var frame = 0; frame * 16.6667 < difference; frame++) {
      for (var i = 0; i < dots.length; i++) {
        dots[i].update();
      }
    }
    lastTime = Date.now();
  }


  function draw() {
    context.fillStyle = '#1a1a1a';
    context.fillRect(0,0,canvas.width, canvas.height);
    for (var i = 0; i < dots.length; i++) {
      var dot = dots[i];
      dot.draw();
      context.beginPath();
      for (var j = dots.length - 1; j > i; j--) {
        var dot2 = dots[j];
        var distance = Math.hypot(dot.x - dot2.x, dot.y - dot2.y);
          if (distance < 150) {
            context.strokeStyle = '#e670a0';
            context.lineWidth = (150-distance) / 100;
            context.moveTo((0.5 + dot.x) | 0, (0.5 + dot.y) | 0);
            context.lineTo((0.5 + dot2.x) | 0, (0.5 + dot2.y) | 0);
          }
      }
      context.stroke();
    }
  }

    function bounce() {
        for (var i = 0; i < dots.length; i++) {
          var dot = dots[i];
          for (var j = dots.length - 1; j > i; j--) {
            var dot2 = dots[j];
            var distance = Math.hypot(dot.x - dot2.x, dot.y - dot2.y);
              if (distance <= (dot.rad + dot2.rad)) {
                dot.vel.x = -dot.vel.x;
                dot.vel.y = -dot.vel.y;
                dot2.vel.x = -dot2.vel.x;
                dot2.vel.y = -dot2.vel.y;
              }
          }
        }
      }

    function nolines() {
        for (var i = 0; i < dots.length; i++) {
          var dot = dots[i];
          dot.draw();
          }
        }

  loop();
