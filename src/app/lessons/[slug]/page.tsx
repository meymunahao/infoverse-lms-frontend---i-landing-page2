'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Card, CardHeader, CardTitle, CardContent, Loading, Button } from '@/components/ui';
import { useLesson } from '@/lib/hooks/useOakData';

export default function LessonPage() {
  const params = useParams();
  const slug = params.slug as string;

  const { data: lesson, error, isLoading } = useLesson(slug);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <Container className="py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-dark mb-4">
            Error Loading Lesson
          </h2>
          <p className="text-text-light mb-6">
            Unable to load this lesson. Please try again later.
          </p>
          <Link href="/subjects">
            <Button variant="primary">Back to Subjects</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-background-light min-h-screen py-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/subjects" className="hover:text-primary">Subjects</Link>
          {' / '}
          <Link href={`/subjects/${lesson.subjectSlug}`} className="hover:text-primary">
            {lesson.subjectTitle}
          </Link>
          {' / '}
          <Link href={`/units/${lesson.unitSlug}`} className="hover:text-primary">
            {lesson.unitTitle}
          </Link>
          {' / '}
          <span className="text-text-dark font-semibold">{lesson.title}</span>
        </nav>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">
              {lesson.lessonNumber}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-dark">
                {lesson.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-lg text-text-light">
            <span>{lesson.subjectTitle}</span>
            <span>•</span>
            <span>{lesson.keyStageTitle}</span>
            <span>•</span>
            <span>{lesson.unitTitle}</span>
          </div>
          {lesson.expired && (
            <div className="mt-4">
              <span className="inline-block px-4 py-2 bg-secondary text-white rounded-button">
                Content may be outdated
              </span>
            </div>
          )}
        </div>

        {lesson.description && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Lesson Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-dark">{lesson.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {lesson.videoUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Video</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Button variant="primary" className="w-full">
                    Watch Video
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}

          {lesson.worksheetUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Worksheet</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={lesson.worksheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Button variant="secondary" className="w-full">
                    Download Worksheet
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}

          {lesson.presentationUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Presentation</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={lesson.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <Button variant="outline" className="w-full">
                    View Presentation
                  </Button>
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        {lesson.starterQuiz && lesson.starterQuiz.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Starter Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lesson.starterQuiz.map((quiz, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <p className="font-semibold text-text-dark mb-2">
                      {index + 1}. {quiz.question}
                    </p>
                    <ul className="space-y-1">
                      {quiz.answers.map((answer, answerIndex) => (
                        <li
                          key={answerIndex}
                          className={`text-sm ${
                            answerIndex === quiz.correctAnswer
                              ? 'text-primary font-semibold'
                              : 'text-text-light'
                          }`}
                        >
                          {String.fromCharCode(65 + answerIndex)}. {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {lesson.exitQuiz && lesson.exitQuiz.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Exit Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lesson.exitQuiz.map((quiz, index) => (
                  <div key={index} className="border-l-4 border-secondary pl-4">
                    <p className="font-semibold text-text-dark mb-2">
                      {index + 1}. {quiz.question}
                    </p>
                    <ul className="space-y-1">
                      {quiz.answers.map((answer, answerIndex) => (
                        <li
                          key={answerIndex}
                          className={`text-sm ${
                            answerIndex === quiz.correctAnswer
                              ? 'text-secondary font-semibold'
                              : 'text-text-light'
                          }`}
                        >
                          {String.fromCharCode(65 + answerIndex)}. {answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Link href={`/units/${lesson.unitSlug}`}>
            <Button variant="outline">Back to Unit</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
