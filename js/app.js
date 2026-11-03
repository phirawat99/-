// Main Application Logic for Spooky Movie Reviews

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCategory = 'all';
  let searchQuery = '';
  let sortBy = 'spookiness';
  let activeMovie = horrorMovies[0]; // Default spotlight to first movie

  // DOM Elements
  const moviesGrid = document.getElementById('movies-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const categoryPills = document.querySelectorAll('.cat-pill');
  const spotlightContainer = document.getElementById('spotlight-container');
  const modalOverlay = document.getElementById('review-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const modalBody = document.getElementById('modal-dynamic-content');
  const btnSafeMode = document.getElementById('btn-safe-mode');
  const btnSound = document.getElementById('btn-sound');
  const btnRoulette = document.getElementById('btn-roulette');
  const braverySelect = document.getElementById('bravery-select');

  // Render Spotlight Hero
  function renderSpotlight(movie) {
    if (!movie) return;
    spotlightContainer.innerHTML = `
      <div class="spotlight-card">
        <div class="spotlight-media">
          <img src="${movie.backdrop}" alt="${movie.titleTh}">
          <div class="spotlight-gradient"></div>
        </div>
        <div class="spotlight-content">
          <div class="spotlight-badge">
            <i class="fa-solid fa-skull"></i> หนังผีแนะนำคืนนี้ • ${movie.categoryLabel}
          </div>
          <h2 class="spotlight-title">${movie.titleTh}</h2>
          <div class="spotlight-meta">
            <span><i class="fa-regular fa-calendar"></i> ${movie.year}</span>
            <span><i class="fa-regular fa-clock"></i> ${movie.duration}</span>
            <span><i class="fa-solid fa-clapperboard"></i> กำกับ: ${movie.director}</span>
          </div>
          <div class="spotlight-tagline">"${movie.tagline}"</div>
          <p class="spotlight-synopsis">${movie.synopsis}</p>
          
          <div class="spook-meters-grid">
            <div class="meter-item">
              <div class="meter-header">
                <span><i class="fa-solid fa-ghost"></i> ระดับความหลอน</span>
                <span class="val">${movie.ratings.spookiness} / 10</span>
              </div>
              <div class="meter-bar-bg">
                <div class="meter-bar-fill" style="width: ${movie.ratings.spookiness * 10}%;"></div>
              </div>
            </div>
            
            <div class="meter-item">
              <div class="meter-header">
                <span><i class="fa-solid fa-bolt"></i> Jump Scare (สะดุ้ง)</span>
                <span class="val">${movie.ratings.jumpScare} / 10</span>
              </div>
              <div class="meter-bar-bg">
                <div class="meter-bar-fill jumpscare" style="width: ${movie.ratings.jumpScare * 10}%;"></div>
              </div>
            </div>

            <div class="meter-item">
              <div class="meter-header">
                <span><i class="fa-solid fa-droplet"></i> ความแหวะ / เลือด</span>
                <span class="val">${movie.ratings.gore} / 10</span>
              </div>
              <div class="meter-bar-bg">
                <div class="meter-bar-fill gore" style="width: ${movie.ratings.gore * 10}%;"></div>
              </div>
            </div>

            <div class="meter-item">
              <div class="meter-header">
                <span><i class="fa-solid fa-brain"></i> ความเข้มข้นเนื้อเรื่อง</span>
                <span class="val">${movie.ratings.story} / 10</span>
              </div>
              <div class="meter-bar-bg">
                <div class="meter-bar-fill story" style="width: ${movie.ratings.story * 10}%;"></div>
              </div>
            </div>
          </div>

          <div class="spotlight-actions">
            <button class="btn-primary" onclick="openReviewModal('${movie.id}')">
              <i class="fa-solid fa-book-skull"></i> อ่านรีวิวฉบับเต็ม & คำเตือน
            </button>
            <button class="btn-watch-movie" onclick="openWatchMovie('${movie.id}')">
              <i class="fa-solid fa-circle-play"></i> กดเข้าดูหนัง / ตัวอย่าง
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Filter and Sort Movies
  function getFilteredMovies() {
    let list = [...horrorMovies];

    // Category filter
    if (currentCategory !== 'all') {
      list = list.filter(m => m.category === currentCategory);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m => 
        m.titleTh.toLowerCase().includes(q) ||
        m.titleEn.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.tagline.toLowerCase().includes(q) ||
        m.warnings.some(w => w.toLowerCase().includes(q))
      );
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'spookiness') return b.ratings.spookiness - a.ratings.spookiness;
      if (sortBy === 'jumpScare') return b.ratings.jumpScare - a.ratings.jumpScare;
      if (sortBy === 'overall') return b.ratings.overall - a.ratings.overall;
      if (sortBy === 'newest') return b.year - a.year;
      return 0;
    });

    return list;
  }

  // Render Grid Cards
  function renderMoviesGrid() {
    const movies = getFilteredMovies();
    if (movies.length === 0) {
      moviesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <i class="fa-solid fa-ghost" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 16px;"></i>
          <h3>ไม่พบวิญญาณ... เอ๊ย ไม่พบหนังผีที่คุณค้นหา</h3>
          <p style="color: var(--text-muted); margin-top: 8px;">ลองค้นหาด้วยคำอื่น หรือสลับหมวดหมู่ดูนะ</p>
        </div>
      `;
      return;
    }

    moviesGrid.innerHTML = movies.map(movie => `
      <div class="movie-card" onclick="handleMovieClick('${movie.id}', this)" onmouseenter="if(window.spookySound) window.spookySound.playHeartbeat()">
        <div class="card-poster">
          <img src="${movie.poster}" alt="${movie.titleTh}" loading="lazy">
          
          <!-- เลือดไหลจากบนลงล่างของโปสเตอร์หนัง -->
          <div class="blood-curtain">
            <div class="blood-topbar"></div>
            <div class="blood-stream"></div>
            <div class="blood-stream"></div>
            <div class="blood-stream"></div>
            <div class="blood-stream"></div>
            <div class="blood-stream"></div>
            <div class="blood-stream"></div>
          </div>

          <div class="poster-overlay"></div>
          
          <div class="card-watch-tag">
            <i class="fa-solid fa-circle-play"></i> กดเข้าดูหนัง
          </div>

          <div class="card-rating-badge">
            <i class="fa-solid fa-ghost"></i> ${movie.ratings.spookiness}
          </div>
          <div class="card-category-tag">${movie.categoryLabel.split('/')[0]}</div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${movie.titleTh}</h3>
          <div class="card-meta">
            ${movie.year} • ${movie.duration}
          </div>
          <div class="card-tagline">"${movie.tagline}"</div>
          
          <div class="card-spook-badges">
            <div class="spook-badge-item">
              <span>ความหลอน:</span>
              <b>${movie.ratings.spookiness}/10</b>
            </div>
            <div class="spook-badge-item">
              <span>สะดุ้ง:</span>
              <b>${movie.ratings.jumpScare}/10</b>
            </div>
          </div>

          <div class="card-footer-action">
            <span><i class="fa-solid fa-play"></i> รับชม & อ่านรีวิว</span>
            <i class="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Open Full Review Modal
  window.openReviewModal = function(movieId) {
    const movie = horrorMovies.find(m => m.id === movieId);
    if (!movie) return;

    if (window.spookySound) {
      window.spookySound.playGhostWhisper();
    }

    // Get stored local reviews if any
    const savedReviewsKey = `reviews_${movie.id}`;
    const localReviews = JSON.parse(localStorage.getItem(savedReviewsKey) || '[]');
    const allUserReviews = [...(movie.userReviews || []), ...localReviews];

    modalBody.innerHTML = `
      <div class="modal-header-hero">
        <img src="${movie.backdrop}" alt="${movie.titleTh}">
        <div class="modal-hero-gradient"></div>
      </div>
      <div class="modal-content-inner">
        <div class="modal-title-row" style="display: flex; gap: 20px; align-items: flex-end;">
          <img src="${movie.poster}" alt="${movie.titleTh}" style="width: 110px; aspect-ratio: 2/3; object-fit: cover; border-radius: 8px; border: 2px solid var(--border-color); box-shadow: 0 8px 24px rgba(0,0,0,0.8); flex-shrink: 0;">
          <div>
            <div class="spotlight-badge">
              <i class="fa-solid fa-film"></i> ${movie.categoryLabel}
            </div>
            <h2 class="modal-title">${movie.titleTh}</h2>
            <div class="spotlight-meta">
              <span><b>ชื่ออังกฤษ:</b> ${movie.titleEn}</span>
              <span><b>ปีฉาย:</b> ${movie.year}</span>
              <span><b>ความยาว:</b> ${movie.duration}</span>
              <span><b>ผู้กำกับ:</b> ${movie.director}</span>
            </div>
          </div>
        </div>

        <div class="spotlight-tagline" style="font-size: 1.1rem; margin-bottom: 16px;">
          "${movie.tagline}"
        </div>

        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 24px; line-height: 1.7;">
          ${movie.synopsis}
        </p>

        <!-- Cinema Room & Video Player (ห้องฉายหนังและตัวอย่าง) -->
        <div class="cinema-room-box" id="cinema-player-box">
          <div class="cinema-header">
            <h4 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-film" style="color: var(--blood-red);"></i> โรงฉายภาพยนตร์ & ตัวอย่างหนัง (Cinema Room)
            </h4>
            <span class="cinema-status">
              <i class="fa-solid fa-circle-dot" style="color: #ef4444; animation: blink 1s infinite;"></i> พร้อมฉายทันที
            </span>
          </div>

          <div class="video-container">
            <iframe src="${movie.trailerEmbed}" title="${movie.titleTh}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div class="stream-links-row">
            <span style="font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">
              <i class="fa-solid fa-tv"></i> แหล่งรับชมหนังเต็มเรื่องอย่างถูกลิขสิทธิ์:
            </span>
            <div class="stream-buttons">
              ${movie.watchPlatforms ? movie.watchPlatforms.map(p => `
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-stream-platform">
                  <i class="${p.icon}"></i> รับชมที่ ${p.name}
                </a>
              `).join('') : ''}
              <a href="${movie.trailerUrl}" target="_blank" rel="noopener noreferrer" class="btn-stream-platform youtube">
                <i class="fa-brands fa-youtube"></i> ดูบน YouTube
              </a>
            </div>
          </div>
        </div>

        <!-- Rating Breakdown -->
        <h4 style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-gauge-high" style="color: var(--blood-red);"></i> เกณฑ์คะแนนความสยองขวัญ (Spook Meter)
        </h4>
        <div class="spook-meters-grid">
          <div class="meter-item">
            <div class="meter-header">
              <span><i class="fa-solid fa-ghost"></i> ระดับความหลอน / บรรยากาศ</span>
              <span class="val">${movie.ratings.spookiness} / 10</span>
            </div>
            <div class="meter-bar-bg">
              <div class="meter-bar-fill" style="width: ${movie.ratings.spookiness * 10}%;"></div>
            </div>
          </div>
          
          <div class="meter-item">
            <div class="meter-header">
              <span><i class="fa-solid fa-bolt"></i> Jump Scare (จังหวะสะดุ้ง)</span>
              <span class="val">${movie.ratings.jumpScare} / 10</span>
            </div>
            <div class="meter-bar-bg">
              <div class="meter-bar-fill jumpscare" style="width: ${movie.ratings.jumpScare * 10}%;"></div>
            </div>
          </div>

          <div class="meter-item">
            <div class="meter-header">
              <span><i class="fa-solid fa-droplet"></i> ความแหวะ / ความรุนแรง (Gore)</span>
              <span class="val">${movie.ratings.gore} / 10</span>
            </div>
            <div class="meter-bar-bg">
              <div class="meter-bar-fill gore" style="width: ${movie.ratings.gore * 10}%;"></div>
            </div>
          </div>

          <div class="meter-item">
            <div class="meter-header">
              <span><i class="fa-solid fa-brain"></i> เนื้อเรื่อง & ชั้นเชิงภาพยนตร์</span>
              <span class="val">${movie.ratings.story} / 10</span>
            </div>
            <div class="meter-bar-bg">
              <div class="meter-bar-fill story" style="width: ${movie.ratings.story * 10}%;"></div>
            </div>
          </div>
        </div>

        <!-- Trigger Warnings -->
        <div class="warnings-box">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> ข้อควรระวังก่อนดู (Content & Trigger Warnings):</h4>
          <ul>
            ${movie.warnings.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>

        <!-- Verdict Highlight -->
        <div class="verdict-box">
          <h4><i class="fa-solid fa-skull-crossbones"></i> ไฮไลต์ & ความเห็นนักวิจารณ์:</h4>
          <p style="margin-bottom: 8px;"><b>จุดเด่น:</b> ${movie.highlight}</p>
          <p><b>บทสรุป:</b> ${movie.verdict}</p>
        </div>

        <!-- User Reviews Section -->
        <div class="user-reviews-section">
          <h4 style="margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
            <span><i class="fa-regular fa-comments"></i> รีวิวจากผู้กล้าคนดู (${allUserReviews.length})</span>
          </h4>

          <!-- Add Review Form -->
          <form class="add-review-form" onsubmit="handleUserSubmitReview(event, '${movie.id}')">
            <h5 style="margin-bottom: 10px;">ร่วมแชร์ประสบการณ์หลอนของคุณ</h5>
            <div class="form-row">
              <input type="text" id="user-name-input" class="form-input" style="flex: 1;" placeholder="ชื่อหรือฉายาของคุณ (เช่น ผีเสื้อราตรี)" required>
              <select id="user-score-input" class="form-input" style="width: 160px;">
                <option value="10">ความหลอน: 10/10 💀💀</option>
                <option value="9">ความหลอน: 9/10 👻</option>
                <option value="8">ความหลอน: 8/10 😱</option>
                <option value="7">ความหลอน: 7/10 😨</option>
                <option value="5">ความหลอน: 5/10 😐</option>
                <option value="3">ความหลอน: 3/10 🥱</option>
              </select>
            </div>
            <textarea id="user-comment-input" class="form-input form-textarea" placeholder="ความรู้สึกหลังดู... หลอนตรงไหน? สะดุ้งกี่รอบ? มีคำเตือนอะไรถึงเพื่อนๆ ไหม?" required></textarea>
            <div style="margin-top: 10px; text-align: right;">
              <button type="submit" class="btn-primary" style="padding: 8px 18px; font-size: 0.85rem; display: inline-flex;">
                <i class="fa-solid fa-paper-plane"></i> ส่งความคิดเห็น
              </button>
            </div>
          </form>

          <!-- List of Comments -->
          <div id="reviews-list-container">
            ${allUserReviews.map(r => `
              <div class="comment-card">
                <div class="comment-card-header">
                  <strong>${escapeHtml(r.author)}</strong>
                  <span><i class="fa-solid fa-ghost"></i> ${r.rating}/10 (${r.date})</span>
                </div>
                <p>${escapeHtml(r.comment)}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Open Watch Movie (เข้าดูหนังและเลื่อนไปที่เครื่องเล่น)
  window.openWatchMovie = function(movieId) {
    if (window.spookySound) {
      window.spookySound.playBloodDrip();
    }
    openReviewModal(movieId);
    setTimeout(() => {
      const player = document.getElementById('cinema-player-box');
      if (player) {
        player.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  // Handle movie card click with blood drip animation
  window.handleMovieClick = function(movieId, cardEl) {
    if (cardEl) {
      cardEl.classList.add('blood-flowing');
    }
    if (window.spookySound) {
      window.spookySound.playBloodDrip();
    }
    setTimeout(() => {
      openReviewModal(movieId);
      if (cardEl) cardEl.classList.remove('blood-flowing');
    }, 450);
  };

  // Close Modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    // Stop iframe trailer playing
    const iframe = modalBody.querySelector('iframe');
    if (iframe) {
      iframe.src = '';
    }
  }

  btnCloseModal.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Submit User Review Handler
  window.handleUserSubmitReview = function(e, movieId) {
    e.preventDefault();
    const nameInput = document.getElementById('user-name-input');
    const scoreInput = document.getElementById('user-score-input');
    const commentInput = document.getElementById('user-comment-input');

    const newRev = {
      author: nameInput.value.trim() || 'นิรนาม',
      rating: parseInt(scoreInput.value, 10),
      comment: commentInput.value.trim(),
      date: 'เมื่อสักครู่นี้'
    };

    const savedReviewsKey = `reviews_${movieId}`;
    const localReviews = JSON.parse(localStorage.getItem(savedReviewsKey) || '[]');
    localReviews.unshift(newRev);
    localStorage.setItem(savedReviewsKey, JSON.stringify(localReviews));

    // Re-render modal
    window.openReviewModal(movieId);
  };

  // Filter Categories
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.cat;
      renderMoviesGrid();
    });
  });

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMoviesGrid();
  });

  // Sort select
  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderMoviesGrid();
  });

  // Safe Mode (เปิดไฟห้อง)
  btnSafeMode.addEventListener('click', () => {
    const isSafe = document.body.classList.toggle('safe-mode');
    btnSafeMode.classList.toggle('active', isSafe);
    if (isSafe) {
      btnSafeMode.innerHTML = `<i class="fa-solid fa-sun" style="color: #f59e0b;"></i> <span>ห้องสว่างแล้ว (Safe Mode On)</span>`;
      if (window.spookySound && window.spookySound.isPlaying) {
        window.spookySound.stopAmbience();
        btnSound.classList.remove('active');
        btnSound.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span>เสียงบรรยากาศ (ปิดอยู่)</span>`;
      }
    } else {
      btnSafeMode.innerHTML = `<i class="fa-regular fa-lightbulb"></i> <span>เปิดไฟฉุกเฉิน (โหมดคนกลัวผี)</span>`;
    }
  });

  // Font Theme Selector
  const fontSelect = document.getElementById('font-select');
  if (fontSelect) {
    const savedFont = localStorage.getItem('haunted_font_theme') || 'font-theme-occult';
    fontSelect.value = savedFont;
    applyFontTheme(savedFont);

    fontSelect.addEventListener('change', (e) => {
      applyFontTheme(e.target.value);
    });
  }

  function applyFontTheme(theme) {
    document.body.classList.remove('font-theme-occult', 'font-theme-slasher', 'font-theme-mystery', 'font-theme-gothic');
    document.body.classList.add(theme);
    localStorage.setItem('haunted_font_theme', theme);
  }

  // Creepy Sound Ambience
  btnSound.addEventListener('click', () => {
    if (!window.spookySound) return;
    const isPlaying = window.spookySound.toggleAmbience();
    btnSound.classList.toggle('active', isPlaying);
    if (isPlaying) {
      btnSound.innerHTML = `<i class="fa-solid fa-volume-high" style="color: #ff4444;"></i> <span>บรรยากาศหลอน (เปิดอยู่)</span>`;
    } else {
      btnSound.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span>เสียงบรรยากาศหลอน</span>`;
    }
  });

  // Roulette button
  btnRoulette.addEventListener('click', () => {
    const level = braverySelect.value;
    const info = braveryLevels[level];
    if (!info) return;

    btnRoulette.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> กำลังเสี่ยงดวงวิญญาณ...`;
    btnRoulette.disabled = true;

    if (window.spookySound) {
      window.spookySound.playHeartbeat();
    }

    setTimeout(() => {
      btnRoulette.innerHTML = `<i class="fa-solid fa-dice-d20"></i> สุ่มหนังผีวัดใจ`;
      btnRoulette.disabled = false;
      openReviewModal(info.recommendId);
    }, 800);
  });

  // Utility to escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m];
    });
  }

  // Floating Ghost Click Interactions
  document.querySelectorAll('.floating-ghost').forEach(ghost => {
    ghost.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.spookySound) {
        window.spookySound.playGhostWhisper();
      }
      ghost.style.transform = 'scale(1.4) translateY(-30px)';
      ghost.style.filter = 'drop-shadow(0 0 30px #ff0000)';
      setTimeout(() => {
        ghost.style.transform = '';
        ghost.style.filter = '';
      }, 600);
    });
  });

  // Initial renders
  renderSpotlight(activeMovie);
  renderMoviesGrid();
});
