import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

// Dynamic form definition
export const forms = sqliteTable('forms', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	title: text('title').notNull(),
	description: text('description'),
	schema: text('schema').notNull(), // JSON schema of form fields
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	active: integer('active', { mode: 'boolean' }).default(true).notNull(),
});

// Form fields
export const formFields = sqliteTable('form_fields', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	formId: text('form_id').notNull(),
	label: text('label').notNull(),
	type: text('type').notNull(),
	required: integer('required', { mode: 'boolean' }).default(false).notNull(),
	order: integer('order').notNull(),
	options: text('options'), // JSON string of options for select/radio/etc.
	validations: text('validations'), // JSON string of validation rules
});

export const formFieldsRelations = {
	form: {
		relationTableName: 'forms',
		relationFieldName: 'id',
		fieldName: 'formId',
		columns: ['form_id'],
		references: ['id'],
	},
};