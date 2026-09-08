const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const logos = [
  {
    name: 'cryptostack-dark.png',
    url: 'https://gemini.google.com/share/3182fbb2473f?skid=6c0d7399-0d19-4d21-a9b9-3fde26f64f30',
    description: 'Dark theme logo'
  },
  {
    name: 'cryptostack-light.png', 
    url: 'https://gemini.google.com/share/9ba23d3f0053?skid=e4baf293-e23e-4200-a892-e8d7b6ac3c48',
    description: 'Light theme logo'
  }
];

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const logo of logos) {
    console.log(`\nProcessing: ${logo.description}`);
    console.log(`URL: ${logo.url}`);
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    try {
      await page.goto(logo.url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait for content to load
      await new Promise(r => setTimeout(r, 5000));
      
      // Try to find the generated image
      const imagePath = path.join(__dirname, 'public', logo.name);
      
      // Take a screenshot of the page
      await page.screenshot({ path: imagePath, fullPage: false });
      console.log(`Saved screenshot: ${imagePath}`);
      
      // Also try to find and extract the actual image element
      const imageData = await page.evaluate(() => {
        // Look for the generated image in the conversation
        const images = document.querySelectorAll('img');
        const results = [];
        for (const img of images) {
          if (img.src && !img.src.includes('google') && !img.src.includes('favicon')) {
            results.push({ src: img.src, alt: img.alt, width: img.width, height: img.height });
          }
        }
        return results;
      });
      
      console.log('Found images:', JSON.stringify(imageData, null, 2));
      
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
    
    await page.close();
  }
  
  await browser.close();
  console.log('\nDone!');
})();
