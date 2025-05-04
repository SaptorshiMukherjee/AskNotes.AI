import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Tell Vite to prefix URLs with your repo name on GH Pages:
  base: mode === "production" ? "/ASKNOTE_AI_8TH-SEM/" : "/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react({
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react-pdf',
      'pdfjs-dist',
      '@radix-ui/react-context',
      '@radix-ui/react-collection',
      '@radix-ui/react-compose-refs'
    ],
    esbuildOptions: {
      target: 'esnext',
      jsx: 'automatic',
    },
  },

  ssr: {
    noExternal: [
      '@radix-ui/react-collection',
      '@radix-ui/react-context',
      '@radix-ui/react-compose-refs',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip'
    ],
  },

  build: {
    commonjsOptions: {
      include: [/react/, /react-dom/, /react-pdf/, /pdfjs-dist/, /@radix-ui/],
      transform: {
        include: [/react/, /react-dom/, /react-pdf/, /pdfjs-dist/, /@radix-ui/],
      },
    },
    rollupOptions: {
      external: ['react/jsx-runtime'],
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'pdfjs': ['pdfjs-dist'],
          'radix': ['@radix-ui/react-context', '@radix-ui/react-collection', '@radix-ui/react-compose-refs'],
        },
      },
    },
  },
}));
