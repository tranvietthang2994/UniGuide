import Image from "next/image";
import React from "react";

const QuizHero = () => {
  return (
    <section className="relative z-1 overflow-hidden pb-17.5 pt-30 lg:pb-20 lg:pt-30 xl:pb-25 xl:pt-[170px]">
      <div className="mx-auto w-full max-w-[740px] px-4 text-center sm:px-8 xl:px-0">
        <h1 className="mb-5 font-satoshi text-heading-4 font-bold -tracking-[1.6px] text-black dark:text-white lg:text-heading-2 xl:text-[58px] xl:leading-[1.12]">
          Khám phá{" "}
          <span className="relative text-primary">
            bản thân
            <span className="absolute bottom-0.5 left-0 h-2 w-full pl-1 pr-2">
              <svg
                className="fill-current"
                width="106%"
                height="100%"
                viewBox="0 0 100 7"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M100 2.49998C100 1.50001 100 2.5 100 1.50001C64.2857 -0.240394 17.4603 3.99028 0 6.05927L0 2.05807C17.4603 0.641568 64.2857 0 100 2.49998Z"
                />
              </svg>
            </span>
          </span>{" "}
          Định hướng tương lai
        </h1>

        <p className="mx-auto mb-7.5 w-full max-w-[580px] text-lg -tracking-[0.2px] dark:text-gray-5">
          Tham gia các bài trắc nghiệm nghề nghiệp khoa học để hiểu rõ hơn về
          tính cách, sở thích và năng lực của bạn. Từ đó tìm ra ngành học và
          nghề nghiệp phù hợp nhất với bản thân.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-body dark:text-gray-5">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            100% miễn phí
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            Kết quả tức thời
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            Dựa trên nghiên cứu khoa học
          </span>
        </div>
      </div>

      {/* <!-- Hero Bg Shapes --> */}
      <div className="hidden sm:block">
        <div className="absolute left-0 top-0 -z-1">
          <Image
            src="/images/hero/hero-shape-01.svg"
            alt="shape"
            width={340}
            height={480}
          />
        </div>
        <div className="absolute right-0 top-0 -z-1">
          <Image
            src="/images/hero/hero-shape-02.svg"
            alt="shape"
            width={425}
            height={682}
          />
        </div>
      </div>
    </section>
  );
};

export default QuizHero;
