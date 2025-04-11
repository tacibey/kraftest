// process-html.mjs (Düzeltilmiş Hali)
import fs from 'node:fs/promises';
import { globby } from 'globby';
import { minify } from 'html-minifier-terser';

// Astro'nun varsayılan çıktı dizinini hedefle
const buildOutputDir = './dist'; // <-- Düzeltilmiş Yol
const files = await globby(`${buildOutputDir}/**/*.html`);

// Eğer hiç HTML dosyası bulunamazsa hata vermemesi için kontrol ekleyelim
if (files.length === 0) {
  console.log(`No HTML files found in ${buildOutputDir}. Skipping HTML minification.`);
} else {
  console.log(`Processing ${files.length} HTML files in ${buildOutputDir}...`);
  await Promise.all(
    files.map(async (file) => {
      console.log('Processing file:', file);
      let html = await fs.readFile(file, 'utf-8');

      // Minify the HTML
      html = await minify(html, {
        removeComments: true,
        preserveLineBreaks: true, // Satır sonlarını koru (opsiyonel)
        collapseWhitespace: true, // Boşlukları daralt
        minifyJS: true, // HTML içindeki JS'i küçült
        minifyCSS: true, // HTML içindeki CSS'i küçült
      });
      await fs.writeFile(file, html);
    }),
  );
  console.log('HTML minification complete.');
}
