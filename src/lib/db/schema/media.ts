import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const media = sqliteTable('media', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	fileName: text('file_name').notNull(),
	fileSize: integer('file_size').notNull(),
	mimeType: text('mime_type').notNull(),
	r2Key: text('r2_key').notNull().unique(), // Path in R2 storage
	publicUrl: text('public_url').notNull(),
	alt: text('alt'),
	caption: text('caption'),
	width: integer('width'),
	height: integer('height'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	uploadedById: text('uploaded_by_id').notNull(),
});

export const mediaRelations = {
	uploadedBy: {
		relationTableName: 'users',
		relationFieldName: 'id',
		fieldName: 'uploadedById',
		columns: ['uploaded_by_id'],
		references: ['id'],
	},
};