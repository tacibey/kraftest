// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite"; // Tailwind CSS entegrasyonu için gerekli
import sitemap from "@astrojs/sitemap"; // Otomatik site haritası oluşturmak için
import compressor from "astro-compressor"; // HTML, CSS, JS sıkıştırması için
import mdx from "@astrojs/mdx"; // MDX dosyalarını kullanmak için

// https://astro.build/config
export default defineConfig({
  // Sitenizin canlı domain adresini buraya yazın. Site haritası ve canonical URL'ler için önemlidir.
  site: "https://krafferoasters.com", // KENDİ DOMAIN ADRESİNİZLE GÜNCELLEYİN

  // Dış kaynaklardan (CDN vb.) Astro'nun Image bileşeni ile görsel kullanmayacaksanız bu kısmı silebilirsiniz.
  // Örn: image: {},
  image: {
     domains: [], // Template'den kalan Unsplash domain'ini kaldırdık. Gerekirse kendi domainlerinizi ekleyin.
  },

  // Çoklu dil yapılandırması
  i18n: {
    defaultLocale: "en", // Varsayılan dil İngilizce
    locales: ["en", "fr", "es", "ru", "de", "pt", "it"], // Desteklenen tüm diller
    routing: {
      // Varsayılan dil (İngilizce) için URL'lerde /en/ öneki olmasın.
      // Yani anasayfa / olacak, Fransızca anasayfa /fr/, İspanyolca /es/ vb.
      prefixDefaultLocale: false,
    },
  },

  // Astro önbellekleme özelliğini etkinleştirir. Genellikle performansa katkı sağlar.
  prefetch: true,

  // Kullanılacak Astro entegrasyonları
  integrations: [
    // Site haritası entegrasyonu (SEO için önemli)
    sitemap({
      // Çoklu dil desteği için site haritası yapılandırması
      i18n: {
        defaultLocale: "en", // Site haritasında varsayılan dil
        // Her dil kodu için site haritasında kullanılacak dil etiketini belirtir
        locales: {
          en: "en", // İngilizce
          fr: "fr", // Fransızca
          es: "es", // İspanyolca
          ru: "ru", // Rusça
          de: "de", // Almanca
          pt: "pt", // Portekizce
          it: "it", // İtalyanca
        },
      },
    }),

    // Starlight entegrasyonu kaldırıldı.

    // Build sonrası dosyaları sıkıştırmak için (performans)
    // Brotli genellikle gzip'ten daha iyi sıkıştırma sağlar, Vercel gibi platformlar destekler.
    compressor({
      gzip: false,
      brotli: true,
    }),

    // MDX (.mdx) dosyalarını kullanabilmek için
    mdx()
  ],

  // Deneysel özellikler (isteğe bağlı)
  experimental: {
    // Client-side routing için önceden render etme (algılanan performansı artırabilir)
    clientPrerender: true,
  },

  // Vite yapılandırması (Astro'nun altında çalışan build aracı)
  vite: {
    plugins: [
      // Tailwind CSS'in Vite ile çalışmasını sağlar
      tailwindcss()
    ],
  },
});
