"use client"

// Placeholder data - will be replaced with Sanity later
const placeholderNews = [
  {
    slug: 'risenext-wins-2024-ciee-unhcr-challenge',
    title: 'RiseNext Wins 2024 CIEE UNHCR Student Challenge',
    category: 'Announcement',
    excerpt:
      'Team Eagles takes home the top prize at the prestigious CIEE UNHCR Student Challenge for their innovative mentoring program.',
    featuredImage: '/charitize-img/causes-1.jpg',
    publishedAt: '2024-11-15',
    author: 'Team Eagles',
  },
  {
    slug: 'first-cohort-success-stories',
    title: 'First Cohort Success Stories: 15 Students Admitted to Universities',
    category: 'Article',
    excerpt:
      'Our inaugural cohort of displaced students achieves remarkable results, with 15 admissions to universities across Africa, Europe, and North America.',
    featuredImage: '/charitize-img/causes-2.jpg',
    publishedAt: '2024-11-10',
    author: 'Amina Mkova',
  },
  {
    slug: 'partnership-announcement-education-africa',
    title: 'New Partnership with Education Africa Initiative',
    category: 'Press Release',
    excerpt:
      'RiseNext partners with Education Africa Initiative to expand scholarship opportunities for displaced students across East Africa.',
    featuredImage: '/charitize-img/causes-3.jpg',
    publishedAt: '2024-11-05',
    author: 'Obed Korusenge',
  },
  {
    slug: 'workshop-series-january-2025',
    title: 'January 2025 Workshop Series: Essay Writing & Interview Skills',
    category: 'Event',
    excerpt:
      'Join us for a series of interactive workshops designed to help students master the university application process.',
    featuredImage: '/charitize-img/team-1.jpg',
    publishedAt: '2024-11-01',
    author: 'Joselyto Charite',
  },
  {
    slug: 'volunteer-spotlight-mentors-making-difference',
    title: 'Volunteer Spotlight: The Mentors Making a Difference',
    category: 'Article',
    excerpt:
      'Meet the dedicated volunteers who are transforming lives through one-on-one mentorship and unwavering support.',
    featuredImage: '/charitize-img/team-2.jpg',
    publishedAt: '2024-10-28',
    author: 'Nimco Ibrahim',
  },
  {
    slug: 'applications-open-2025-cohort',
    title: 'Applications Now Open for 2025 Mentee Cohort',
    category: 'Announcement',
    excerpt:
      'We are excited to announce that applications for our 2025 mentee cohort are now open. Displaced students, this is your chance!',
    featuredImage: '/charitize-img/carousel-1.jpg',
    publishedAt: '2024-10-20',
    author: 'Team Eagles',
  },
]

export default function NewsPage() {
  return (
    <>
      {/* News Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="text-center mx-auto mb-5 wow fadeIn" data-wow-delay="0.1s">
            <p className="section-title bg-white text-center text-primary px-3 fw-bold">
              Latest Updates
            </p>
            <h1 className="display-6 mb-4">News & Updates</h1>
            <p className="mb-0">
              Stay connected with RiseNext. Read about our impact, success stories, upcoming events,
              and the latest developments in our mission to empower displaced students.
            </p>
          </div>

          {/* Category Filter */}
          <div className="row mb-4 wow fadeIn" data-wow-delay="0.2s">
            <div className="col-12">
              <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-4">
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2 active" href="#">
                    <i className="fa fa-newspaper fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Show All</small>
                      <h6 className="mt-n1 mb-0">All News</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-bullhorn fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Announcements</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-calendar-alt fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Events</h6>
                    </div>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="d-flex align-items-center text-start mx-2 pb-2" href="#">
                    <i className="fa fa-pen fa-2x text-secondary"></i>
                    <div className="ps-3">
                      <small className="text-body">Filter</small>
                      <h6 className="mt-n1 mb-0">Articles</h6>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* News Grid */}
          <div className="row g-4">
            {placeholderNews.map((article, index) => (
              <div
                key={article.slug}
                className="col-lg-4 col-md-6 wow fadeIn"
                data-wow-delay={`${0.1 + index * 0.1}s`}
              >
                <div className="blog-item bg-light rounded overflow-hidden h-100 d-flex flex-column">
                  <div
                    className="blog-img position-relative overflow-hidden"
                    style={{height: '200px'}}
                  >
                    <img
                      className="img-fluid w-100 h-100"
                      src={article.featuredImage}
                      alt=""
                      style={{objectFit: 'cover'}}
                    />
                    <a
                      className="position-absolute top-0 start-0 bg-primary text-dark rounded-end mt-3 py-2 px-4"
                      href="#"
                    >
                      {article.category}
                    </a>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex mb-3">
                      <small className="me-3">
                        <i className="fa fa-user text-secondary me-2"></i>
                        {article.author}
                      </small>
                      <small>
                        <i className="fa fa-calendar-alt text-secondary me-2"></i>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </small>
                    </div>
                    <h5
                      className="mb-3"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3.6rem',
                      }}
                    >
                      {article.title}
                    </h5>
                    <p
                      className="mb-3"
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '4.5rem',
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div className="mt-auto">
                      <a className="btn btn-secondary rounded py-2 px-4" href={`/news/${article.slug}`}>
                        Read More
                        <i className="fa fa-arrow-right ms-2"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="row mt-5">
            <div className="col-12">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center mb-0 wow fadeIn">
                  <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* News End */}
    </>
  )
}
