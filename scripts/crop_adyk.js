/* eslint-disable */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = 'C:/Users/Lenovo/.gemini/antigravity-ide/brain/318f190d-45e3-4cbf-9a40-ade0bd43da58/.user_uploaded/media_1791827327420.png';
const outputDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('Loading input image:', inputPath);

  // We know from pixel scan:
  // minX: 165, maxX: 858, minY: 256, maxY: 720
  // Subtitle 'A MULTI VENTURE COMPANY' begins at Y=768.
  // Let's crop exactly the handwritten word with balanced padding.
  
  const cropLeft = 140;
  const cropTop = 230;
  const cropWidth = 744; // 140 + 744 = 884 (covers 858 with 26px margin)
  const cropHeight = 510; // 230 + 510 = 740 (stops safely at 740, well before subtitle at 768!)

  // 1. Save high-resolution cropped version with original texture (off-white luxury canvas)
  await sharp(inputPath)
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png({ quality: 100 })
    .toFile(path.join(outputDir, 'adyk-handwritten-card.png'));
  console.log('Created adyk-handwritten-card.png');

  // 2. Extract with transparency for seamless layering on luxury white background or inside SVG / card
  const img = sharp(inputPath).extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight });
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgbaBuffer = Buffer.alloc(width * height * 4);

  // Background sample in top corner of cropped area
  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      const idx = (y * width + x) * channels;
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
      bgCount++;
    }
  }
  const bgLuma = (bgR / bgCount + bgG / bgCount + bgB / bgCount) / 3;
  console.log('Background Luma:', bgLuma);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const luma = (r * 0.299 + g * 0.587 + b * 0.114);

      // Ink feathering and opacity calculation:
      // High contrast preservation of original calligraphy bristles and dry brush marks
      let alpha = 0;
      if (luma < bgLuma - 3) {
        // Linear opacity ramp to capture subtle brush bristle feathering
        const diff = (bgLuma - luma) / bgLuma;
        alpha = Math.min(255, Math.max(0, Math.round(diff * 285)));
      }

      const outIdx = (y * width + x) * 4;
      // Preserve rich deep ink tone
      outDataR = Math.min(r, 20);
      outDataG = Math.min(g, 20);
      outDataB = Math.min(b, 25);

      rgbaBuffer[outIdx] = outDataR;
      rgbaBuffer[outIdx + 1] = outDataG;
      rgbaBuffer[outIdx + 2] = outDataB;
      rgbaBuffer[outIdx + 3] = alpha;
    }
  }

  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'adyk-handwritten-transparent.png'));
  console.log('Created adyk-handwritten-transparent.png');

  // 3. Let's also create an ultra-crisp square presentation artwork (1024x1024) centered with luxury aesthetic
  // where the handwritten 'Adyk' is placed on a pristine off-white canvas, perfectly centered, without the subtitle
  const centeredCanvas = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 248, g: 247, b: 244, alpha: 1 }
    }
  })
  .composite([
    {
      input: path.join(outputDir, 'adyk-handwritten-transparent.png'),
      gravity: 'centre'
    }
  ])
  .png({ quality: 100 })
  .toFile(path.join(outputDir, 'adyk-handwritten-square.png'));
  console.log('Created adyk-handwritten-square.png');
}

run().catch(console.error);
