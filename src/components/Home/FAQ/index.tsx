"use client";
import React, { useState } from "react";
import faqData from "./faqData";
import FaqItem from "./FaqItem";
import SectionHeader from "@/components/Common/SectionHeader";

const FAQ = () => {
  const [activeFaq, setActiveFaq] = useState<number | string>(1);

  const handleFaqToggle = (id: number | string) => {
    activeFaq === id ? setActiveFaq(0) : setActiveFaq(id);
  };

  return (
    <section className="overflow-hidden bg-gray-1 py-17.5 dark:bg-black lg:py-22.5 xl:py-27.5">
      {/* <!-- section title --> */}

      <SectionHeader
        title={"Những câu hỏi thường gặp"}
        description="UniGuide đồng hành cùng học sinh THPT khám phá bản thân, tìm ngành học phù hợp và tra cứu điểm chuẩn chính xác."
      />

      <div className="mx-auto w-full max-w-[662px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col gap-4 ">
          {/* <!-- Accordion Item --> */}
          {faqData?.map((faq, key) => (
            <FaqItem
              key={key}
              faq={faq}
              handleFaqToggle={handleFaqToggle}
              activeFaq={activeFaq}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
