import BlogItem from "@/components/Blog/BlogItem";
import SectionHeader from "@/components/Common/SectionHeader";
import { posts } from "./blogsData";

const Blog = async () => {
  // Sắp xếp theo ngày đăng mới nhất và lấy 6 bài đầu
  const latestPosts = posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

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
        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
          {/* <!-- blog item --> */}
          {latestPosts?.length > 0 ? (
            latestPosts.map((item, key: number) => <BlogItem blog={item} key={key} />)
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
