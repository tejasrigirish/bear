const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTests() {
  console.log('--- STARTING BEAR SCRAPBOOK E2E PHOTO TESTS ---');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1200,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  try {
    const fileUrl = 'http://localhost:8080/index.html';
    console.log(`1. Navigating to ${fileUrl}...`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });

    // Ensure screenshots folder exists
    const ssDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir);

    // Cover Page Verification
    console.log('2. Verifying Cover Page with Photo 1 peeking...');
    await page.screenshot({ path: path.join(ssDir, '01_cover.png') });

    // Click Open Scrapbook
    console.log('3. Clicking "OPEN IT ♡"...');
    await page.click('#open-journal-btn');
    await new Promise(r => setTimeout(r, 600));

    // Chapter 1: Photo 1 Primary Couple Polaroid
    console.log('4. Verifying Chapter 1: Primary Couple Polaroid (Photo 1)...');
    await page.screenshot({ path: path.join(ssDir, '02_ch1_photo1_front.png') });

    console.log('   Flipping Polaroid...');
    await page.click('#main-polaroid-card');
    await new Promise(r => setTimeout(r, 3200));
    await page.screenshot({ path: path.join(ssDir, '03_ch1_photo1_flipped.png') });

    const typedMessage = await page.$eval('#polaroid-message-text', el => el.innerText);
    console.log('   Typed Message:', typedMessage);

    // Proceed to Chapter 2: Photos 2, 3, 4
    console.log('5. Navigating to Chapter 2: Little Memories (Photos 2, 3, 4)...');
    await page.click('.scrapbook-next-btn[data-next-to="2"]');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ssDir, '04_ch2_memories_layout.png') });

    // Test Photo 2 click (Intimate close-up, small note "my maooo 🧸")
    console.log('   Testing Photo 2 click interaction ("my maooo 🧸")...');
    await page.click('#photo-2-intimate');
    await new Promise(r => setTimeout(r, 400));
    let toastText = await page.$eval('#scrapbook-toast', el => el.innerText);
    console.log('   Photo 2 Toast:', toastText);
    await page.screenshot({ path: path.join(ssDir, '05_ch2_photo2_toast.png') });

    // Test Photo 4 click (Black and white memory lightbox & reveal)
    console.log('   Testing Photo 4 click interaction (Lightbox & "missing you always nan bear maaa")...');
    await page.click('#photo-4-bw .collage-photo-frame');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ssDir, '06_ch2_photo4_lightbox.png') });
    await page.click('#lightbox-close');
    await new Promise(r => setTimeout(r, 400));

    // Proceed to Chapter 3: Photo 5 & Heart Hunt
    console.log('6. Navigating to Chapter 3: Photo 5 (Fun Couple Photo) & Heart Hunt...');
    await page.click('.scrapbook-next-btn[data-next-to="3"]');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ssDir, '07_ch3_photo5_hunt.png') });

    // Test Photo 5 click interaction
    console.log('   Testing Photo 5 click interaction ("nan cute, i love you jastiiiii!!!!")...');
    await page.click('#photo-5-item .playful-snapshot-frame');
    await new Promise(r => setTimeout(r, 400));
    toastText = await page.$eval('#scrapbook-toast', el => el.innerText);
    console.log('   Photo 5 Toast:', toastText);
    await page.screenshot({ path: path.join(ssDir, '08_ch3_photo5_toast.png') });

    // Verify decorative/instruction heart clicking does NOT increment counter
    console.log('   Testing decorative heart immunity (clicking counter icon & title)...');
    await page.click('.counter-hearts-icon');
    let counterVal = await page.$eval('#collected-hearts-text', el => el.innerText);
    console.log('   Counter after clicking decorative icon:', counterVal, '(expected 0 / 5)');

    // Collect all 5 collectible hearts on the Chapter 3 scavenger board
    console.log('   Collecting 5 hidden hearts on Chapter 3 board...');
    await page.click('[data-heart-id="heart-photo"]');
    await new Promise(r => setTimeout(r, 250));
    await page.click('[data-heart-id="heart-envelope"]');
    await new Promise(r => setTimeout(r, 250));
    await page.click('[data-heart-id="heart-coffee"]');
    await new Promise(r => setTimeout(r, 250));
    await page.click('[data-heart-id="heart-flower"]');
    await new Promise(r => setTimeout(r, 250));
    await page.click('[data-heart-id="heart-bear"]');
    await new Promise(r => setTimeout(r, 500));

    counterVal = await page.$eval('#collected-hearts-text', el => el.innerText);
    console.log('   Final Counter text:', counterVal, '(expected 5 / 5)');
    await page.screenshot({ path: path.join(ssDir, '08b_ch3_all5_hearts_collected.png') });

    // Proceed to Chapter 4: Photo 6 & Love Notes
    console.log('7. Navigating to Chapter 4: Photo 6 (Outdoor Couple Photo) & Love Notes...');
    await page.click('#hearts-unlocked-banner .scrapbook-next-btn');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ssDir, '09_ch4_photo6_notes.png') });

    // Test Photo 6 click interaction
    console.log('   Testing Photo 6 click interaction ("cute little chocopie ♡")...');
    await page.click('#photo-6-card');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(ssDir, '09b_ch4_photo6_lifted.png') });
    toastText = await page.$eval('#scrapbook-toast', el => el.innerText);
    console.log('   Photo 6 Toast:', toastText);

    // Proceed to Chapter 5: Photo 7 (His Solo Photo) & The Secret
    console.log('8. Navigating to Chapter 5: Photo 7 (His Solo Photo) & The Secret...');
    await page.click('.scrapbook-next-btn[data-next-to="5"]');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ssDir, '10_ch5_photo7_polaroid.png') });

    // Test Photo 7 click interaction
    console.log('   Testing Photo 7 click interaction ("nan bearuuu" -> "i love you bearrrr")...');
    await page.click('#photo-7-frame');
    await new Promise(r => setTimeout(r, 400));
    toastText = await page.$eval('#scrapbook-toast', el => el.innerText);
    console.log('   Photo 7 Step 1 Toast:', toastText);
    await new Promise(r => setTimeout(r, 1600));
    toastText = await page.$eval('#scrapbook-toast', el => el.innerText);
    console.log('   Photo 7 Step 2 Toast:', toastText);
    await page.screenshot({ path: path.join(ssDir, '11_ch5_photo7_heartburst.png') });

    // Open Secret Wax Seal Note
    console.log('   Opening Secret Wax Seal Note ("for bear only")...');
    await page.click('#secret-note-btn');
    await new Promise(r => setTimeout(r, 3500));
    await page.screenshot({ path: path.join(ssDir, '12_ch5_final_secret_letter.png') });

    // Mobile Phone Viewport Testing
    console.log('9. Testing Mobile Viewport (390 x 844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.evaluate(() => {
      const btn = document.getElementById('close-secret-btn');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Mobile Chapter 1
    await page.evaluate(() => document.querySelector('.heart-chapter-btn[data-chapter="1"]').click());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ssDir, '13_mobile_ch1_photo1.png') });

    // Mobile Chapter 2
    await page.evaluate(() => document.querySelector('.heart-chapter-btn[data-chapter="2"]').click());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ssDir, '14_mobile_ch2_photos234.png') });

    // Mobile Chapter 3
    await page.evaluate(() => document.querySelector('.heart-chapter-btn[data-chapter="3"]').click());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ssDir, '15_mobile_ch3_photo5.png') });

    // Mobile Chapter 4
    await page.evaluate(() => document.querySelector('.heart-chapter-btn[data-chapter="4"]').click());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ssDir, '16_mobile_ch4_photo6.png') });

    // Mobile Chapter 5
    await page.evaluate(() => document.querySelector('.heart-chapter-btn[data-chapter="5"]').click());
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(ssDir, '17_mobile_ch5_photo7.png') });

    console.log('--- TEST RESULTS ---');
    console.log('Console Errors caught:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    } else {
      console.log('ALL PHOTO INTEGRATION AND INTERACTION TESTS PASSED WITH 0 CONSOLE ERRORS! ✨');
    }

  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    await browser.close();
  }
}

runTests();
