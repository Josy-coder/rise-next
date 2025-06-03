import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text, blob } from 'drizzle-orm/sqlite-core'

export const admins = sqliteTable('admins', (table) => ({
    id: integer('id').primaryKey({ autoIncrement: true }),
    email: text('email').notNull().unique(),
    name: text('name').notNull(),
    passwordHash: text('password_hash').notNull(),
    role: text('role', { enum: ['super_admin', 'admin', 'editor'] }).notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    inviteCode: text('invite_code'),
    invitedBy: integer('invited_by').references(() => table.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}));

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content', { mode: 'json' }), // Editor.js JSON
    featuredImage: text('featured_image'),
    status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
    authorId: integer('author_id').notNull().references(() => admins.id),
    publishedAt: integer('published_at', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
})

export const programs = sqliteTable('programs', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    content: text('content', { mode: 'json' }),
    featuredImage: text('featured_image'),
    status: text('status', { enum: ['draft', 'published'] }).notNull().default('draft'),
    applicationDeadline: integer('application_deadline', { mode: 'timestamp' }),
    isApplicationOpen: integer('is_application_open', { mode: 'boolean' }).notNull().default(true),
    formId: integer('form_id').references(() => forms.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
})

export const opportunities = sqliteTable('opportunities', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    type: text('type', { enum: ['job', 'volunteer', 'internship'] }).notNull(),
    description: text('description').notNull(),
    content: text('content', { mode: 'json' }), // Editor.js JSON
    location: text('location'),
    isRemote: integer('is_remote', { mode: 'boolean' }).notNull().default(false),
    status: text('status', { enum: ['draft', 'published', 'closed'] }).notNull().default('draft'),
    applicationDeadline: integer('application_deadline', { mode: 'timestamp' }),
    formId: integer('form_id').references(() => forms.id),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    seoTitle: text('seo_title'),
    seoDescription: text('seo_description'),
})

export const forms = sqliteTable('forms', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    fields: text('fields', { mode: 'json' }).$type<FormField[]>().notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const applications = sqliteTable('applications', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    applicantEmail: text('applicant_email').notNull(),
    applicantName: text('applicant_name').notNull(),
    formId: integer('form_id').notNull().references(() => forms.id),
    relatedTo: text('related_to', { mode: 'json' }).$type<{
        type: 'program' | 'opportunity'
        id: number
    }>(),
    responses: text('responses', { mode: 'json' }).$type<FormResponse[]>().notNull(),
    status: text('status', {
        enum: ['pending', 'under_review', 'accepted', 'rejected', 'waitlisted']
    }).notNull().default('pending'),
    tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default('[]'),
    notes: text('notes', { mode: 'json' }).$type<ApplicationNote[]>().notNull().default('[]'),
    trackingToken: text('tracking_token').notNull().unique(),
    submittedAt: integer('submitted_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const media = sqliteTable('media', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    filename: text('filename').notNull(),
    originalName: text('original_name').notNull(),
    mimeType: text('mime_type').notNull(),
    size: integer('size').notNull(),
    url: text('url').notNull(), // R2 URL
    uploadedBy: integer('uploaded_by').notNull().references(() => admins.id),
    alt: text('alt'),
    caption: text('caption'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const inviteCodes = sqliteTable('invite_codes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull().unique(),
    email: text('email'), // If invite is for specific email
    role: text('role', { enum: ['admin', 'editor'] }).notNull(),
    isUsed: integer('is_used', { mode: 'boolean' }).notNull().default(false),
    usedBy: integer('used_by').references(() => admins.id),
    createdBy: integer('created_by').notNull().references(() => admins.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const trackingTokens = sqliteTable('tracking_tokens', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    token: text('token').notNull().unique(),
    email: text('email').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export const passwordResetTokens = sqliteTable('password_reset_tokens', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    token: text('token').notNull().unique(),
    adminId: integer('admin_id').notNull().references(() => admins.id),
    email: text('email').notNull(),
    isUsed: integer('is_used', { mode: 'boolean' }).notNull().default(false),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
})

export type FormField = {
    id: string
    type: 'text' | 'email' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'phone'
    label: string
    placeholder?: string
    required: boolean
    options?: string[]
    validation?: {
        minLength?: number
        maxLength?: number
        pattern?: string
    }
    order: number
}

export type FormResponse = {
    fieldId: string
    value: any
}

export type ApplicationNote = {
    text: string
    authorId: number
    createdAt: number
}
