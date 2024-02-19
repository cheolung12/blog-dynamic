require('dotenv').config({ path: './.env.local' });
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      ADMIN_ID: process.env.CYPRESS_ADMIN_ID,
      ADMIN_PASSWORD: process.env.CYPRESS_ADMIN_PASSWORD,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
