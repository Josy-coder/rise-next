import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const programs = sqliteTable('programs', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	shortDescription: text('short_description'),
	content: text('content').notNull(), // JSON content from Editor.js
	coverImage: text('cover_image'),
	published: integer('published', { mode: 'boolean' }).default(false).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	publishedAt: integer('published_at', { mode: 'timestamp' }),
});