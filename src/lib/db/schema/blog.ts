import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { createId } from '@paralleldrive/cuid2';

export const blogPosts = sqliteTable('blog_posts', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	title: text('title').notNull(),
	slug: text('slug').notNull().unique(),
	excerpt: text('excerpt'),
	content: text('content').notNull(), // JSON content from Editor.js
	coverImage: text('cover_image'),
	published: integer('published', { mode: 'boolean' }).default(false).notNull(),
	authorId: text('author_id').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	publishedAt: integer('published_at', { mode: 'timestamp' }),
});

// Blog categories
export const categories = sqliteTable('categories', {
	id: text('id').primaryKey().$defaultFn(() => createId()),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
});

// Many-to-many relationship for posts and categories
export const postCategories = sqliteTable('post_categories', {
	postId: text('post_id').notNull(),
	categoryId: text('category_id').notNull(),
	primary: integer('primary', { mode: 'boolean' }).default(false).notNull(),
});


export const blogPostsRelations = {
	author: {
		relationTableName: 'users',
		relationFieldName: 'id',
		fieldName: 'authorId',
		columns: ['author_id'],
		references: ['id'],
	},
};

export const postCategoriesRelations = {
	post: {
		relationTableName: 'blog_posts',
		relationFieldName: 'id',
		fieldName: 'postId',
		columns: ['post_id'],
		references: ['id'],
	},
	category: {
		relationTableName: 'categories',
		relationFieldName: 'id',
		fieldName: 'categoryId',
		columns: ['category_id'],
		references: ['id'],
	},
};