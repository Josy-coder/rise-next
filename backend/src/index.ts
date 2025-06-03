import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

// Routes
import authRoutes from './routes/auth'
import postsRoutes from './routes/posts'
import programsRoutes from './routes/programs'
import opportunitiesRoutes from './routes/opportunities'
import applicationsRoutes from './routes/applications'
import formsRoutes from './routes/forms'
import mediaRoutes from './routes/media'
import adminRoutes from './routes/admin'
import {AnyD1Database} from "drizzle-orm/d1/driver";

// Types
export type Bindings = {
  DB: AnyD1Database
  STORAGE: R2Bucket
  JWT_SECRET: string
  RESEND_API_KEY: string
  FRONTEND_URL: string
  ENVIRONMENT: string
}

// Create app instance
const app = new OpenAPIHono<{ Bindings: Bindings }>()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: (origin) => {
    // Allow localhost in development and your frontend URL in production
    const allowedOrigins = [
      'http://localhost:3000',
      'https://yourfrontend.vercel.app', // Replace with your actual frontend URL
    ]
    return allowedOrigins.includes(origin) || origin?.endsWith('.vercel.app')
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

// Health check route
app.openapi({
  method: 'get',
  path: '/',
  tags: ['Health'],
  responses: {
    200: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              timestamp: { type: 'string' },
              environment: { type: 'string' },
            },
          },
        },
      },
      description: 'API health check',
    },
  },
}, (c) => {
  return c.json({
    message: 'Nonprofit Platform API is running!',
    timestamp: new Date().toISOString(),
    environment: c.env.ENVIRONMENT,
  })
})

// Mount route groups
app.route('/api/auth', authRoutes)
app.route('/api/posts', postsRoutes)
app.route('/api/programs', programsRoutes)
app.route('/api/opportunities', opportunitiesRoutes)
app.route('/api/applications', applicationsRoutes)
app.route('/api/forms', formsRoutes)
app.route('/api/media', mediaRoutes)
app.route('/api/admin', adminRoutes)

// OpenAPI documentation
app.doc('/api/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Nonprofit Platform API',
    version: '1.0.0',
    description: 'API for managing nonprofit organization content and applications',
  },
  servers: [
    {
      url: 'http://localhost:8787',
      description: 'Development server',
    },
    {
      url: 'https://your-api.your-domain.workers.dev',
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
})

// Swagger UI
app.get('/api/docs', swaggerUI({
  url: '/api/openapi.json',
}))

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Route not found' }, 404)
})

// Error handler
app.onError((err, c) => {
  console.error('API Error:', err)

  if (err.message.includes('Unauthorized')) {
    return c.json({ error: 'Unauthorized access' }, 401)
  }

  if (err.message.includes('Forbidden')) {
    return c.json({ error: 'Forbidden' }, 403)
  }

  return c.json({
    error: 'Internal server error',
    message: c.env.ENVIRONMENT === 'development' ? err.message : 'Something went wrong'
  }, 500)
})

export default app