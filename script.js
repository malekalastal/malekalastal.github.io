// Smooth scroll للروابط الداخلية
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    e.preventDefault();
    const id = this.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Canvas خلفية متحركة
const canvas = document.getElementById('bgCanvas');
if(canvas){
  const ctx = canvas.getContext('2d');
  let w,h;
  function resize(){w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight;}
  window.addEventListener('resize',resize);
  resize();

  const circles = Array.from({length:50},() => ({
    x:Math.random()*w,
    y:Math.random()*h,
    r:Math.random()*4+2,
    dx:(Math.random()-0.5)*0.5,
    dy:(Math.random()-0.5)*0.5
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

// ظهور الكروت عند Scroll
const cards = document.querySelectorAll('.card');
function showCards(){
  const triggerBottom = window.innerHeight * 0.9;
  cards.forEach(card=>{
    const top = card.getBoundingClientRect().top;
    if(top < triggerBottom) card.classList.add('show');
  });
}
window.addEventListener('scroll', showCards);
showCards();

// Parallax خفيف للPortfolio
const portfolioGrid = document.querySelector('.portfolio-grid');
window.addEventListener('scroll', ()=>{
  if(portfolioGrid){
    const scroll = window.scrollY;
    portfolioGrid.style.transform = `translateY(${scroll*0.05}px)`;
  }
});

// GitHub Portfolio
fetch("https://api.github.com/users/malekalastal/repos?sort=updated&per_page=6")
  .then(res => res.json())
  .then(data => {
    let container = document.getElementById("github-projects");
    data.forEach(repo => {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <a href="${repo.html_url}" target="_blank">
          <div class="card-content">
            <h3>${repo.name}</h3>
            <p>${repo.description ? repo.description : "مشروع بدون وصف"}</p>
            <span class="lang">${repo.language || "غير محدد"}</span>
          </div>
        </a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("github-projects").innerHTML =
      "<p>تعذر تحميل المشاريع من GitHub حالياً ⚠️</p>";
  });
