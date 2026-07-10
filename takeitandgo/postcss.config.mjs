// Standalone project boundary: this file stops the build from walking up to the
// root Next.js PostCSS config (which requires Tailwind and is not part of this
// project). Take It and Go uses plain CSS and needs no PostCSS plugins.
const config = {
  plugins: {},
};

export default config;
