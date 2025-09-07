import type { QuizTest } from "../quizData";
import Image from "next/image";
import Link from "next/link";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const QuizCard = ({ data }: { data: QuizTest }) => {
  return (
    <div className="relative min-h-[600px] list-none">
      <div className="relative h-full rounded-[15px] border-[0.75px] border-stroke p-2 dark:border-stroke-dark">
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={48}
          inactiveZone={0.1}
          borderWidth={3}
          movementDuration={1.5}
        />
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] bg-white shadow-1 hover:shadow-features dark:bg-gray-dark dark:border-stroke-dark dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          {/* Quiz Image */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={data.image}
              alt={`${data.title} - ${data.subtitle}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Quiz Badge */}
            <div className="absolute top-4 left-4">
              <div
                className={`rounded-full px-3 py-1 text-xs font-semibold ${data.bgColor} ${data.color} border ${data.borderColor} backdrop-blur-sm bg-opacity-90`}
              >
                {data.title}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <h3 className={`text-2xl font-bold font-satoshi ${data.color}`}>
                  {data.title}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {data.questions} câu
                </span>
              </div>
              <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {data.subtitle}
              </h4>
              <p className="text-sm text-body dark:text-gray-5 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6 flex-1">
              <h5 className="mb-3 text-sm font-semibold text-dark dark:text-white">
                Những gì bạn sẽ khám phá:
              </h5>
              <ul className="space-y-2">
                {data.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 rounded-full ${data.color.replace("text-", "bg-")}`}
                    ></span>
                    <span className="text-body dark:text-gray-5">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Duration and CTA */}
            <div className="mt-auto">
              <div className="mb-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {data.duration}
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {data.questions} câu hỏi
                </div>
              </div>

              <Link
                href={`/quiz/${data.title.toLowerCase()}`}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full ${data.bgColor} px-6 py-3 font-satoshi font-medium ${data.color} border ${data.borderColor} hover:opacity-90 transition-all duration-300 dark:bg-opacity-20 dark:border-opacity-30`}
              >
                <span>Bắt đầu trắc nghiệm</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
