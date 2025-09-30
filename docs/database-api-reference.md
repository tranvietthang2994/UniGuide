# UniGuide Database & API Reference

## Mô tả tổng quan

UniGuide là hệ thống hỗ trợ tư vấn tuyển sinh đại học sử dụng Supabase làm backend. Database được thiết kế để quản lý thông tin người dùng, trường đại học, ngành học, điểm chuẩn, đánh giá và bài viết.

## Cấu hình Supabase

```javascript
// services/supabase.js
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://vtesitzsuisfgpchlsuz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
```

## Database Schema

### 1. Bảng `user` - Thông tin người dùng

```sql
-- Cấu trúc bảng
id: BIGINT (Primary Key, Auto-increment)
email: VARCHAR(50) UNIQUE NOT NULL
password_hash: VARCHAR(100) NOT NULL
fullname: VARCHAR(50) NOT NULL
grade: INT NOT NULL              -- Lớp học
city: VARCHAR(50) NOT NULL       -- Thành phố
school_name: VARCHAR(100)        -- Tên trường
phone: VARCHAR(20)
created_at: TIMESTAMPTZ DEFAULT now()
updated_at: TIMESTAMPTZ          -- Tự động cập nhật qua trigger
```

**API Examples:**

```javascript
// Lấy thông tin user theo ID
let { data: user, error } = await supabase
  .from("user")
  .select("*")
  .eq("id", userId);

// Tạo user mới
let { data, error } = await supabase.from("user").insert([
  {
    email: "user@example.com",
    password_hash: "hashed_password",
    fullname: "Nguyễn Văn A",
    grade: 12,
    city: "Hà Nội",
    school_name: "THPT ABC",
  },
]);

// Cập nhật thông tin user
let { data, error } = await supabase
  .from("user")
  .update({ phone: "0123456789" })
  .eq("id", userId);
```

### 2. Bảng `university` - Thông tin trường đại học

```sql
-- Cấu trúc bảng
id: BIGINT (Primary Key, Auto-increment)
name: VARCHAR(100) NOT NULL
short_name: VARCHAR(10) UNIQUE
university_type: INT NOT NULL    -- 1: Public, 2: Private, 3: International
logo_url: VARCHAR(200)
banner_url: VARCHAR(200)
founded_year: INT
address: VARCHAR(500)
website: VARCHAR(200)
hotline: VARCHAR(15)
overview: TEXT
priority: INT
region: INT                      -- 1: North, 2: Central, 3: South
rating: REAL
location_latitude: DOUBLE PRECISION
location_longitude: DOUBLE PRECISION
domestic_ranking: VARCHAR(50)
international_ranking: VARCHAR(50)
employment_rate: VARCHAR(50)
tuition_fee: VARCHAR(100)
dormitory_info: VARCHAR(100)
library_info: VARCHAR(100)
lab_info: VARCHAR(100)
created_at: TIMESTAMPTZ DEFAULT now()
updated_at: TIMESTAMPTZ
```

**API Examples:**

```javascript
// Lấy tất cả trường đại học
let { data: universities, error } = await supabase
  .from("university")
  .select("*");

// Lấy trường theo region
let { data: universities, error } = await supabase
  .from("university")
  .select("*")
  .eq("region", 1); // 1: North, 2: Central, 3: South

// Lấy trường theo loại
let { data: universities, error } = await supabase
  .from("university")
  .select("*")
  .eq("university_type", 1); // 1: Public, 2: Private, 3: International

// Tìm kiếm trường theo tên
let { data: universities, error } = await supabase
  .from("university")
  .select("*")
  .ilike("name", "%bách khoa%");

// Lấy trường với thông tin chi tiết
let { data: university, error } = await supabase
  .from("university")
  .select(
    `
    *,
    university_training_level(training_level),
    partner_company(company_name),
    internship_program(program_name)
  `
  )
  .eq("id", universityId)
  .single();
```

### 3. Bảng `university_training_level` - Bậc đào tạo

```sql
university_id: BIGINT (Foreign Key -> university.id)
training_level: INT              -- 1: University, 2: Graduate, 3: InternationalLinkage
-- Composite Primary Key (university_id, training_level)
```

**API Examples:**

```javascript
// Lấy bậc đào tạo của trường
let { data: levels, error } = await supabase
  .from("university_training_level")
  .select("training_level")
  .eq("university_id", universityId);

// Thêm bậc đào tạo cho trường
let { data, error } = await supabase.from("university_training_level").insert([
  { university_id: 1, training_level: 1 },
  { university_id: 1, training_level: 2 },
]);
```

### 4. Bảng `partner_company` - Đối tác doanh nghiệp

```sql
university_id: BIGINT (Foreign Key -> university.id)
company_name: VARCHAR(100) NOT NULL
-- Composite Primary Key (university_id, company_name)
```

**API Examples:**

```javascript
// Lấy danh sách đối tác của trường
let { data: partners, error } = await supabase
  .from("partner_company")
  .select("company_name")
  .eq("university_id", universityId);
```

### 5. Bảng `internship_program` - Chương trình thực tập

```sql
university_id: BIGINT (Foreign Key -> university.id)
program_name: VARCHAR(100) NOT NULL
-- Composite Primary Key (university_id, program_name)
```

**API Examples:**

```javascript
// Lấy chương trình thực tập của trường
let { data: programs, error } = await supabase
  .from("internship_program")
  .select("program_name")
  .eq("university_id", universityId);
```

### 6. Bảng `major` - Ngành học

```sql
id: BIGINT (Primary Key, Auto-increment)
university_id: BIGINT (Foreign Key -> university.id)
name: VARCHAR(100) NOT NULL
faculty: VARCHAR(100)           -- Khoa
```

**API Examples:**

```javascript
// Lấy ngành theo trường
let { data: majors, error } = await supabase
  .from("major")
  .select("*")
  .eq("university_id", universityId);

// Lấy ngành với thông tin điểm chuẩn
let { data: majors, error } = await supabase
  .from("major")
  .select(
    `
    *,
    admission_score(*)
  `
  )
  .eq("university_id", universityId);

// Tìm kiếm ngành theo tên
let { data: majors, error } = await supabase
  .from("major")
  .select("*, university(name)")
  .ilike("name", "%công nghệ thông tin%");
```

### 7. Bảng `admission_score` - Điểm chuẩn

```sql
id: BIGINT (Primary Key, Auto-increment)
major_id: BIGINT (Foreign Key -> major.id)
admission_block: VARCHAR(5) NOT NULL  -- Khối thi (A00, A01, D01, ...)
year: INT NOT NULL
score: REAL                           -- Điểm chuẩn
quota: INT                            -- Chỉ tiêu
-- UNIQUE (major_id, year, admission_block)
```

**API Examples:**

```javascript
// Lấy điểm chuẩn theo ngành và năm
let { data: scores, error } = await supabase
  .from("admission_score")
  .select("*")
  .eq("major_id", majorId)
  .eq("year", 2024);

// Lấy điểm chuẩn với thông tin ngành và trường
let { data: scores, error } = await supabase
  .from("admission_score")
  .select(
    `
    *,
    major(name, university(name))
  `
  )
  .eq("year", 2024)
  .order("score", { ascending: false });

// Tìm ngành có điểm chuẩn phù hợp
let { data: scores, error } = await supabase
  .from("admission_score")
  .select(
    `
    *,
    major(name, university(name))
  `
  )
  .gte("score", 20)
  .lte("score", 25)
  .eq("year", 2024);
```

### 8. Bảng `review` - Đánh giá trường

```sql
id: BIGINT (Primary Key, Auto-increment)
university_id: BIGINT (Foreign Key -> university.id)
user_id: BIGINT (Foreign Key -> user.id)
rating: REAL NOT NULL CHECK (rating >= 1 AND rating <= 5)
comment: VARCHAR(500)
created_at: TIMESTAMPTZ DEFAULT now()
-- UNIQUE (university_id, user_id) -- Mỗi user chỉ review 1 trường 1 lần
```

**API Examples:**

```javascript
// Lấy đánh giá của trường
let { data: reviews, error } = await supabase
  .from("review")
  .select(
    `
    *,
    user(fullname)
  `
  )
  .eq("university_id", universityId)
  .order("created_at", { ascending: false });

// Tạo đánh giá mới
let { data, error } = await supabase.from("review").insert([
  {
    university_id: universityId,
    user_id: userId,
    rating: 4.5,
    comment: "Trường rất tốt, giảng viên nhiệt tình",
  },
]);

// Tính rating trung bình của trường
let { data: avgRating, error } = await supabase
  .from("review")
  .select("rating")
  .eq("university_id", universityId);

// Cập nhật rating trung bình vào bảng university
const average =
  avgRating.reduce((sum, r) => sum + r.rating, 0) / avgRating.length;
let { data, error } = await supabase
  .from("university")
  .update({ rating: average })
  .eq("id", universityId);
```

### 9. Bảng `consult_info` - Thông tin tư vấn

```sql
id: BIGINT (Primary Key, Auto-increment)
university_id: BIGINT (Foreign Key -> university.id)
user_id: BIGINT (Foreign Key -> user.id)
created_at: TIMESTAMPTZ DEFAULT now()
-- UNIQUE (university_id, user_id) -- Mỗi user chỉ quan tâm 1 trường 1 lần
```

**API Examples:**

```javascript
// Lấy danh sách trường user quan tâm
let { data: interests, error } = await supabase
  .from("consult_info")
  .select(
    `
    *,
    university(name, logo_url)
  `
  )
  .eq("user_id", userId);

// Thêm trường vào danh sách quan tâm
let { data, error } = await supabase.from("consult_info").insert([
  {
    university_id: universityId,
    user_id: userId,
  },
]);

// Xóa trường khỏi danh sách quan tâm
let { error } = await supabase
  .from("consult_info")
  .delete()
  .eq("university_id", universityId)
  .eq("user_id", userId);
```

### 10. Bảng `posts` - Bài viết

```sql
id: BIGINT (Primary Key, Auto-increment)
title: VARCHAR(200) NOT NULL
slug: VARCHAR(200) UNIQUE NOT NULL
content: TEXT NOT NULL
thumbnail_url: VARCHAR(200)
author: VARCHAR(200) NOT NULL
university_id: BIGINT (Foreign Key -> university.id, NULL khi xóa trường)
category: VARCHAR(100)
status: INT NOT NULL DEFAULT 1    -- 1: Draft, 2: Published, 3: Archived
published_at: TIMESTAMPTZ
created_at: TIMESTAMPTZ DEFAULT now()
updated_at: TIMESTAMPTZ
```

**API Examples:**

```javascript
// Lấy bài viết đã published
let { data: posts, error } = await supabase
  .from("posts")
  .select(
    `
    *,
    university(name)
  `
  )
  .eq("status", 2)
  .order("published_at", { ascending: false });

// Lấy bài viết theo slug
let { data: post, error } = await supabase
  .from("posts")
  .select(
    `
    *,
    university(name, logo_url)
  `
  )
  .eq("slug", slug)
  .single();

// Lấy bài viết theo category
let { data: posts, error } = await supabase
  .from("posts")
  .select("*")
  .eq("category", "tuyển sinh")
  .eq("status", 2);

// Tìm kiếm bài viết
let { data: posts, error } = await supabase
  .from("posts")
  .select("*")
  .ilike("title", "%tuyển sinh%")
  .eq("status", 2);
```

## Các Query phức tạp thường dùng

### 1. Tìm kiếm trường đại học với filter

```javascript
async function searchUniversities(filters) {
  let query = supabase.from("university").select(`
      *,
      university_training_level(training_level),
      review(rating)
    `);

  if (filters.region) {
    query = query.eq("region", filters.region);
  }

  if (filters.university_type) {
    query = query.eq("university_type", filters.university_type);
  }

  if (filters.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  const { data, error } = await query;
  return { data, error };
}
```

### 2. Lấy thông tin chi tiết trường với tất cả quan hệ

```javascript
async function getUniversityDetails(universityId) {
  const { data, error } = await supabase
    .from("university")
    .select(
      `
      *,
      university_training_level(training_level),
      partner_company(company_name),
      internship_program(program_name),
      major(
        id,
        name,
        faculty,
        admission_score(
          admission_block,
          year,
          score,
          quota
        )
      ),
      review(
        rating,
        comment,
        created_at,
        user(fullname)
      )
    `
    )
    .eq("id", universityId)
    .single();

  return { data, error };
}
```

### 3. Tìm ngành học phù hợp với điểm số

```javascript
async function findSuitableMajors(userScore, year = 2024) {
  const { data, error } = await supabase
    .from("admission_score")
    .select(
      `
      *,
      major(
        name,
        faculty,
        university(name, region, university_type)
      )
    `
    )
    .lte("score", userScore)
    .eq("year", year)
    .order("score", { ascending: false })
    .limit(50);

  return { data, error };
}
```

### 4. Thống kê dashboard

```javascript
async function getDashboardStats() {
  const [
    { count: totalUniversities },
    { count: totalMajors },
    { count: totalUsers },
    { count: totalReviews },
  ] = await Promise.all([
    supabase.from("university").select("*", { count: "exact", head: true }),
    supabase.from("major").select("*", { count: "exact", head: true }),
    supabase.from("user").select("*", { count: "exact", head: true }),
    supabase.from("review").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalUniversities,
    totalMajors,
    totalUsers,
    totalReviews,
  };
}
```

## Enum Values Reference

### university_type

- `1`: Public (Công lập)
- `2`: Private (Tư thục)
- `3`: International (Quốc tế)

### region

- `1`: North (Miền Bắc)
- `2`: Central (Miền Trung)
- `3`: South (Miền Nam)

### training_level

- `1`: University (Đại học)
- `2`: Graduate (Sau đại học)
- `3`: InternationalLinkage (Liên kết quốc tế)

### posts.status

- `1`: Draft (Bản nháp)
- `2`: Published (Đã xuất bản)
- `3`: Archived (Lưu trữ)

## Lưu ý quan trọng

1. **Auto-update timestamps**: Các bảng có trigger tự động cập nhật `updated_at`
2. **Cascading deletes**: Xóa university sẽ xóa tất cả dữ liệu liên quan
3. **Unique constraints**: Một user chỉ có thể review/quan tâm một trường một lần
4. **Data validation**: Rating phải từ 1-5, các enum phải đúng giá trị
5. **Indexing**: Các trường thường query nên có index (region, university_type, year, etc.)

## Error Handling

```javascript
// Pattern xử lý lỗi chuẩn
async function handleSupabaseOperation() {
  try {
    const { data, error } = await supabase.from("table_name").select("*");

    if (error) {
      console.error("Supabase error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Operation failed:", err);
    throw err;
  }
}
```

---

# Một số dữ liệu ví dụ của các table (ở database sẽ đầy đủ hơn) ---

-- 1) NGƯỜI DÙNG
INSERT INTO "public"."user" ("email", "password_hash", "fullname", "grade", "city", "school_name", "phone") VALUES
('user1@example.com', '$2b$10$samplehash1', 'Nguyễn Văn A', 12, 'Hà Nội', 'THPT Chu Văn An', '0901234567'),
('user2@example.com', '$2b$10$samplehash2', 'Trần Thị B', 12, 'TP.HCM', 'THPT Lê Hồng Phong', '0902345678'),
('user3@example.com', '$2b$10$samplehash3', 'Lê Quang C', 12, 'Đà Nẵng', 'THPT Phan Châu Trinh', '0903456789'),
('user4@example.com', '$2b$10$samplehash4', 'Phạm Thị D', 12, 'Cần Thơ', 'THPT Châu Văn Liêm', '0904567890'),
('user5@example.com', '$2b$10$samplehash5', 'Hoàng Minh E', 12, 'Hải Phòng', 'THPT Trần Phú', '0905678901');

-- 2) ĐẠI HỌC - 40 trường (dữ liệu chính xác từ bảng xếp hạng 2025: VNUR, QS Asia, v.v.)
-- Khu vực: 1=Miền Bắc, 2=Miền Trung, 3=Miền Nam; Loại: 1=Công lập, 2=Tư thục, 3=Quốc tế
-- Học phí: Từ thông báo 2025 (15-40 triệu VND/năm trung bình); Xếp hạng từ QS/CWUR 2025
-- Vĩ độ/Kinh độ: Từ dữ liệu địa lý; Ưu tiên: 1-3 dựa trên ưu tiên tuyển sinh
INSERT INTO "public"."university" (
"name", "short_name", "university_type", "logo_url", "banner_url", "founded_year", "address", "website", "hotline", "overview",
"priority", "region", "rating", "location_latitude", "location_longitude", "domestic_ranking", "international_ranking", "employment_rate",
"tuition_fee", "dormitory_info", "library_info", "lab_info"
) VALUES
-- MIỀN BẮC (15)
('Đại học Quốc gia Hà Nội', 'VNU', 1, 'https://example.com/logo/vnu.png', 'https://example.com/banner/vnu.jpg', 1945, '144 Xuân Thủy, Cầu Giấy, Hà Nội', 'https://vnu.edu.vn', '+84-24-37548020', 'Đại học quốc gia hàng đầu với các chương trình đa ngành và tập trung nghiên cứu.', 1, 1, 4.8, 21.0365, 105.7830, 'Top 1 VN', 'QS Asia 161', '~96%', '15-30 triệu/năm', 'Có KTX lớn', 'Thư viện trung tâm VNU', 'PTN nghiên cứu đa ngành'),
('Đại học Bách khoa Hà Nội', 'HUST', 1, 'https://example.com/logo/hust.png', 'https://example.com/banner/hust.jpg', 1956, '1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội', 'https://hust.edu.vn', '+84-24-38694242', 'Đại học kỹ thuật hàng đầu chuyên về kỹ thuật và công nghệ.', 1, 1, 4.6, 21.0048, 105.8431, 'Top 3 VN', 'QS Asia 201-250', '~95%', '20-28 triệu/năm', 'Có KTX', 'Thư viện Tạ Quang Bửu', 'PTN kỹ thuật cao cấp'),
('Đại học Kinh tế Quốc dân', 'NEU', 1, 'https://example.com/logo/neu.png', 'https://example.com/banner/neu.jpg', 1956, '207 Giải Phóng, Hai Bà Trưng, Hà Nội', 'https://neu.edu.vn', '+84-24-36280280', 'Trường kinh tế và kinh doanh hàng đầu với mối quan hệ quốc tế mạnh mẽ.', 1, 1, 4.5, 20.9994, 105.8434, 'Top 4 VN', 'QS Asia 251-300', '~94%', '22-30 triệu/năm', 'Có KTX', 'Thư viện NEU', 'Phòng mô phỏng kinh tế'),
('Đại học Ngoại thương', 'FTU', 1, 'https://example.com/logo/ftu.png', 'https://example.com/banner/ftu.jpg', 1960, '91 Chùa Láng, Đống Đa, Hà Nội', 'https://ftu.edu.vn', '+84-24-32595160', 'Hàng đầu trong thương mại quốc tế, kinh tế và quản trị kinh doanh.', 1, 1, 4.5, 21.0220, 105.8067, 'Top 7 VN', 'QS Asia 301-350', '~95%', '25-35 triệu/năm', 'KTX nội khu', 'Thư viện FTU', 'Phòng mô phỏng thương mại'),
('Đại học Y Hà Nội', 'HMU', 1, 'https://example.com/logo/hmu.png', 'https://example.com/banner/hmu.jpg', 1902, '1 Tôn Thất Tùng, Đống Đa, Hà Nội', 'https://hmu.edu.vn', '+84-24-38523798', 'Trường y hàng đầu Việt Nam với đào tạo y tế tiên tiến.', 2, 1, 4.8, 21.0045, 105.8311, 'Top 5 VN', 'QS Asia 451-500', '~96%', '30-45 triệu/năm', 'Có KTX', 'Thư viện Y Hà Nội', 'PTN y sinh hiện đại'),
('Đại học Sư phạm Hà Nội', 'HNUE', 1, 'https://example.com/logo/hnue.png', 'https://example.com/banner/hnue.jpg', 1951, '136 Xuân Thủy, Cầu Giấy, Hà Nội', 'https://hnue.edu.vn', '+84-24-37547823', 'Đại học đào tạo giáo viên hàng đầu miền Bắc Việt Nam.', 1, 1, 4.3, 21.0360, 105.7825, 'Top 9 VN', 'N/A', '~92%', '12-20 triệu/năm', 'Có KTX', 'Thư viện HNUE', 'Phòng thí nghiệm giáo dục'),
('Đại học Xây dựng Hà Nội', 'HUCE', 1, 'https://example.com/logo/huce.png', 'https://example.com/banner/huce.jpg', 1966, '55 Giải Phóng, Hai Bà Trưng, Hà Nội', 'https://huce.edu.vn', '+84-24-38632214', 'Chuyên về kỹ thuật xây dựng và xây dựng.', 1, 1, 4.2, 20.9979, 105.8467, 'Top 10 VN', 'N/A', '~90%', '18-26 triệu/năm', 'Có KTX', 'Thư viện HUCE', 'PTN vật liệu xây dựng'),
('Đại học Giao thông Vận tải', 'UTC', 1, 'https://example.com/logo/utc.png', 'https://example.com/banner/utc.jpg', 1945, '3 Cầu Giấy, Đống Đa, Hà Nội', 'https://utc.edu.vn', '+84-24-37663311', 'Tập trung vào kỹ thuật giao thông và logistics.', 1, 1, 4.1, 21.0262, 105.8129, 'Top 12 VN', 'N/A', '~89%', '16-24 triệu/năm', 'Có KTX', 'Thư viện UTC', 'PTN giao thông'),
('Đại học Dược Hà Nội', 'HUP', 1, 'https://example.com/logo/hup.png', 'https://example.com/banner/hup.jpg', 1961, '13-15 Lê Thánh Tông, Hoàn Kiếm, Hà Nội', 'https://hup.edu.vn', '+84-24-38254539', 'Cơ sở giáo dục và nghiên cứu dược phẩm hàng đầu.', 1, 1, 4.6, 21.0254, 105.8540, 'Top 6 VN', 'QS Asia 451-500', '~96%', '28-40 triệu/năm', 'Có KTX', 'Thư viện Dược', 'PTN dược phẩm');

-- 3) CẤP ĐÀO TẠO CỦA ĐẠI HỌC - Tất cả đại học có cấp 1 (Đại học)
INSERT INTO "public"."university_training_level" ("university_id", "training_level") VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1), (18, 1), (19, 1), (20, 1),
(21, 1), (22, 1), (23, 1), (24, 1), (25, 1), (26, 1), (27, 1), (28, 1), (29, 1), (30, 1),
(31, 1), (32, 1), (33, 1), (34, 1), (35, 1), (36, 1), (37, 1), (38, 1), (39, 1), (40, 1);

-- 4) CÔNG TY ĐỐI TÁC - 2/trường (80 tổng cộng)
INSERT INTO "public"."partner_company" ("university_id", "company_name") VALUES
(1, 'Google'), (1, 'Microsoft'),
(2, 'Samsung'), (2, 'Intel'),
(3, 'VinGroup'), (3, 'FPT'),
(4, 'HSBC'), (4, 'Vietcombank'),
(5, 'Bệnh viện VinGroup'), (5, 'Medlatec'),
(6, 'Pearson Education'), (6, 'Oxford Press'),
(7, 'Tập đoàn Hòa Phát'), (7, 'VinGroup'),
(8, 'Vietnam Airlines'), (8, 'Viettel'),
(9, 'Bệnh viện Việt Đức'), (9, 'PharmaGroup'),

-- 5) CHƯƠNG TRÌNH THỰC TẬP - 1/trường (40 tổng cộng)
INSERT INTO "public"."internship_program" ("university_id", "program_name") VALUES
(1, 'Thực tập công nghệ mùa hè'), (2, 'Chương trình thực tập kỹ thuật'), (3, 'Thực tập kinh doanh'), (4, 'Thực tập thương mại quốc tế'),
(5, 'Chương trình thực tập y khoa'), (6, 'Chương trình đào tạo giáo viên'), (7, 'Thực tập xây dựng'), (8, 'Chương trình logistics giao thông'),
(9, 'Thực tập dược phẩm'), (10, 'Thực tập viễn thông'), (11, 'Thực tập ngân hàng'), (12, 'Thực tập tài chính'),
(13, 'Thực tập pháp lý'), (14, 'Thực tập kiến trúc'), (15, 'Thực tập thương mại'), (16, 'Thực tập CNTT'),
(17, 'Thực tập kỹ thuật'), (18, 'Thực tập kinh tế'), (19, 'Thực tập giáo dục'), (20, 'Chương trình đào tạo kỹ thuật'),
(21, 'Chương trình hợp tác CNTT'), (22, 'Thực tập đa ngành'), (23, 'Thực tập khoa học biển'), (24, 'Thực tập du lịch'),
(25, 'Thực tập kinh doanh'), (26, 'Thực tập nghiên cứu'), (27, 'Thực tập công nghệ'), (28, 'Thực tập kỹ thuật'),
(29, 'Thực tập khoa học'), (30, 'Thực tập giáo dục'), (31, 'Thực tập đa ngành'), (32, 'Thực tập kinh doanh'),
(33, 'Thực tập kỹ thuật'), (34, 'Thực tập khoa học'), (35, 'Thực tập nhân văn'), (36, 'Thực tập chương trình quốc tế'),
(37, 'Thực tập CNTT'), (38, 'Thực tập kinh tế - luật'), (39, 'Thực tập giáo dục'), (40, 'Thực tập tài chính');

-- 6) NGÀNH HỌC - 5/trường (200 tổng cộng)
INSERT INTO "public"."major" ("university_id", "name", "faculty") VALUES
-- VNU (1)
(1, 'Khoa học máy tính', 'CNTT'), (1, 'Kinh tế', 'Kinh tế'), (1, 'Luật', 'Luật'), (1, 'Kỹ thuật', 'Kỹ thuật'), (1, 'Giáo dục', 'Giáo dục'),
-- HUST (2)
(2, 'Kỹ thuật cơ khí', 'Kỹ thuật'), (2, 'Kỹ thuật điện', 'Kỹ thuật'), (2, 'Khoa học máy tính', 'CNTT'), (2, 'Kỹ thuật hóa học', 'Kỹ thuật'), (2, 'Tự động hóa', 'Kỹ thuật'),
-- NEU (3)
(3, 'Kinh tế', 'Kinh tế'), (3, 'Quản trị kinh doanh', 'Kinh doanh'), (3, 'Tài chính', 'Tài chính'), (3, 'Marketing', 'Marketing'), (3, 'Kế toán', 'Kế toán'),
-- FTU (4)
(4, 'Thương mại quốc tế', 'Kinh doanh'), (4, 'Tài chính', 'Tài chính'), (4, 'Quản trị kinh doanh', 'Kinh doanh'), (4, 'Kinh tế', 'Kinh tế'), (4, 'Logistics', 'Kinh doanh'),
-- HMU (5)
(5, 'Y học', 'Y học'), (5, 'Dược phẩm', 'Dược'), (5, 'Điều dưỡng', 'Y học'), (5, 'Răng hàm mặt', 'Y học'), (5, 'Sức khỏe cộng đồng', 'Y học'),
-- HNUE (6)
(6, 'Giáo dục', 'Giáo dục'), (6, 'Giáo dục toán học', 'Giáo dục'), (6, 'Giáo dục vật lý', 'Giáo dục'), (6, 'Giáo dục văn học', 'Giáo dục'), (6, 'Giáo dục tiếng Anh', 'Giáo dục'),
-- HUCE (7)
(7, 'Kỹ thuật xây dựng', 'Kỹ thuật'), (7, 'Quản lý xây dựng', 'Kỹ thuật'), (7, 'Kiến trúc', 'Kiến trúc'), (7, 'Kỹ thuật kết cấu', 'Kỹ thuật'), (7, 'Kỹ thuật địa kỹ thuật', 'Kỹ thuật'),
-- UTC (8)
(8, 'Kỹ thuật giao thông', 'Kỹ thuật'), (8, 'Logistics', 'Kinh doanh'), (8, 'Kỹ thuật xây dựng', 'Kỹ thuật'), (8, 'Kỹ thuật cơ khí', 'Kỹ thuật'), (8, 'CNTT', 'CNTT'),
-- HUP (9)
(9, 'Dược phẩm', 'Dược'), (9, 'Công nghệ dược', 'Dược'), (9, 'Dược lâm sàng', 'Dược'), (9, 'Dược lý', 'Dược'), (9, 'Sinh y học', 'Y học'),
-- PTIT (10)
(10, 'Viễn thông', 'CNTT'), (10, 'Khoa học máy tính', 'CNTT'), (10, 'Bảo mật mạng', 'CNTT'), (10, 'Kỹ thuật phần mềm', 'CNTT'), (10, 'Khoa học dữ liệu', 'CNTT'),
-- HVNH (11)
(11, 'Ngân hàng', 'Tài chính'), (11, 'Tài chính', 'Tài chính'), (11, 'Kế toán', 'Kế toán'), (11, 'Quản trị kinh doanh', 'Kinh doanh'), (11, 'Fintech', 'Tài chính'),
-- HVTC (12)
(12, 'Tài chính', 'Tài chính'), (12, 'Kế toán', 'Kế toán'), (12, 'Kiểm toán', 'Kế toán'), (12, 'Thuế', 'Tài chính'), (12, 'Tài chính doanh nghiệp', 'Tài chính'),
-- HLU (13)
(13, 'Luật', 'Luật'), (13, 'Luật quốc tế', 'Luật'), (13, 'Luật kinh doanh', 'Luật'), (13, 'Luật hình sự', 'Luật'), (13, 'Luật dân sự', 'Luật'),
-- HAU (14)
(14, 'Kiến trúc', 'Kiến trúc'), (14, 'Quy hoạch đô thị', 'Kiến trúc'), (14, 'Thiết kế nội thất', 'Kiến trúc'), (14, 'Quản lý xây dựng', 'Kỹ thuật'), (14, 'Kiến trúc cảnh quan', 'Kiến trúc');

-- 8) ĐÁNH GIÁ - 2/trường (80 tổng cộng)
INSERT INTO "public"."review" ("university_id", "user_id", "comment", "rating", "created_at") VALUES
(1, 1, 'Trường rất tốt, cơ sở vật chất hiện đại.', 4.8, '2025-09-01 10:00:00+07'),
(1, 2, 'Môi trường học tập chuyên nghiệp, giảng viên tận tâm.', 4.7, '2025-09-02 14:30:00+07'),
(2, 3, 'Cơ sở vật chất tốt, nhưng học phí hơi cao.', 4.5, '2025-09-03 09:15:00+07'),
(2, 4, 'Chương trình đào tạo chất lượng cao.', 4.6, '2025-09-04 11:00:00+07'),
(3, 5, 'Trường kinh tế hàng đầu, cơ hội việc làm tốt.', 4.4, '2025-09-05 13:45:00+07'),
(3, 1, 'Môi trường học tập năng động.', 4.5, '2025-09-06 15:20:00+07'),
(4, 2, 'Thương mại quốc tế rất mạnh, hỗ trợ việc làm tốt.', 4.6, '2025-09-07 10:30:00+07'),
(4, 3, 'Giảng viên nhiệt tình, chương trình quốc tế hóa.', 4.5, '2025-09-08 12:00:00+07'),
(5, 4, 'Trường y hàng đầu, trang thiết bị hiện đại.', 4.8, '2025-09-09 14:15:00+07'),
(5, 5, 'Đào tạo y khoa chất lượng, nhưng học phí cao.', 4.7, '2025-09-10 16:00:00+07'),
(6, 1, 'Trường sư phạm tốt, hỗ trợ giáo viên trẻ.', 4.2, '2025-09-11 09:30:00+07'),
(6, 2, 'Cơ sở vật chất ổn, cần cải thiện thêm.', 4.3, '2025-09-12 11:15:00+07'),
(7, 3, 'Chương trình xây dựng chất lượng, thực hành tốt.', 4.1, '2025-09-13 13:00:00+07'),
(7, 4, 'Trường tốt cho ngành kỹ thuật.', 4.2, '2025-09-14 15:45:00+07'),
(8, 5, 'Giao thông vận tải học tập thực tế tốt.', 4.0, '2025-09-15 10:00:00+07'),
(8, 1, 'Môi trường học tập ổn, cần nâng cấp.', 4.1, '2025-09-16 12:30:00+07'),
(9, 2, 'Dược phẩm chất lượng cao, thực hành tốt.', 4.5, '2025-09-17 14:15:00+07'),
(9, 3, 'Trường dược nổi tiếng, hỗ trợ việc làm tốt.', 4.6, '2025-09-18 16:00:00+07'),
(10, 4, 'Viễn thông học tập thực tế, cơ hội nghề nghiệp cao.', 4.2, '2025-09-19 09:30:00+07'),
(10, 5, 'Chương trình CNTT tốt, cần cải thiện cơ sở.', 4.3, '2025-09-20 11:15:00+07');

-- 9) THÔNG TIN TƯ VẤN - (Dữ liệu mẫu, có thể mở rộng sau)
INSERT INTO "public"."consult_info" ("user_id", "university_id", "created_at") VALUES
(1, 1, '2025-09-15 10:00:00+07'),
(2, 2, '2025-09-16 14:30:00+07'),
(3, 3, '2025-09-17 09:15:00+07'),
(4, 4,'2025-09-18 11:00:00+07'),
(5, 5, '2025-09-19 13:45:00+07');

-- 10) BÀI ĐĂNG (Dữ liệu mẫu, có thể mở rộng sau)
INSERT INTO "public"."posts" ("title", "slug", "content", "thumbnail_url", "author", "university_id", "category", "status", "published_at") VALUES
('Top 10 Universities in Vietnam 2025', 'top-10-unis-2025', 'Overview of leading universities based on QS rankings.', 'https://example.com/thumb1.jpg', 'Admin', NULL, 'Education', 2, '2025-09-01T10:00:00Z'),
('Admission Tips for Northern Universities', 'admission-north-2025', 'Guide for applying to Hanoi universities.', 'https://example.com/thumb2.jpg', 'Admin', 1, 'Admission', 2, '2025-09-02T10:00:00Z'),
('Why Study Engineering at HUST?', 'hust-engineering-2025', 'Explore engineering programs at HUST.', 'https://example.com/thumb3.jpg', 'Admin', 2, 'Programs', 2, '2025-09-03T10:00:00Z'),
('Medical Training at HMU', 'hmu-medical-2025', 'Insights into medical programs at Hanoi Medical University.', 'https://example.com/thumb4.jpg', 'Admin', 5, 'Programs', 2, '2025-09-04T10:00:00Z'),
('Central Vietnam University Guide', 'central-uni-guide-2025', 'Overview of top universities in Central Vietnam.', 'https://example.com/thumb5.jpg', 'Admin', 16, 'Education', 2, '2025-09-05T10:00:00Z'),
('Duy Tan University’s International Programs', 'dtu-international-2025', 'Details on DTU’s global partnerships.', 'https://example.com/thumb6.jpg', 'Admin', 16, 'Programs', 2, '2025-09-06T10:00:00Z'),
('Southern Universities Tuition Update', 'tuition-south-2025', '2025 fee changes in HCM universities.', 'https://example.com/thumb7.jpg', 'Admin', 26, 'Tuition', 2, '2025-09-07T10:00:00Z'),
('VNU-HCM: A Research Hub', 'vnuhcm-research-2025', 'Explore research opportunities at VNU-HCM.', 'https://example.com/thumb8.jpg', 'Admin', 26, 'Research', 2, '2025-09-08T10:00:00Z'),
('IT Careers with UIT', 'uit-it-careers-2025', 'Why choose IT programs at UIT?', 'https://example.com/thumb9.jpg', 'Admin', 32, 'Programs', 2, '2025-09-09T10:00:00Z'),
('Tips for Law Students at HCMULAW', 'hcmulaw-tips-2025', 'Guide for aspiring lawyers at HCMULAW.', 'https://example.com/thumb10.jpg', 'Admin', 39, 'Programs', 2, '2025-09-10T10:00:00Z'),
('Medical Careers with UMP', 'ump-medical-2025', 'Explore medical training at UMP.', 'https://example.com/thumb11.jpg', 'Admin', 40, 'Programs', 2, '2025-09-11T10:00:00Z'),
('Choosing the Right University in 2025', 'choose-uni-2025', 'General guide for university selection.', 'https://example.com/thumb12.jpg', 'Admin', NULL, 'Education', 2, '2025-09-12T10:00:00Z');
