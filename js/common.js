// 리안헤어 수원연무점 - 공통 스크립트

// 모바일 햄버거 메뉴
(function(){
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mobileNav');
  if(!btn || !nav) return;
  btn.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
  nav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    });
  });
})();

// 히어로 배경 영상: 화면에 보일 때만 재생 (모바일 데이터 절약)
(function(){
  var video = document.getElementById('heroVideo');
  if(!video) return;
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          video.play().catch(function(){});
        }else{
          video.pause();
        }
      });
    }, {threshold: 0.15});
    io.observe(video);
  }else{
    video.play().catch(function(){});
  }
})();

// ▼ designer_extras: 포트폴리오 크게 보기 (자동 삽입, CLAUDE.md 18절 예외)
(function(){
  var blocks = document.querySelectorAll('.pf');
  if(!blocks.length || typeof HTMLDialogElement === 'undefined') return;
  var m = document.createElement('dialog');
  m.className = 'pf-modal';
  m.innerHTML = '<div class="pf-modal-top"><span class="pf-modal-who"></span><button type="button" class="pf-close"></button></div>' +
    '<div class="pf-modal-stage"><img alt=""></div>' +
    '<div class="pf-modal-foot"><button type="button" class="pf-prev">‹</button><span class="pf-modal-cap"></span><button type="button" class="pf-next">›</button></div>';
  document.body.appendChild(m);
  var img = m.querySelector('img'), cap = m.querySelector('.pf-modal-cap'), who = m.querySelector('.pf-modal-who');
  var close = m.querySelector('.pf-close'), prev = m.querySelector('.pf-prev'), next = m.querySelector('.pf-next');
  var items = [], at = 0, back = null;
  function show(i){
    at = (i + items.length) % items.length;
    var a = items[at], t = a.querySelector('img');
    img.src = a.getAttribute('href'); img.alt = t ? t.alt : '';
    cap.textContent = (a.querySelector('.pf-menu') || {}).textContent || '';
    who.textContent = (m.getAttribute('data-who') || '') + ' · ' + (at + 1) + ' / ' + items.length;
  }
  blocks.forEach(function(b){
    var list = Array.prototype.slice.call(b.querySelectorAll('.pf-item'));
    function open(i, from){
      items = list; back = from;
      m.setAttribute('data-who', b.getAttribute('data-who') || '');
      m.setAttribute('aria-label', b.getAttribute('data-dialog') || '');
      close.textContent = '✕'; close.setAttribute('aria-label', b.getAttribute('data-close') || '');
      prev.setAttribute('aria-label', b.getAttribute('data-prev') || '');
      next.setAttribute('aria-label', b.getAttribute('data-next') || '');
      prev.hidden = next.hidden = list.length < 2;
      show(i); m.showModal();
    }
    list.forEach(function(a, i){ a.addEventListener('click', function(e){ e.preventDefault(); open(i, a); }); });
    var all = b.querySelector('.pf-all');
    if(all) all.addEventListener('click', function(e){ e.preventDefault(); open(0, all); });
  });
  close.addEventListener('click', function(){ m.close(); });
  prev.addEventListener('click', function(){ show(at - 1); });
  next.addEventListener('click', function(){ show(at + 1); });
  m.addEventListener('click', function(e){ if(e.target === m) m.close(); });
  m.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') show(at - 1);
    if(e.key === 'ArrowRight') show(at + 1);
  });
  m.addEventListener('close', function(){ img.removeAttribute('src'); if(back) back.focus(); });
})();
// ▲ designer_extras
