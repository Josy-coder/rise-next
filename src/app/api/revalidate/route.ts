import {revalidateTag} from 'next/cache'
import {NextRequest, NextResponse} from 'next/server'

// This endpoint will be called by Sanity webhooks to revalidate content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const token = request.headers.get('authorization')
    if (token !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json({message: 'Invalid token'}, {status: 401})
    }

    const {tag, tags} = body

    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({revalidated: true, tag, now: Date.now()})
    }

    if (tags && Array.isArray(tags)) {
      tags.forEach((t: string) => revalidateTag(t))
      return NextResponse.json({revalidated: true, tags, now: Date.now()})
    }

    return NextResponse.json({message: 'No tag provided'}, {status: 400})
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json({message: 'Error revalidating'}, {status: 500})
  }
}
