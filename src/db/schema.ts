import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

// Users (Admin users for the system)
export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // scrypt hashed password
    role: text("role", { enum: ["admin", "editor", "viewer"] }).default("viewer"),
    emailVerified: integer("email_verified", { mode: "timestamp" }),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Sessions for authentication
export const sessions = sqliteTable("sessions", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id).notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// WebAuthn credentials for passwordless authentication and 2FA
export const webAuthnCredentials = sqliteTable("webauthn_credentials", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id).notNull(),
    publicKey: text("public_key").notNull(),
    // Store the credential ID from the authenticator
    credentialId: text("credential_id").notNull().unique(),
    // Counter to prevent replay attacks
    counter: integer("counter").notNull(),
    // Transports that the authenticator supports
    transports: text("transports"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Verification tokens (for email verification, password reset)
export const verificationTokens = sqliteTable('verification_tokens', {
    token: text('token').notNull(),
    identifier: text('identifier').notNull(),
    expires: integer('expires').notNull(),
    type: text('type').notNull(),
}, (table) => {
    return {
        pk: primaryKey(table.token),
    };
});


// Blog Posts
export const posts = sqliteTable("posts", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(), // EditorJS JSON content
    excerpt: text("excerpt"),
    featuredImage: text("featured_image"),
    status: text("status", { enum: ["draft", "published", "archived"] }).default("draft"),
    authorId: text("author_id").references(() => users.id),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    publishedAt: integer("published_at", { mode: "timestamp" }),
});

// Categories for posts, programs, etc.
export const categories = sqliteTable("categories", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    type: text("type", { enum: ["post", "program", "opportunity"] }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relation table for posts to categories
export const postCategories = sqliteTable("post_categories", {
    postId: text("post_id").references(() => posts.id).notNull(),
    categoryId: text("category_id").references(() => categories.id).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
});

// Programs
export const programs = sqliteTable("programs", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(), // EditorJS JSON content
    excerpt: text("excerpt"),
    featuredImage: text("featured_image"),
    status: text("status", { enum: ["draft", "published", "archived"] }).default("draft"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    startDate: integer("start_date", { mode: "timestamp" }),
    endDate: integer("end_date", { mode: "timestamp" }),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relation table for programs to categories
export const programCategories = sqliteTable("program_categories", {
    programId: text("program_id").references(() => programs.id).notNull(),
    categoryId: text("category_id").references(() => categories.id).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.programId, table.categoryId] }),
    };
});

// Opportunities (jobs, volunteer roles)
export const opportunities = sqliteTable("opportunities", {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    content: text("content").notNull(), // EditorJS JSON content
    excerpt: text("excerpt"),
    featuredImage: text("featured_image"),
    status: text("status", { enum: ["draft", "published", "archived", "closed"] }).default("draft"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    location: text("location"),
    type: text("type", { enum: ["full-time", "part-time", "volunteer", "internship"] }),
    deadline: integer("deadline", { mode: "timestamp" }),
    formId: text("form_id").references(() => forms.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relation table for opportunities to categories
export const opportunityCategories = sqliteTable("opportunity_categories", {
    opportunityId: text("opportunity_id").references(() => opportunities.id).notNull(),
    categoryId: text("category_id").references(() => categories.id).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.opportunityId, table.categoryId] }),
    };
});

// Dynamic Forms (for applications)
export const forms = sqliteTable("forms", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    fields: text("fields").notNull(), // JSON schema for form fields
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Applications (submissions from users applying to opportunities)
export const applications = sqliteTable("applications", {
    id: text("id").primaryKey(),
    opportunityId: text("opportunity_id").references(() => opportunities.id),
    programId: text("program_id").references(() => programs.id),
    formId: text("form_id").references(() => forms.id).notNull(),
    applicantId: text("applicant_id").references(() => applicants.id),
    data: text("data").notNull(), // JSON data of form submission
    status: text("status", { enum: ["new", "under_review", "accepted", "rejected", "waitlisted"] }).default("new"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Applicants (people who apply)
export const applicants = sqliteTable("applicants", {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name"),
    phone: text("phone"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Application notes (for CRM functionality)
export const applicationNotes = sqliteTable("application_notes", {
    id: text("id").primaryKey(),
    applicationId: text("application_id").references(() => applications.id).notNull(),
    userId: text("user_id").references(() => users.id).notNull(),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Tags for applications (for CRM functionality)
export const tags = sqliteTable("tags", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    color: text("color").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Relation table for applications to tags
export const applicationTags = sqliteTable("application_tags", {
    applicationId: text("application_id").references(() => applications.id).notNull(),
    tagId: text("tag_id").references(() => tags.id).notNull(),
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.applicationId, table.tagId] }),
    };
});

// Media files
export const media = sqliteTable("media", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),
    uploadedById: text("uploaded_by_id").references(() => users.id),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

// Account for OAuth providers
export const accounts = sqliteTable("accounts", {
    id: text("id").primaryKey(),
    userId: text("user_id").references(() => users.id).notNull(),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
});

// Settings for the site
export const settings = sqliteTable("settings", {
    key: text("key").primaryKey(),
    value: text("value").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
});