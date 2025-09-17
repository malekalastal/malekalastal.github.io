// smooth scroll فقط للروابط داخل نفس الصفحة
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// خلفية دوائر متحركة
const canvas = document.getElementById('bgCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
  window.addEventListener('resize',resize);
  resize();

  const circles = Array.from({length:40},()=>({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*4+2,
    dx:(Math.random()-0.5)*0.6,
    dy:(Math.random()-0.5)*0.6
  }));

  function animate(){
    ctx.clearRect(0,0,w,h);
    circles.forEach(c=>{
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
      ctx.fillStyle='rgba(11,132,255,0.3)';
      ctx.fill();
      c.x+=c.dx; c.y+=c.dy;
      if(c.x<0||c.x>w) c.dx*=-1;
      if(c.y<0||c.y>h) c.dy*=-1;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// أنيميشن ظهور الكروت عند التمرير
const cards = document.querySelectorAll('.card');
function showCards(){
  const triggerBottom = window.innerHeight * 0.9;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if(cardTop < triggerBottom){
      card.classList.add('show');
    }
  });
}
window.addEventListener('scroll', showCards);
showCards();
