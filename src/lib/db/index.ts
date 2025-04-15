import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import {
	sessionsRelations,
	blogPostsRelations,
	postCategoriesRelations,
	formFieldsRelations,
	opportunitiesRelations,
	applicationsRelations,
	applicationStatusHistoryRelations,
	applicationTrackingTokensRelations,
	mediaRelations
} from './schema';

// Function to get the database from the platform
export function getDb(platform: App.Platform) {
	if (!platform?.env?.DB) {
		throw new Error('Missing DB binding in platform.env');
	}

	return drizzle(platform.env.DB, {
		schema,
		// Set up relations for SQLite
		extraStatements: ({
			sessions: sessionsRelations,
			blogPosts: blogPostsRelations,
			postCategories: postCategoriesRelations,
			formFields: formFieldsRelations,
			opportunities: opportunitiesRelations,
			applications: applicationsRelations,
			applicationStatusHistory: applicationStatusHistoryRelations,
			applicationTrackingTokens: applicationTrackingTokensRelations,
			media: mediaRelations
		})
	});
}

// Type definition for the DB client
export type DB = ReturnType<typeof getDb>;

// Function to wrap database operations with better error handling
export async function dbOperation<T>(
	platform: App.Platform,
	operation: (db: DB) => Promise<T>
): Promise<T> {
	try {
		const db = getDb(platform);
		return await operation(db);
	} catch (error) {
		console.error('Database operation failed:', error);
		throw error;
	}
}