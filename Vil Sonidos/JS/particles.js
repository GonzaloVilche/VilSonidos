// lightweight particles for subtle background
(function(){
  const canvas = document.getElementById('particlesCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  function resize(){ 
    w = canvas.width = innerWidth; 
    h = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(min,max){ return Math.random()*(max-min)+min; }

  class P {
    constructor(){
      this.reset();
    }
    reset(){
      this.x = rand(0,w);
      this.y = rand(0,h);
      this.vx = rand(-0.25,0.25);
      this.vy = rand(-0.2,0.6);
      this.r = rand(0.6,1.8);
      this.alpha = rand(0.06,0.18);
    }
    update(){
      this.x += this.vx;
      this.y += this.vy;
      if(this.y > h + 20 || this.x < -50 || this.x > w + 50) this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0,255,150,'+this.alpha+')';
      ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fill();
    }
  }

  for(let i=0;i<120;i++) particles.push(new P());

  function loop(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();
