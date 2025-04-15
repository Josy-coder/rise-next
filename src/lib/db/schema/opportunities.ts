import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const opportunities = sqliteTable('opportunities', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	shortDescription: text('short_description'),
	content: text('content').notNull(), // JSON content from Editor.js
	type: text('type').notNull(),
	status: text('status').default('open').notNull(),
	location: text('location'),
	published: integer('published', { mode: 'boolean' }).default(false).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	closingDate: integer('closing_date', { mode: 'timestamp' }),
	formId: text('form_id'),
});

export const opportunitiesRelations = {
	form: {
		relationTableName: 'forms',
		relationFieldName: 'id',
		fieldName: 'formId',
		columns: ['form_id'],
		references: ['id'],
	},
};