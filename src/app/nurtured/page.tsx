'use client';

import Link from 'next/link';
import { Container, Button, Card } from '@/components/ui';

const benefitsData = [
  'Research-backed strategies proven to improve outcomes',
  'Hands-on practice and real-world application',
  'Bespoke programmes tailored to your needs',
  'Expert facilitators with extensive teaching experience',
  'Flexible delivery formats (in-person, online, hybrid)',
  'Ongoing support and follow-up coaching',
  'Measurable impact on staff performance and student achievement',
  'Professional certification and CPD credits',
];

const focusAreasData = [
  {
    title: 'Effective Teaching & Learning Strategies',
    description: 'Evidence-based pedagogical approaches that enhance student engagement and learning outcomes.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: 'Digital Pedagogy and AI in Education',
    description: 'Integrating technology and artificial intelligence tools effectively into modern teaching practice.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Classroom Management & Student Engagement',
    description: 'Proven techniques for creating positive, productive learning environments that motivate students.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Inclusive and Differentiated Instruction',
    description: 'Meeting diverse learning needs and ensuring every student can access and excel in the curriculum.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Assessment for Learning (AfL)',
    description: 'Using formative assessment strategies to drive improvement and inform teaching decisions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Leadership Development & Team Building',
    description: 'Building capacity for effective leadership and collaborative professional cultures.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const projectsData = [
  {
    title: 'Strategic Development',
    description: 'Comprehensive school improvement planning aligned with your vision, focusing on sustainable growth and measurable outcomes.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Branding & Positioning',
    description: 'Develop a compelling identity that reflects your values, attracts families, and distinguishes your school in the market.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: 'Customised Consultancy',
    description: 'Tailored solutions addressing your specific challenges, from curriculum design to operational excellence.',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

const whyChooseData = [
  {
    title: 'Expert Team',
    description: 'Experienced educators and consultants with proven track records',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Evidence-Based',
    description: 'All programmes grounded in educational research and best practice',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Measurable Impact',
    description: 'Clear outcomes and lasting improvements in performance',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function NurturedPage() {
  return (
    <div className="bg-background-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              NuturED Programme
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Empowering Schools and Organizations Through Professional Development Excellence
            </p>
            <p className="text-lg text-white/80 mb-10 max-w-3xl mx-auto">
              Our comprehensive professional development programmes blend cutting-edge research with practical application to transform teaching practice, enhance leadership capacity, and drive meaningful improvements in student outcomes.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Staff Training Section */}
      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Staff Training & Development
            </h2>
            <p className="text-lg text-text-light">
              We provide bespoke training programmes for teachers, school leaders, and support staff. Our sessions blend research-backed strategies with hands-on practice to improve overall staff performance, classroom effectiveness, leadership capacity, and student outcomes.
            </p>
          </div>

          {/* Benefits List */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h3 className="text-xl font-bold text-text-dark mb-6 text-center">
              Programme Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-light">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Training Focus Areas
            </h2>
            <p className="text-lg text-text-light max-w-2xl mx-auto">
              Comprehensive professional development across all aspects of modern educational practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {focusAreasData.map((area, index) => (
              <Card key={index} hover className="p-6">
                <div className="text-primary mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-text-dark mb-3">{area.title}</h3>
                <p className="text-text-light">{area.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Development Projects Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Development Projects Include
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {projectsData.map((project, index) => (
              <Card key={index} hover className="p-8 text-center">
                <div className="text-primary mb-4 flex justify-center">{project.icon}</div>
                <h3 className="text-xl font-bold text-text-dark mb-3">{project.title}</h3>
                <p className="text-text-light">{project.description}</p>
              </Card>
            ))}
          </div>

          {/* School Development CTA */}
          <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              School Development Projects
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              We partner with schools to design and deliver transformational development projects that improve quality, performance, and reputation. Our collaborative approach ensures sustainable improvements that align with your strategic vision.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
                Book a Consultation
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Transform Your School Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Transform Your School or Organization
            </h2>
            <p className="text-lg text-text-light mb-8">
              Whether you need targeted staff training or a comprehensive school development project, our team of experienced educators and consultants are ready to partner with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Book a Consultation</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">General Inquiry</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose NuturED Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Why Choose NuturED?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-text-dark mb-2">{item.title}</h3>
                <p className="text-text-light">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
