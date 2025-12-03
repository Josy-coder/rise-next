import {Metadata} from 'next'

// Placeholder data - will be replaced with Sanity later
const placeholderArticle = {
  title: 'RiseNext Wins 2024 CIEE UNHCR Student Challenge',
  category: 'Announcement',
  excerpt:
    'Team Eagles takes home the top prize at the prestigious CIEE UNHCR Student Challenge for their innovative mentoring program.',
  featuredImage: '/charitize-img/causes-1.jpg',
  publishedAt: '2024-11-15',
  author: {
    name: 'Team Eagles',
    role: 'Founders',
    image: '/charitize-img/team-1.jpg',
  },
  content: `
    <p>We are thrilled to announce that RiseNext, created by Team Eagles (Amina Mkova, Obed Korusenge Nsanzimfura, Joselyto Charite Baho Kemana, and Nimco Ibrahim), has won the 2024 CIEE UNHCR Student Challenge! This recognition validates our mission to bridge the knowledge gap for forcibly displaced high school and university students seeking higher education opportunities.</p>

    <h3>The Journey to Victory</h3>
    <p>The CIEE UNHCR Student Challenge brought together innovative student-led initiatives from around the world, all focused on addressing critical issues faced by displaced populations. Our team presented RiseNext as a comprehensive mentoring program that connects displaced students with mentors, resources, and opportunities to pursue higher education.</p>

    <p>The competition was fierce, with teams presenting solutions ranging from skills training to community integration programs. What set RiseNext apart was our holistic approach to addressing not just the immediate educational needs, but also the long-term career development and integration of displaced students.</p>

    <h3>What This Means for Our Community</h3>
    <p>This victory is more than just an award – it's a validation of the real need for programs like RiseNext and the impact we can have. The recognition from CIEE and UNHCR opens doors for:</p>
    <ul>
      <li>Increased visibility and credibility in the refugee education sector</li>
      <li>Potential partnerships with universities and organizations worldwide</li>
      <li>Additional resources to expand our mentorship program</li>
      <li>Greater opportunities for our students to access scholarships and educational programs</li>
    </ul>

    <h3>Looking Ahead</h3>
    <p>With this achievement behind us, we're more committed than ever to our mission. We're currently working on:</p>
    <ul>
      <li>Expanding our mentor network to serve more students</li>
      <li>Developing partnerships with universities across Africa, Europe, and North America</li>
      <li>Creating additional resources and workshops for our mentees</li>
      <li>Building a sustainable model that can be replicated in other regions</li>
    </ul>

    <h3>Thank You</h3>
    <p>This achievement wouldn't have been possible without the support of our mentors, partners, and most importantly, our students who inspire us every day with their resilience and determination. We're grateful to CIEE and UNHCR for this recognition, and we're excited about what the future holds for RiseNext.</p>

    <p>If you'd like to support our mission, consider becoming a mentor, partner organization, or donor. Together, we can build a world where every displaced student has the opportunity to pursue their dreams through education.</p>
  `,
  tags: ['Award', 'CIEE', 'UNHCR', 'Student Challenge', 'Recognition'],
}

// Related articles
const relatedArticles = [
  {
    slug: 'first-cohort-success-stories',
    title: 'First Cohort Success Stories',
    excerpt: 'Our inaugural cohort achieves remarkable results with 15 university admissions.',
    featuredImage: '/charitize-img/causes-2.jpg',
    category: 'Article',
  },
  {
    slug: 'partnership-announcement-education-africa',
    title: 'New Partnership with Education Africa',
    excerpt: 'Expanding scholarship opportunities for displaced students across East Africa.',
    featuredImage: '/charitize-img/causes-3.jpg',
    category: 'Press Release',
  },
  {
    slug: 'applications-open-2025-cohort',
    title: 'Applications Open for 2025 Cohort',
    excerpt: 'Displaced students, apply now for our 2025 mentorship program.',
    featuredImage: '/charitize-img/carousel-1.jpg',
    category: 'Announcement',
  },
]

export const metadata: Metadata = {
  title: `${placeholderArticle.title} - RiseNext`,
  description: placeholderArticle.excerpt,
}

export default function NewsDetailPage({params}: {params: {slug: string}}) {
  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-4">
          <h1 className="display-6 animated slideInDown">{placeholderArticle.title}</h1>
        </div>
      </div>
      {/* Page Header End */}

      {/* News Detail Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            {/* Main Content */}
            <div className="col-lg-8 wow fadeIn" data-wow-delay="0.1s">
              {/* Featured Image */}
              <div className="mb-5">
                <img
                  className="img-fluid w-100 rounded"
                  src={placeholderArticle.featuredImage}
                  alt={placeholderArticle.title}
                />
              </div>

              {/* Article Meta */}
              <div className="d-flex align-items-center mb-4">
                <span className="badge bg-primary text-dark rounded text-uppercase me-3">
                  {placeholderArticle.category}
                </span>
                <small className="text-body me-3">
                  <i className="fa fa-user text-secondary me-2"></i>
                  {placeholderArticle.author.name}
                </small>
                <small className="text-body">
                  <i className="fa fa-calendar-alt text-secondary me-2"></i>
                  {new Date(placeholderArticle.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </small>
              </div>

              {/* Article Content */}
              <div className="mb-5">
                <div dangerouslySetInnerHTML={{__html: placeholderArticle.content}}></div>
              </div>

              {/* Tags */}
              <div className="mb-5">
                <h5 className="mb-3">Tags</h5>
                <div className="d-flex flex-wrap bg-">
                  {placeholderArticle.tags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="badge bg-secondary text-primary rounded me-2 mb-2 p-2"
                    >
                      #{tag}
                    </a>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="bg-light rounded p-4 mb-5">
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid rounded-circle me-3"
                    src={placeholderArticle.author.image}
                    alt={placeholderArticle.author.name}
                    style={{width: '80px', height: '80px', objectFit: 'cover'}}
                  />
                  <div>
                    <h5 className="mb-1">{placeholderArticle.author.name}</h5>
                    <small className="text-muted">{placeholderArticle.author.role}</small>
                    <p className="mb-0 mt-2">
                      The founding team of RiseNext, dedicated to empowering displaced students
                      through mentorship and educational opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="d-flex align-items-center justify-content-between mb-5">
                <h5 className="mb-0">Share This Article</h5>
                <div className="d-flex">
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://risenext.org/news/' + params.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(placeholderArticle.title)}&url=${encodeURIComponent('https://risenext.org/news/' + params.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-square btn-primary rounded me-2"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://risenext.org/news/' + params.slug)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              {/* Search */}
              <div className="mb-5">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control p-3 rounded-start"
                    placeholder="Search articles..."
                  />
                  <button className="btn btn-primary rounded-end px-4">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-5 bg-secondary rounded p-4">
                <h4 className="mb-4 text-primary">Categories</h4>
                <div className="d-flex flex-column">
                  <a
                    className="category-link d-flex align-items-center text-white justify-content-between mb-3 p-2 rounded"
                    href="#"
                  >
                    <span>Announcements</span>
                    <span className="badge bg-primary text-dark rounded">12</span>
                  </a>
                  <a
                    className="category-link d-flex align-items-center text-white justify-content-between mb-3 p-2 rounded"
                    href="#"
                  >
                    <span>Articles</span>
                    <span className="badge bg-primary text-dark rounded">8</span>
                  </a>
                  <a
                    className="category-link d-flex align-items-center text-white justify-content-between mb-3 p-2 rounded"
                    href="#"
                  >
                    <span>Events</span>
                    <span className="badge bg-primary text-dark rounded">6</span>
                  </a>
                  <a
                    className="category-link d-flex align-items-center text-white justify-content-between p-2 rounded"
                    href="#"
                  >
                    <span>Press Releases</span>
                    <span className="badge bg-primary text-dark rounded">4</span>
                  </a>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="mb-5 bg-light rounded p-4">
                <h4 className="mb-4">Related Articles</h4>
                {relatedArticles.map((article, index) => (
                  <div
                    key={article.slug}
                    className={`d-flex mb-3 ${index < 2 ? 'pb-3 border-bottom' : ''}`}
                  >
                    <img
                      className="img-fluid rounded"
                      src={article.featuredImage}
                      style={{width: '80px', height: '80px', objectFit: 'cover'}}
                      alt=""
                    />
                    <div className="ps-3">
                      <a href={`/news/${article.slug}`} className="h6 mb-1">
                        {article.title}
                      </a>
                      <small className="text-muted d-block">{article.category}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Back to News */}
          <div className="row mt-5">
            <div className="col-12 text-center">
              <a href="/news" className="btn btn-secondary rounded py-3 px-5">
                <i className="fa fa-arrow-left me-2"></i>
                Back to All News
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* News Detail End */}
    </>
  )
}
