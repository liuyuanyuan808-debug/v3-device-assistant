const A = 'assets/steps/';
const P = 'assets/posters/';

const steps = [
  {
    title: '选择正确的法兰尺寸', subtitle: '测量乳头直径，适配最佳法兰尺寸', poster: P + 'step-01.png',
    sections: [
      { icon: '!', title: '请勿跳过乳头测量', image: A + 'step-01-flange-guide-cropped.png', body: '合适的法兰可最大限度地提高吸奶量，防止乳头损伤，并确保高效吸奶。' },
      { icon: '?', title: '乳头尺码卡', image: A + 'step-01-flange-size.png', body: '使用乳头测量卡确认乳头直径，并根据对应范围选择合适的法兰尺寸。合适的尺寸有助于减少摩擦和拉扯不适，也能提升吸奶效率。' }
    ]
  },
  {
    title: '清洁部件', subtitle: '建议使用温和清洁剂和清水清洁', poster: P + 'step-02.png',
    sections: [
      { icon: '?', title: '拆卸部件', intro: '请按以下步骤依次拆卸吸奶器各组件。', slides: [
        [A + 'step-02-disassemble-1.png', '将导管与奶碗分离。'],
        [A + 'step-02-disassemble-2.png', '将法兰从奶碗上拆下。'],
        [A + 'step-02-disassemble-3.png', '将鸭嘴阀与法兰分离。']
      ]},
      { icon: '!', title: '建议清洁方法', intro: '使用温和清洁剂和清水清洁。', slides: [
        [A + 'step-02-clean-part.png', '需清洁部件：奶碗、法兰、鸭嘴阀、硅胶塞（如适用）。'],
        [A + 'step-02-clean-method.png', '建议清洁方法：使用温和清洁剂和清水清洁。'],
        [A + 'step-02-sterilize.png', '消毒：蒸汽消毒 10 分钟。如使用锅具煮水消毒，请将部件煮沸 3-5 分钟，每周消毒 1-2 次。']
      ]}
    ]
  },
  {
    title: '组装', subtitle: '组装前，请确保所有部件均已完全干燥', poster: P + 'step-03.png',
    sections: [
      { icon: '?', title: '组装部件', slides: [
        [A + 'step-03-assemble-1.png', '将鸭嘴阀安装至法兰。'],
        [A + 'step-03-assemble-2.png', '将法兰与奶碗组装在一起，确保边缘处牢固扣合。'],
        [A + 'step-03-assemble-3.png', '将导管连接至奶碗。']
      ]},
      { icon: '!', title: '将各部件连接至主机', slides: [
        [A + 'step-03-host-1.png', '打开主机正面底部的导管接口盖。'],
        [A + 'step-03-host-2.png', '将导管连接器插入主机接口，确保安装正确。'],
        [A + 'step-03-host-3.png', '组装完成。']
      ]},
      { icon: '!', title: '连接电源适配器', image: A + 'step-03-power.png', body: '请仅使用 Momcozy V3 专用适配器。使用其他适配器可能导致产品故障。' }
    ]
  },
  {
    title: '正确的佩戴方式和吸奶姿势', subtitle: '将吸奶器放入文胸，吸奶前检查密封性', poster: P + 'step-04.png',
    sections: [
      { icon: '!', title: '佩戴对位校准', image: A + 'step-04-position-cropped.png', body: '佩戴吸奶器时需完成双维度对准：\n侧向贴合校准：使法兰平整贴合乳房表面，禁止法兰上端翘起、整体倾斜。\n中心对位校准：调整位置使乳头处于吸奶器法兰的中心轴线上，避免乳头偏移、贴靠法兰侧壁。' },
      { icon: '?', title: '稳固放入文胸', image: A + 'step-04-wear-cropped.png', body: '将吸奶器放入哺乳文胸中，并调整至与乳房贴合。必要时可收紧文胸或肩带，使吸奶器保持稳定。确认位置合适后，再开始吸奶。' }
    ]
  },
  {
    title: '如何选择吸力档位', subtitle: '开始吸奶后，分别调节每一侧的吸力强度', poster: P + 'step-05.png',
    sections: [
      { icon: '?', title: '如何选择吸力档位', image: A + 'step-05-suction-cropped.png', body: '开始吸奶后：\n1. 选择吸奶侧：左 / 右 / 左 + 右（双侧）。\n2. 旋转旋钮，以调节吸力档位。\n3. 从最低吸力档位开始，逐渐提高吸力，直到出现轻微不适，然后将吸力调低一档，在舒适度和吸奶效率之间达到良好平衡。', warning: '左右两侧乳房对吸力的耐受程度可能不同。请分别调节每一侧的吸力强度，以使两侧均能获得舒适的吸奶体验。' }
    ]
  }
];

const app = document.querySelector('#app');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
const initialStep = Number(new URLSearchParams(location.hash.slice(1)).get('step') || 1) - 1;
let current = Math.max(0, Math.min(steps.length - 1, initialStep));

function imageMarkup(src) {
  return src ? '<button class="media zoom" data-src="' + src + '" aria-label="查看大图"><img src="' + src + '" alt=""></button>' : '';
}

function carouselMarkup(slides, sectionIndex) {
  return '<div class="carousel" data-carousel="' + sectionIndex + '">' +
    '<div class="carousel-frame"><div class="carousel-track">' +
    slides.map(function(slide, i) {
      return '<div class="slide"><img class="zoom" data-src="' + slide[0] + '" src="' + slide[0] + '" alt="步骤图片 ' + (i + 1) + '"></div>';
    }).join('') + '</div></div>' +
    '<div class="dots">' + slides.map(function(_, i) {
      return '<button class="dot ' + (i === 0 ? 'active' : '') + '" data-slide="' + i + '" aria-label="第 ' + (i + 1) + ' 张"></button>';
    }).join('') + '</div><p class="caption">' + slides[0][1] + '</p></div>';
}

function sectionMarkup(section, index) {
  return '<section class="section" data-section="' + index + '">' +
    '<button class="section-toggle" aria-expanded="false"><span class="section-icon">' + section.icon + '</span><span>' + section.title + '</span><span class="chevron">⌄</span></button>' +
    '<div class="section-body">' +
    (section.intro ? '<p class="intro">' + section.intro + '</p>' : '') +
    (section.slides ? carouselMarkup(section.slides, index) : imageMarkup(section.image)) +
    (section.body ? '<p class="body-copy">' + section.body + '</p>' : '') +
    (section.warning ? '<div class="warning">' + section.warning + '</div>' : '') +
    '</div></section>';
}

function render() {
  const step = steps[current];
  app.innerHTML = '<header class="topbar"><button class="close-btn" aria-label="返回第一步">×</button><div class="topbar-title">V3 设备助手</div><span></span></header>' +
    '<div class="step-head"><div class="step-kicker">第 ' + (current + 1) + ' 步</div><h1 class="step-title">' + step.title + '</h1><p class="step-subtitle">' + step.subtitle + '</p>' +
    '<nav class="progress" aria-label="步骤进度">' + steps.map(function(_, i) {
      return '<button class="' + (i <= current ? 'done' : '') + '" data-step="' + i + '" aria-label="前往第 ' + (i + 1) + ' 步"></button>';
    }).join('') + '</nav></div>' +
    '<div class="scroll"><div class="poster"><img src="' + step.poster + '" alt="' + step.title + '视频封面"></div>' +
    '<div class="content-card">' + step.sections.map(sectionMarkup).join('') + '</div>' +
    '<footer class="footer">' + (current ? '<button class="nav-btn back">上一步</button>' : '') + '<button class="nav-btn next">' + (current === steps.length - 1 ? '完成' : '下一步') + '</button></footer></div>';
  bind();
  location.hash = 'step=' + (current + 1);
}

function bind() {
  app.querySelector('.close-btn').onclick = function() { go(0); };
  app.querySelectorAll('[data-step]').forEach(function(button) { button.onclick = function() { go(Number(button.dataset.step)); }; });
  const back = app.querySelector('.back');
  if (back) back.onclick = function() { go(current - 1); };
  app.querySelector('.next').onclick = function() { current === steps.length - 1 ? go(0) : go(current + 1); };
  app.querySelectorAll('.section-toggle').forEach(function(button) {
    button.onclick = function() {
      const section = button.closest('.section');
      section.classList.toggle('open');
      button.setAttribute('aria-expanded', String(section.classList.contains('open')));
    };
  });
  app.querySelectorAll('.carousel').forEach(function(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const dots = Array.from(carousel.querySelectorAll('.dot'));
    const captions = steps[current].sections[Number(carousel.dataset.carousel)].slides;
    function update(index) {
      dots.forEach(function(dot, i) { dot.classList.toggle('active', i === index); });
      carousel.querySelector('.caption').textContent = captions[index][1];
    }
    track.onscroll = function() { update(Math.round(track.scrollLeft / track.clientWidth)); };
    dots.forEach(function(dot, i) { dot.onclick = function() { track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' }); }; });
  });
  app.querySelectorAll('.zoom').forEach(function(el) {
    el.onclick = function() { lightboxImage.src = el.dataset.src; lightbox.showModal(); };
  });
}

function go(index) {
  current = Math.max(0, Math.min(steps.length - 1, index));
  render();
  app.querySelector('.scroll').scrollTop = 0;
}

document.querySelector('#lightboxClose').onclick = function() { lightbox.close(); };
lightbox.onclick = function(event) { if (event.target === lightbox) lightbox.close(); };
addEventListener('hashchange', function() {
  const next = Number(new URLSearchParams(location.hash.slice(1)).get('step') || 1) - 1;
  if (next !== current && next >= 0 && next < steps.length) { current = next; render(); }
});
render();
