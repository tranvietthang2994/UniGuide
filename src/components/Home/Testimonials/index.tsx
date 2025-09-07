"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { firstColumn, secondColumn, thirdColumn } from "./testmonialsData";

const Testimonials = () => {
  return (
    <section className="relative z-1 overflow-hidden bg-gray-1 py-17.5 dark:bg-black lg:py-22.5 xl:py-27.5">
      <div className="relative z-10 mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-stroke py-1 px-4 rounded-lg bg-white dark:bg-gray-dark dark:border-stroke-dark">
              <span className="font-satoshi text-sm font-medium text-primary">
                Đánh giá
              </span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-satoshi tracking-tighter mt-5 text-black dark:text-white text-center">
            Người dùng nói gì về chúng tôi
          </h2>
          <p className="text-center mt-5 opacity-75 font-satoshi text-body dark:text-gray-5">
            Khám phá những chia sẻ chân thực từ học sinh, sinh viên và phụ huynh
            về UniGuide.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
