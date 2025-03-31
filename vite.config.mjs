export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const PORT = 3000;

  return {
    server: {
      open: true,
      port: PORT
    },
    define: {
      global: 'window'
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false },
        less: { charset: false }
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') atRule.remove();
              }
            }
          }
        ]
      }
    },
    base: '/Employment-Engagement-Dashboard/', // Explicitly match GitHub repo name
    plugins: [react(), jsconfigPaths()]
  };
});
