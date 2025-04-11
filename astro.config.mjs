// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://krafferoasters.com", // KENDİ DOMAIN ADRESİNİZLE GÜNCELLEYİN
  image: {
    domains: [],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr", "es", "ru", "de", "pt", "it"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: true,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          fr: "fr",
          es: "es",
          ru: "ru",
          de: "de",
          pt: "pt",
          it: "it",
        },
      },
    }),
    compressor({
      gzip: false,
      brotli: true,
    }),
    mdx()
  ],
  experimental: {
    clientPrerender: true,
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
    // Rollup build seçeneklerini buraya ekleyin
    build: {
      rollupOptions: {
        external: [
          // Astro-expressive-code sanal modülünü dışarıda bırak
          "virtual:astro-expressive-code/config"
        ]
      }
    }
  },
  // VEYA Alternatif olarak, build seçenekleri doğrudan ana config seviyesinde de olabilir:
  /*
  build: {
    rollupOptions: {
      external: [
        "virtual:astro-expressive-code/config"
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ],
  }
  */
});
