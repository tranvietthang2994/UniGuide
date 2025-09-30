"use client";

import { useState } from "react";
import BlogItem from "@/components/Blog/BlogItem";
import SectionHeader from "@/components/Common/SectionHeader";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, loading, error, total, totalPages } = useBlogPosts({
    limit: 6,
    page: currentPage,
  });

  return (
    <section
      className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5"
      id="blog"
    >
      {/* <!-- section title --> */}
      <SectionHeader
        title={"Các bài viết mới nhất"}
        description="Khám phá những bài viết hữu ích về giáo dục, mẹo học tập và công nghệ AI"
      />

      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        {loading ? (
          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">
              Không thể tải bài viết. Vui lòng thử lại sau.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
            {posts?.length > 0 ? (
              posts.map((item, key: number) => (
                <BlogItem blog={item} key={key} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Chưa có bài viết nào.</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && posts?.length > 0 && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* Previous button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Trước
              </button>

              {/* Page numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        currentPage === pageNum
                          ? "bg-primary text-white"
                          : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Sau
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Page info */}
            <div className="ml-6 text-sm text-gray-600 dark:text-gray-400">
              Trang {currentPage} / {totalPages} ({total} bài viết)
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
