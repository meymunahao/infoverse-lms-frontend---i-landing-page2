'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import type { QuizQuestion } from '@/types/oak-api.types';

interface QuizSectionProps {
  title: string;
  questions: QuizQuestion[];
  variant?: 'starter' | 'exit';
}

export function QuizSection({ title, questions, variant = 'starter' }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const borderColor = variant === 'starter' ? 'border-primary' : 'border-secondary';
  const accentColor = variant === 'starter' ? 'text-primary' : 'text-secondary';
  const bgColor = variant === 'starter' ? 'bg-primary' : 'bg-secondary';

  const handleSelectAnswer = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const handleCheckAnswers = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      const selectedIdx = selectedAnswers[index];
      if (selectedIdx !== undefined && q.answers[selectedIdx] && !q.answers[selectedIdx].distractor) {
        correct++;
      }
    });
    return correct;
  };

  if (!questions || questions.length === 0) return null;

  // Filter out explanatory-text questions as they're not answerable
  const answerableQuestions = questions.filter(q => q.questionType !== 'explanatory-text');

  if (answerableQuestions.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-full ${bgColor} text-white flex items-center justify-center text-sm font-bold`}>
            {answerableQuestions.length}
          </span>
          {title}
        </CardTitle>
        {showResults && (
          <div className={`text-lg font-semibold ${accentColor}`}>
            Score: {getScore()}/{answerableQuestions.length}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {answerableQuestions.map((question, qIndex) => {
            const selectedIdx = selectedAnswers[qIndex];

            return (
              <div key={qIndex} className={`border-l-4 ${borderColor} pl-4`}>
                <p className="font-semibold text-gray-900 mb-3">
                  {qIndex + 1}. {question.question || 'Question'}
                </p>

                {question.questionType === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.answers.map((answer, aIndex) => {
                      const isSelected = selectedIdx === aIndex;
                      const isCorrect = !answer.distractor;

                      let answerClasses = 'p-3 rounded-lg border cursor-pointer transition-all ';

                      if (showResults) {
                        if (isCorrect) {
                          answerClasses += 'bg-green-50 border-green-500 text-green-800';
                        } else if (isSelected && !isCorrect) {
                          answerClasses += 'bg-red-50 border-red-500 text-red-800';
                        } else {
                          answerClasses += 'bg-gray-50 border-gray-200 text-gray-600';
                        }
                      } else {
                        if (isSelected) {
                          answerClasses += `bg-primary/10 border-primary ${accentColor} font-medium`;
                        } else {
                          answerClasses += 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50';
                        }
                      }

                      return (
                        <div
                          key={aIndex}
                          className={answerClasses}
                          onClick={() => handleSelectAnswer(qIndex, aIndex)}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + aIndex)}.
                          </span>
                          {answer.content || ''}
                          {showResults && isCorrect && (
                            <span className="ml-2 text-green-600">&#10003;</span>
                          )}
                          {showResults && isSelected && !isCorrect && (
                            <span className="ml-2 text-red-600">&#10007;</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.questionType === 'order' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 mb-2">Put these in the correct order:</p>
                    {question.answers
                      .slice()
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map((answer, aIndex) => (
                        <div
                          key={aIndex}
                          className="p-3 rounded-lg border bg-gray-50 border-gray-200"
                        >
                          <span className="font-medium mr-2">{aIndex + 1}.</span>
                          {answer.content || ''}
                        </div>
                      ))}
                  </div>
                )}

                {question.questionType === 'match' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 mb-2">Match the items:</p>
                    {question.answers.map((answer, aIndex) => (
                      <div
                        key={aIndex}
                        className="p-3 rounded-lg border bg-gray-50 border-gray-200 flex items-center gap-4"
                      >
                        <span className="font-medium">{answer.matchOption?.content || ''}</span>
                        <span className="text-gray-400">→</span>
                        <span>{answer.correctChoice?.content || ''}</span>
                      </div>
                    ))}
                  </div>
                )}

                {question.questionType === 'short-answer' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Expected answer:</p>
                    {question.answers.filter(a => !a.distractor).map((answer, aIndex) => (
                      <div
                        key={aIndex}
                        className="p-3 rounded-lg border bg-green-50 border-green-200 text-green-800"
                      >
                        {answer.content || ''}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {answerableQuestions.some(q => q.questionType === 'multiple-choice') && (
          <div className="mt-6 flex gap-4">
            {!showResults ? (
              <Button
                onClick={handleCheckAnswers}
                disabled={Object.keys(selectedAnswers).length < answerableQuestions.filter(q => q.questionType === 'multiple-choice').length}
                className="w-full sm:w-auto"
              >
                Check Answers
              </Button>
            ) : (
              <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
                Try Again
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
