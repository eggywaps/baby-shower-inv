// Ambient pixie dust — soft drifting sparkles, respects reduced motion
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
 
  var canvas = document.getElementById('dust-canvas');
  var ctx = canvas.getContext('2d');
  var w, h, particles;
  var colors = ['#F0C869', '#F6C9D8', '#CBBEEA', '#AEDFC5'];
 
  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();
 
  function makeParticles(){
    var count = Math.min(28, Math.floor(w/22));
    particles = [];
    for(var i=0;i<count;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        r: Math.random()*1.6 + 0.6,
        speed: Math.random()*0.25 + 0.08,
        drift: Math.random()*0.6 - 0.3,
        alpha: Math.random()*0.5 + 0.25,
        twinkle: Math.random()*Math.PI*2,
        color: colors[Math.floor(Math.random()*colors.length)]
      });
    }
  }
  makeParticles();
 
  function tick(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(function(p){
      p.y -= p.speed;
      p.x += p.drift * 0.15;
      p.twinkle += 0.03;
      if(p.y < -10){ p.y = h + 10; p.x = Math.random()*w; }
      if(p.x < -10) p.x = w + 10;
      if(p.x > w+10) p.x = -10;
 
      var a = p.alpha * (0.6 + 0.4*Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = a;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  tick();
})();