import React from "react";
import { quizData } from "../quizData";
import QuizCard from "../QuizCard";
import SectionHeader from "@/components/Common/SectionHeader";
import Image from "next/image";

const QuizTests = () => {
  return (
    <section
      id="quiz-tests"
      className="relative z-1 overflow-hidden bg-gray-1 py-17.5 dark:bg-black dark:text-white lg:py-22.5 xl:py-27.5"
    >
      {/* Section Header */}
      <SectionHeader
        title="CÁC BÀI TRẮC NGHIỆM NGHỀ NGHIỆP"
        description="Lựa chọn bài trắc nghiệm phù hợp để khám phá bản thân và định hướng nghề nghiệp tương lai."
      />

      <div className="relative z-1 mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {/* Quiz Cards */}
          {quizData.map((quiz) => (
            <QuizCard key={quiz.id} data={quiz} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-[600px]">
            <h3 className="mb-4 text-2xl font-bold font-satoshi text-dark dark:text-white">
              Tại sao nên làm trắc nghiệm nghề nghiệp?
            </h3>
            <p className="mb-6 text-body dark:text-gray-5">
              Các bài trắc nghiệm này được xây dựng dựa trên những nghiên cứu
              khoa học uy tín, giúp bạn hiểu rõ hơn về bản thân và đưa ra những
              quyết định đúng đắn cho tương lai.
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mt-10">
              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-dark dark:text-white">
                  Tự nhận thức
                </h4>
                <p className="text-sm text-body dark:text-gray-5">
                  Hiểu rõ tính cách, điểm mạnh và sở thích của bản thân
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-dark dark:text-white">
                  Định hướng
                </h4>
                <p className="text-sm text-body dark:text-gray-5">
                  Tìm ra con đường nghề nghiệp phù hợp với năng lực
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="mb-2 font-semibold text-dark dark:text-white">
                  Phát triển
                </h4>
                <p className="text-sm text-body dark:text-gray-5">
                  Xây dựng kế hoạch học tập và phát triển cá nhân
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Background Shapes */}
        <div className="hidden sm:block">
          <div className="absolute left-0 top-1/2 -z-1 -translate-y-1/2">
            <Image
              src="/images/features/features-shape-01.svg"
              alt="shape"
              width={600}
              height={600}
            />
          </div>
          <div className="absolute right-0 top-1/2 -z-1 -translate-y-1/2">
            <Image
              src="/images/features/features-shape-02.svg"
              alt="shape"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizTests;
