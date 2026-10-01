/**
 * Cozy Bear Scrapbook — Interactive Experience
 * Dedicated with love to Abhishek ("Bear")
 */

(function () {
  'use strict';

  // State Management
  const state = {
    currentChapter: 0,
    maxUnlockedChapter: 0,
    soundEnabled: true,
    collectedHearts: new Set(),
    totalHearts: 5,
    polaroidFlipped: false,
    polaroidTyped: false,
    secretOpened: false
  };

  /* ==========================================================================
     1. PROCEDURAL SOUND SYNTHESIZER (Web Audio API)
     No external sound files, 100% reliable, zero lag, short, soft & cute!
     ========================================================================== */
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Soft cute pop sound
  function playPopSound() {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      const now = audioCtx.currentTime;
      osc.type = 'sine';
      // Fast drop in frequency creates a cute tactile bubble pop
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.08);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Soft typewriter click
  function playTypewriterSound() {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      const now = audioCtx.currentTime;
      // Slight pitch variance per keystroke for natural acoustic feel
      const randomPitch = 1200 + (Math.random() * 400 - 200);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(randomPitch, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.0, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Sweet gentle chime for heart collect / unlocks
  function playChimeSound() {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      const pitches = [523.25, 659.25, 783.99, 1046.50]; // C E G C
      const now = audioCtx.currentTime;

      pitches.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        const noteTime = now + (idx * 0.06);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.14, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(noteTime);
        osc.stop(noteTime + 0.4);
      });
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Paper rustle sound for page turns
  function playPaperRustle() {
    if (!state.soundEnabled || !audioCtx) return;
    try {
      // White noise buffer for gentle paper rustle
      const bufferSize = audioCtx.sampleRate * 0.12;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      whiteNoise.start();
    } catch (e) {
      // Audio fallback silent
    }
  }

  /* ==========================================================================
     2. SPARKLE CURSOR TRAIL (Smooth, elegant stars on desktop)
     ========================================================================== */
  const canvas = document.getElementById('sparkle-canvas');
  let ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let isTouchDevice = false;

  function initSparkleCursor() {
    if (!canvas || !ctx) return;

    // Detect touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouchDevice = true;
      canvas.style.display = 'none';
      return;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let lastX = 0, lastY = 0;
    let distanceCounter = 0;

    window.addEventListener('mousemove', (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      distanceCounter += dist;
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn star every ~18 pixels of smooth movement
      if (distanceCounter > 18 && particles.length < 50) {
        distanceCounter = 0;
        particles.push({
          x: e.clientX + (Math.random() * 8 - 4),
          y: e.clientY + (Math.random() * 8 - 4),
          size: Math.random() * 3.5 + 2.5,
          alpha: 0.85,
          color: Math.random() > 0.4 ? '#e5a950' : '#e08272', // warm gold or soft blush
          vx: (Math.random() - 0.5) * 0.8,
          vy: Math.random() * 0.8 + 0.4,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.08
        });
      }
    });

    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
      let rot = Math.PI / 2 * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fill();
    }

    function animateSparkles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.022;
        p.rot += p.rotSpeed;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        drawStar(0, 0, 4, p.size, p.size * 0.45);
        ctx.restore();
      }

      requestAnimationFrame(animateSparkles);
    }
    requestAnimationFrame(animateSparkles);
  }

  /* ==========================================================================
     3. CHAPTER NAVIGATION & TRANSITIONS
     ========================================================================== */
  const chapterHeartButtons = document.querySelectorAll('.heart-chapter-btn');
  const allPages = document.querySelectorAll('.scrapbook-page');

  function goToChapter(chapterIndex) {
    if (chapterIndex < 0 || chapterIndex > 5) return;
    initAudio();
    playPaperRustle();

    state.currentChapter = chapterIndex;
    if (chapterIndex > state.maxUnlockedChapter) {
      state.maxUnlockedChapter = chapterIndex;
    }

    // Switch active page
    allPages.forEach((page) => {
      const pageIdx = parseInt(page.getAttribute('data-page-index'), 10);
      if (pageIdx === chapterIndex) {
        page.classList.remove('page-hidden');
        page.classList.add('page-active');
      } else {
        page.classList.remove('page-active');
        page.classList.add('page-hidden');
      }
    });

    // Update hearts tracker: ♡ ♡ ♡ ♡ ♡
    chapterHeartButtons.forEach((btn) => {
      const btnIdx = parseInt(btn.getAttribute('data-chapter'), 10);
      const icon = btn.querySelector('.heart-icon');

      btn.classList.remove('active', 'completed');
      if (btnIdx === chapterIndex) {
        btn.classList.add('active');
        icon.textContent = '♥';
      } else if (btnIdx < chapterIndex || btnIdx <= state.maxUnlockedChapter) {
        btn.classList.add('completed');
        icon.textContent = '♥';
      } else {
        icon.textContent = '♡';
      }
    });

    // Scroll to top of desk smoothly
    const deskContainer = document.querySelector('.desk-container');
    if (deskContainer) {
      window.scrollTo({
        top: deskContainer.offsetTop - 60,
        behavior: 'smooth'
      });
    }

    // Trigger Chapter 1 Polaroid typewriter if entered Ch. 1 and not yet typed
    if (chapterIndex === 1 && !state.polaroidTyped && state.polaroidFlipped) {
      triggerPolaroidTypewriter();
    }
  }

  /* ==========================================================================
     4. CHAPTER 1: POLAROID FLIP & TYPEWRITER ANIMATION
     ========================================================================== */
  const mainPolaroidCard = document.getElementById('main-polaroid-card');
  const polaroidMsgText = document.getElementById('polaroid-message-text');
  const polaroidFinishHeart = document.getElementById('polaroid-finish-heart');
  const page1Nav = document.getElementById('page-1-nav');

  const polaroidMessageString = "bear, i love you jastiiiiiii maooooo";

  function triggerPolaroidTypewriter() {
    if (state.polaroidTyped || !polaroidMsgText) return;
    state.polaroidTyped = true;
    polaroidMsgText.textContent = '';
    
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < polaroidMessageString.length) {
        polaroidMsgText.textContent += polaroidMessageString.charAt(charIndex);
        playTypewriterSound();
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Reveal tiny continuation indicator ♡
        if (polaroidFinishHeart) {
          polaroidFinishHeart.classList.add('visible');
          playPopSound();
        }
        // Enable next button navigation
        if (page1Nav) {
          page1Nav.style.opacity = '1';
          page1Nav.style.pointerEvents = 'auto';
        }
      }
    }, 75);
  }

  function handlePolaroidClick() {
    initAudio();
    playPopSound();

    if (!state.polaroidFlipped) {
      state.polaroidFlipped = true;
      mainPolaroidCard.classList.add('flipped');
      mainPolaroidCard.setAttribute('aria-pressed', 'true');
      
      // Delay typewriter slightly for flip animation to turn
      setTimeout(() => {
        triggerPolaroidTypewriter();
      }, 450);
    } else {
      // Allow flipping back and forth
      state.polaroidFlipped = false;
      mainPolaroidCard.classList.remove('flipped');
      mainPolaroidCard.setAttribute('aria-pressed', 'false');
    }
  }

  if (mainPolaroidCard) {
    mainPolaroidCard.addEventListener('click', handlePolaroidClick);
    mainPolaroidCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePolaroidClick();
      }
    });
  }

  /* ==========================================================================
     5. CHAPTER 2: MEMORIES COLLAGE & INTERACTIVE TRINKETS
     ========================================================================== */
  const photoLightbox = document.getElementById('photo-lightbox');
  const lightboxImgTarget = document.getElementById('lightbox-img-target');
  const lightboxCaptionTarget = document.getElementById('lightbox-caption-target');
  const lightboxClose = document.getElementById('lightbox-close');

  // Photo enlargement for scrapbook memory prints
  document.querySelectorAll('.collage-item').forEach((item) => {
    item.addEventListener('click', () => {
      initAudio();
      playPopSound();
      const photoDisplay = item.querySelector('.photo-display');
      const caption = item.querySelector('.collage-caption');

      if (photoLightbox && lightboxImgTarget && photoDisplay) {
        lightboxImgTarget.innerHTML = photoDisplay.innerHTML;
        
        // PHOTO 4: When clicked, gently enlarge and reveal "missing you always nan bear maaa"
        if (item.classList.contains('collage-item-bw')) {
          lightboxCaptionTarget.textContent = 'one of my little favorites — “missing you always nan bear maaa” ♡';
          showToast('“missing you always nan bear maaa” ♡');
        } else {
          lightboxCaptionTarget.textContent = caption ? caption.textContent : 'our memories ♡';
        }
        
        photoLightbox.classList.add('open');
        photoLightbox.setAttribute('aria-hidden', 'false');
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });

  // PHOTO 2: Small intimate scrapbook photo (NOT full-screen, shows "my maooo 🧸")
  const photo2Intimate = document.getElementById('photo-2-intimate');
  if (photo2Intimate) {
    photo2Intimate.addEventListener('click', () => {
      initAudio();
      playPopSound();
      photo2Intimate.style.animation = 'none';
      void photo2Intimate.offsetWidth;
      photo2Intimate.style.animation = 'stickerWiggle 0.4s ease';
      showToast('“my maooo 🧸”');
      const rect = photo2Intimate.getBoundingClientRect();
      spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
    photo2Intimate.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photo2Intimate.click();
      }
    });
  }

  // PHOTO 5: Fun couple photo (Chapter 3) — wiggles and reveals "nan cute, i love you jastiiiii!!!!"
  const photo5Item = document.getElementById('photo-5-item');
  if (photo5Item) {
    photo5Item.addEventListener('click', () => {
      initAudio();
      playPopSound();
      photo5Item.style.animation = 'none';
      void photo5Item.offsetWidth;
      photo5Item.style.animation = 'stickerWiggle 0.5s ease';
      showToast('“nan cute, i love you jastiiiii!!!!” 🧸♡');
      const rect = photo5Item.getBoundingClientRect();
      spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
    photo5Item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photo5Item.click();
      }
    });
  }

  // PHOTO 6: Outdoor couple photo (Chapter 4) — reveals "cute little chocopie ♡"
  const photo6Card = document.getElementById('photo-6-card');
  if (photo6Card) {
    photo6Card.addEventListener('click', () => {
      initAudio();
      playPopSound();
      photo6Card.classList.toggle('photo-lifted');
      showToast('“cute little chocopie ♡”');
    });
    photo6Card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photo6Card.click();
      }
    });
  }

  // PHOTO 7: His solo photo (Chapter 5) — reveals "nan bearuuu", then "i love you bearrrr"
  const photo7Frame = document.getElementById('photo-7-frame');
  if (photo7Frame) {
    photo7Frame.addEventListener('click', () => {
      initAudio();
      playPopSound();
      photo7Frame.style.animation = 'none';
      void photo7Frame.offsetWidth;
      photo7Frame.style.animation = 'stickerWiggle 0.45s ease';
      
      // Step 1: "nan bearuuu"
      showToast('“nan bearuuu” 🧸');
      
      // Step 2: "i love you bearrrr"
      setTimeout(() => {
        showToast('“i love you bearrrr” ♡');
        const rect = photo7Frame.getBoundingClientRect();
        spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }, 1500);
    });
    photo7Frame.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photo7Frame.click();
      }
    });
  }

  if (lightboxClose && photoLightbox) {
    lightboxClose.addEventListener('click', () => {
      playPopSound();
      photoLightbox.classList.remove('open');
      photoLightbox.setAttribute('aria-hidden', 'true');
    });

    photoLightbox.addEventListener('click', (e) => {
      if (e.target === photoLightbox) {
        photoLightbox.classList.remove('open');
        photoLightbox.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Scrapbook Toast system
  const scrapbookToast = document.getElementById('scrapbook-toast');
  let toastTimeout = null;

  function showToast(message) {
    if (!scrapbookToast) return;
    clearTimeout(toastTimeout);
    scrapbookToast.textContent = message;
    scrapbookToast.classList.add('show');
    toastTimeout = setTimeout(() => {
      scrapbookToast.classList.remove('show');
    }, 3200);
  }

  // Trinket buttons that show sweet toast notes
  document.querySelectorAll('.trinket-interactive').forEach((btn) => {
    btn.addEventListener('click', () => {
      initAudio();
      playPopSound();
      const toastMsg = btn.getAttribute('data-toast');
      if (toastMsg) {
        showToast(toastMsg);
      }
    });
  });

  // Wiggle click sticker elements
  document.querySelectorAll('.wiggle-click').forEach((sticker) => {
    sticker.addEventListener('click', () => {
      initAudio();
      playPopSound();
      sticker.style.animation = 'none';
      void sticker.offsetWidth; // trigger reflow
      sticker.style.animation = 'stickerWiggle 0.4s ease';
      
      const toastMsg = sticker.getAttribute('data-toast');
      const label = sticker.querySelector('.sticker-label');
      if (toastMsg) {
        showToast(toastMsg);
      } else if (label) {
        showToast(`“${label.textContent}” 🧸♡`);
      } else {
        const title = sticker.getAttribute('title') || 'scrapbook memory';
        showToast(`“${title}” 🧸♡`);
      }
    });
  });

  // Chapter 2 Mini Letter Envelope Modal
  const ch2Envelope = document.getElementById('ch2-envelope-trigger');
  const envelopeModal = document.getElementById('envelope-letter-modal');
  const closeEnvelopeBtn = document.getElementById('close-envelope-btn');

  if (ch2Envelope && envelopeModal) {
    ch2Envelope.addEventListener('click', () => {
      initAudio();
      playPopSound();
      envelopeModal.classList.add('open');
      envelopeModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeEnvelopeBtn && envelopeModal) {
    closeEnvelopeBtn.addEventListener('click', () => {
      playPopSound();
      envelopeModal.classList.remove('open');
      envelopeModal.setAttribute('aria-hidden', 'true');
    });

    envelopeModal.addEventListener('click', (e) => {
      if (e.target === envelopeModal) {
        envelopeModal.classList.remove('open');
        envelopeModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /* ==========================================================================
     6. CHAPTER 3: HIDDEN HEART COLLECTION GAME (♡ 1 / 5)
     ========================================================================== */
  const collectedHeartsText = document.getElementById('collected-hearts-text');
  const heartsUnlockedBanner = document.getElementById('hearts-unlocked-banner');
  const chapter3StandardNav = document.getElementById('chapter-3-standard-nav');

  // The 5 actual collectible hearts on Chapter 3's scavenger board
  const VALID_COLLECTIBLE_HEART_IDS = new Set([
    'heart-photo',
    'heart-envelope',
    'heart-coffee',
    'heart-flower',
    'heart-bear'
  ]);

  function collectHeart(heartBtn) {
    const heartId = heartBtn.getAttribute('data-heart-id');
    // Ensure we ONLY count the 5 actual collectible hearts, never decorative/instruction hearts
    if (!heartId || !VALID_COLLECTIBLE_HEART_IDS.has(heartId)) return;
    if (state.collectedHearts.has(heartId)) return;

    initAudio();
    playPopSound();

    state.collectedHearts.add(heartId);
    heartBtn.classList.add('collected');

    // Update Counter strictly bounded between 0 and 5
    const count = Math.min(state.collectedHearts.size, state.totalHearts);
    if (collectedHeartsText) {
      collectedHeartsText.textContent = `${count} / ${state.totalHearts}`;
    }

    // Sparkle burst at click position
    const rect = heartBtn.getBoundingClientRect();
    spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    if (count < state.totalHearts) {
      showToast(`Found a heart! ♡ (${count}/${state.totalHearts})`);
    } else {
      // All 5 Found! Exact phrase from user prompt Section 9
      playChimeSound();
      showToast(`hehe… you found them all 🧸`);
      if (heartsUnlockedBanner) {
        heartsUnlockedBanner.style.display = 'block';
      }
      if (chapter3StandardNav) {
        chapter3StandardNav.style.display = 'none';
      }
    }
  }

  function spawnHeartBurst(x, y) {
    const symbols = ['♡', '♥', '✨', '⋆'];
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('span');
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = `${1.2 + Math.random() * 0.8}rem`;
      el.style.color = Math.random() > 0.5 ? '#c25f53' : '#d99c43';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.transition = 'all 0.7s cubic-bezier(0.1, 0.8, 0.3, 1)';
      document.body.appendChild(el);

      const angle = (Math.PI * 2 / 6) * i;
      const dist = 35 + Math.random() * 30;
      setTimeout(() => {
        el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 15}px) scale(1.3)`;
        el.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        el.remove();
      }, 750);
    }
  }

  document.querySelectorAll('.hidden-heart-collectible').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      collectHeart(btn);
    });
  });

  /* ==========================================================================
     7. CHAPTER 4: LITTLE THINGS I LOVE ABOUT YOU (FOLDED NOTE CARDS)
     ========================================================================== */
  document.querySelectorAll('.note-card').forEach((card) => {
    card.addEventListener('click', () => {
      initAudio();
      playPopSound();
      
      // Toggle unfold animation
      card.classList.toggle('note-unfolded');

      const body = card.querySelector('.note-body');
      if (body && card.classList.contains('note-unfolded')) {
        showToast(body.textContent);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ==========================================================================
     8. CHAPTER 5: THE SECRET ("FOR BEAR ONLY") REVEAL
     ========================================================================== */
  const secretNoteBtn = document.getElementById('secret-note-btn');
  const secretRevealOverlay = document.getElementById('secret-reveal-overlay');
  const closeSecretBtn = document.getElementById('close-secret-btn');
  const celebrateBtn = document.getElementById('celebrate-btn');
  const secretFinalText = document.getElementById('secret-final-text');

  // Exact required sequence from Section 13 of prompt
  const finalSecretMessage = 
`i love you bearrrr

nan cutiieeeee litlllleee pumpkin

Happy Boyfriend's Day, Bear. 🧸♡

you always complete me, nan muddu, nan bearuuu...
missing you always nan bear maaa, maooo, cute little chocopie!
i love you when you are around me bearraaaaa...
love you bearrr jastiiiiiii!`;

  function openSecretNote() {
    initAudio();
    playChimeSound();

    if (secretRevealOverlay) {
      secretRevealOverlay.classList.add('open');
      secretRevealOverlay.setAttribute('aria-hidden', 'false');
    }

    if (!state.secretOpened && secretFinalText) {
      state.secretOpened = true;
      secretFinalText.textContent = '';
      
      let idx = 0;
      const typeSecret = setInterval(() => {
        if (idx < finalSecretMessage.length) {
          secretFinalText.textContent += finalSecretMessage.charAt(idx);
          playTypewriterSound();
          idx++;
        } else {
          clearInterval(typeSecret);
          playPopSound();
        }
      }, 35);
    }
  }

  if (secretNoteBtn) {
    secretNoteBtn.addEventListener('click', openSecretNote);
  }

  if (closeSecretBtn && secretRevealOverlay) {
    closeSecretBtn.addEventListener('click', () => {
      playPopSound();
      secretRevealOverlay.classList.remove('open');
      secretRevealOverlay.setAttribute('aria-hidden', 'true');
    });

    secretRevealOverlay.addEventListener('click', (e) => {
      if (e.target === secretRevealOverlay) {
        secretRevealOverlay.classList.remove('open');
        secretRevealOverlay.setAttribute('aria-hidden', 'true');
      }
    });
  }


  // Final Celebration Confetti / Heart Shower
  function showerLove() {
    initAudio();
    playChimeSound();
    showToast('🧸 Happy Boyfriend\'s Day, Bear! I love you jastiiii! ♡');

    const heartsEmojis = ['🧸', '♥', '♡', '💖', '✨', '🍯', '🍫', '🌸'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const drop = document.createElement('div');
        drop.textContent = heartsEmojis[Math.floor(Math.random() * heartsEmojis.length)];
        drop.style.position = 'fixed';
        drop.style.left = `${Math.random() * 95}vw`;
        drop.style.top = '-40px';
        drop.style.fontSize = `${1.4 + Math.random() * 1.5}rem`;
        drop.style.zIndex = '9999';
        drop.style.pointerEvents = 'none';
        drop.style.transition = `transform ${2 + Math.random() * 1.8}s linear, opacity 2s ease`;
        document.body.appendChild(drop);

        setTimeout(() => {
          drop.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 360}deg)`;
          drop.style.opacity = '0';
        }, 20);

        setTimeout(() => {
          drop.remove();
        }, 3800);
      }, i * 65);
    }
  }

  if (celebrateBtn) {
    celebrateBtn.addEventListener('click', showerLove);
  }

  /* ==========================================================================
     9. PHOTO SYSTEM & REAL PHOTO REPLACEMENT (LocalStorage Support)
     ========================================================================== */
  const photoCustomizerBtn = document.getElementById('customize-photos-btn');
  const customizerModal = document.getElementById('customizer-modal');
  const customizerClose = document.getElementById('customizer-close');
  const savePhotosBtn = document.getElementById('save-photos-btn');
  const resetPhotosBtn = document.getElementById('reset-photos-btn');

  const PHOTO_STORAGE_KEY = 'bear_scrapbook_photos_v1';

  function loadSavedPhotos() {
    try {
      const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
      if (!saved) return;
      const photoMap = JSON.parse(saved);

      Object.keys(photoMap).forEach((targetId) => {
        const dataUrl = photoMap[targetId];
        if (dataUrl) {
          applyPhotoToDom(targetId, dataUrl);
        }
      });
    } catch (e) {
      console.warn('Failed to load photos from storage:', e);
    }
  }

  function applyPhotoToDom(targetId, dataUrl) {
    document.querySelectorAll(`[data-photo-id="${targetId}"]`).forEach((box) => {
      box.innerHTML = `<img src="${dataUrl}" alt="Photo for Bear" loading="lazy">`;
    });
  }

  function handleFileInputChange(e) {
    const input = e.target;
    const targetId = input.getAttribute('data-target');
    const file = input.files[0];
    if (!file || !targetId) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      const dataUrl = evt.target.result;
      applyPhotoToDom(targetId, dataUrl);

      // Save to localStorage
      try {
        let photoMap = {};
        const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
        if (saved) {
          photoMap = JSON.parse(saved);
        }
        photoMap[targetId] = dataUrl;
        localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(photoMap));
        showToast('Photo added to scrapbook! 📷♡');
        playPopSound();
      } catch (err) {
        console.warn('LocalStorage quota or save error:', err);
      }
    };
    reader.readAsDataURL(file);
  }

  document.querySelectorAll('.slot-file-input').forEach((input) => {
    input.addEventListener('change', handleFileInputChange);
  });

  if (photoCustomizerBtn && customizerModal) {
    photoCustomizerBtn.addEventListener('click', () => {
      initAudio();
      playPopSound();
      customizerModal.classList.add('open');
      customizerModal.setAttribute('aria-hidden', 'false');
    });
  }

  if (customizerClose && customizerModal) {
    customizerClose.addEventListener('click', () => {
      playPopSound();
      customizerModal.classList.remove('open');
      customizerModal.setAttribute('aria-hidden', 'true');
    });
  }

  if (savePhotosBtn && customizerModal) {
    savePhotosBtn.addEventListener('click', () => {
      playPopSound();
      customizerModal.classList.remove('open');
      customizerModal.setAttribute('aria-hidden', 'true');
      showToast('Scrapbook photos saved! ✨');
    });
  }

  if (resetPhotosBtn) {
    resetPhotosBtn.addEventListener('click', () => {
      playPopSound();
      localStorage.removeItem(PHOTO_STORAGE_KEY);
      location.reload();
    });
  }

  /* ==========================================================================
     10. GENERAL CONTROLS & LISTENERS
     ========================================================================== */
  // Sound Toggle Button
  const soundBtn = document.getElementById('sound-btn');
  const soundIcon = document.getElementById('sound-icon');
  const soundState = document.getElementById('sound-state');

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      initAudio();
      state.soundEnabled = !state.soundEnabled;
      if (soundState) soundState.textContent = state.soundEnabled ? 'on' : 'off';
      if (soundIcon) soundIcon.textContent = state.soundEnabled ? '🔔' : '🔕';
      if (state.soundEnabled) playPopSound();
    });
  }

  // Cover Page Open Button
  const openJournalBtn = document.getElementById('open-journal-btn');
  if (openJournalBtn) {
    openJournalBtn.addEventListener('click', () => {
      initAudio();
      playPopSound();
      goToChapter(1);
    });
  }

  // Next Page Action Buttons
  document.querySelectorAll('.scrapbook-next-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextChapter = parseInt(btn.getAttribute('data-next-to'), 10);
      goToChapter(nextChapter);
    });
  });

  // Chapter Tracker Heart Buttons (Click to jump to previously visited chapters)
  chapterHeartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chapterIdx = parseInt(btn.getAttribute('data-chapter'), 10);
      // Allow jumping to any chapter up to max unlocked
      if (chapterIdx <= state.maxUnlockedChapter + 1) {
        goToChapter(chapterIdx);
      } else {
        playPopSound();
        showToast('Turn previous pages first to unlock! 📖');
      }
    });
  });

  // Initialize on Load
  document.addEventListener('DOMContentLoaded', () => {
    initSparkleCursor();
    loadSavedPhotos();

    // Initialize audio on very first user interaction anywhere
    const enableAudioOnce = () => {
      initAudio();
      window.removeEventListener('click', enableAudioOnce);
      window.removeEventListener('keydown', enableAudioOnce);
      window.removeEventListener('touchstart', enableAudioOnce);
    };
    window.addEventListener('click', enableAudioOnce, { passive: true });
    window.addEventListener('keydown', enableAudioOnce, { passive: true });
    window.addEventListener('touchstart', enableAudioOnce, { passive: true });
  });

})();
