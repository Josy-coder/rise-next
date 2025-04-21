import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface UserTable {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Generated<boolean>;
    image: string | null;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    // Extended fields for our application
    role: Generated<'admin' | 'editor' | 'viewer'>;
    bio: string | null;
    title: string | null;
}

export interface AccountTable {
    id: string;
    userId: string;
    providerType: string;
    providerId: string;
    providerAccountId: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: number | null;
    tokenType: string | null;
    scope: string | null;
    idToken: string | null;
    sessionState: string | null;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
}

export interface SessionTable {
    id: string;
    userId: string;
    expiresAt: string;
    ipAddress: string | null;
    userAgent: string | null;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
}

export interface VerificationTokenTable {
    identifier: string;
    token: string;
    expiresAt: string;
    createdAt: Generated<string>;
}

// Application-specific tables
export interface ProgramTable {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string; // JSON content from Editor.js
    featuredImage: string | null;
    status: Generated<'draft' | 'published'>;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    authorId: string;
    seoTitle: string | null;
    seoDescription: string | null;
}

export interface OpportunityTable {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string; // JSON content from Editor.js
    featuredImage: string | null;
    status: Generated<'draft' | 'published' | 'closed'>;
    deadline: string | null;
    location: string | null;
    type: string; // 'full-time', 'part-time', 'volunteer', etc.
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    authorId: string;
    seoTitle: string | null;
    seoDescription: string | null;
}

export interface BlogPostTable {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string; // JSON content from Editor.js
    featuredImage: string | null;
    status: Generated<'draft' | 'published'>;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    authorId: string;
    categories: string | null; // Comma-separated list of categories
    tags: string | null; // Comma-separated list of tags
    seoTitle: string | null;
    seoDescription: string | null;
}

export interface FormTable {
    id: string;
    name: string;
    description: string | null;
    schema: string; // JSON schema for the form
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    createdById: string;
    opportunityId: string | null; // Optional related opportunity
    programId: string | null; // Optional related program
}

export interface ApplicationTable {
    id: string;
    formId: string;
    data: string; // JSON data from the form submission
    status: Generated<'pending' | 'reviewing' | 'accepted' | 'rejected'>;
    notes: string | null;
    createdAt: Generated<string>;
    updatedAt: Generated<string>;
    applicantEmail: string;
    applicantName: string;
    applicantPhone: string | null;
    tags: string | null; // Comma-separated list of tags
}

export interface MediaTable {
    id: string;
    filename: string;
    originalFilename: string;
    mimeType: string;
    size: number;
    path: string;
    publicUrl: string | null;
    createdAt: Generated<string>;
    createdById: string;
    alt: string | null;
    caption: string | null;
}

// Define the full database schema
export interface Database {
    user: UserTable;
    account: AccountTable;
    session: SessionTable;
    verificationToken: VerificationTokenTable;
    program: ProgramTable;
    opportunity: OpportunityTable;
    blogPost: BlogPostTable;
    form: FormTable;
    application: ApplicationTable;
    media: MediaTable;
}

// Define convenience types for each table
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;

export type Account = Selectable<AccountTable>;
export type NewAccount = Insertable<AccountTable>;
export type AccountUpdate = Updateable<AccountTable>;

export type Session = Selectable<SessionTable>;
export type NewSession = Insertable<SessionTable>;
export type SessionUpdate = Updateable<SessionTable>;

export type VerificationToken = Selectable<VerificationTokenTable>;
export type NewVerificationToken = Insertable<VerificationTokenTable>;

export type Program = Selectable<ProgramTable>;
export type NewProgram = Insertable<ProgramTable>;
export type ProgramUpdate = Updateable<ProgramTable>;

export type Opportunity = Selectable<OpportunityTable>;
export type NewOpportunity = Insertable<OpportunityTable>;
export type OpportunityUpdate = Updateable<OpportunityTable>;

export type BlogPost = Selectable<BlogPostTable>;
export type NewBlogPost = Insertable<BlogPostTable>;
export type BlogPostUpdate = Updateable<BlogPostTable>;

export type Form = Selectable<FormTable>;
export type NewForm = Insertable<FormTable>;
export type FormUpdate = Updateable<FormTable>;

export type Application = Selectable<ApplicationTable>;
export type NewApplication = Insertable<ApplicationTable>;
export type ApplicationUpdate = Updateable<ApplicationTable>;

export type Media = Selectable<MediaTable>;
export type NewMedia = Insertable<MediaTable>;
export type MediaUpdate = Updateable<MediaTable>;