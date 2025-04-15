import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/db/schema/*',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		wranglerConfigPath: './wrangler.toml',
		dbName: 'DB',
	},
});