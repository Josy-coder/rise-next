import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const applications = sqliteTable('applications', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	formId: text('form_id').notNull(),
	opportunityId: text('opportunity_id'),
	programId: text('program_id'),
	applicantName: text('applicant_name').notNull(),
	applicantEmail: text('applicant_email').notNull(),
	data: text('data').notNull(), // JSON string of form data
	status: text('status').default('submitted').notNull(),
	notes: text('notes'),
	trackingId: text('tracking_id').notNull().unique(), // Public ID for applicants to track
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
});

// Application status history
export const applicationStatusHistory = sqliteTable('application_status_history', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	applicationId: text('application_id').notNull(),
	status: text('status').notNull(),
	notes: text('notes'),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	userId: text('user_id'),
});

// Application tracking tokens (for email verification)
export const applicationTrackingTokens = sqliteTable('application_tracking_tokens', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	applicationId: text('application_id').notNull(),
	token: text('token').notNull().unique(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	used: integer('used', { mode: 'boolean' }).default(false).notNull(),
});

// Define relations manually
export const applicationsRelations = {
	form: {
		relationTableName: 'forms',
		relationFieldName: 'id',
		fieldName: 'formId',
		columns: ['form_id'],
		references: ['id'],
	},
	opportunity: {
		relationTableName: 'opportunities',
		relationFieldName: 'id',
		fieldName: 'opportunityId',
		columns: ['opportunity_id'],
		references: ['id'],
	},
	program: {
		relationTableName: 'programs',
		relationFieldName: 'id',
		fieldName: 'programId',
		columns: ['program_id'],
		references: ['id'],
	},
};

export const applicationStatusHistoryRelations = {
	application: {
		relationTableName: 'applications',
		relationFieldName: 'id',
		fieldName: 'applicationId',
		columns: ['application_id'],
		references: ['id'],
	},
	user: {
		relationTableName: 'users',
		relationFieldName: 'id',
		fieldName: 'userId',
		columns: ['user_id'],
		references: ['id'],
	},
};

export const applicationTrackingTokensRelations = {
	application: {
		relationTableName: 'applications',
		relationFieldName: 'id',
		fieldName: 'applicationId',
		columns: ['application_id'],
		references: ['id'],
	},
};