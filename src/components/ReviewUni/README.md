# University Review System

## Tổng quan

Hệ thống tìm kiếm và đánh giá trường đại học được xây dựng với React, TypeScript, Next.js và TailwindCSS.

## Tính năng chính

### 1. Trang danh sách trường đại học (`/university-review`)

- Tìm kiếm theo tên trường hoặc viết tắt
- Lọc theo loại hình trường (Công lập, Tư thục, Quốc tế)
- Hiển thị danh sách trường dưới dạng card với thông tin:
  - Tên trường và viết tắt
  - Loại hình
  - Địa chỉ
  - Năm thành lập
  - Học phí
  - Tỷ lệ có việc làm
  - Đánh giá trung bình
  - Số lượng ngành học

### 2. Trang chi tiết trường (`/university-review/[id]`)

- **Banner lớn** với logo và thông tin cơ bản
- **Thông tin tổng quan**: địa chỉ, hotline, website, năm thành lập
- **Mô tả chi tiết** về trường
- **Thông tin đào tạo**:
  - Bậc đào tạo
  - Danh sách ngành học và khoa
  - Học phí
  - Biểu đồ điểm chuẩn theo năm (Line chart và Bar chart)
  - Bảng điểm chuẩn chi tiết
- **Xếp hạng**: trong nước, quốc tế, tỷ lệ có việc làm
- **Cơ sở vật chất**: ký túc xá, thư viện, labs, câu lạc bộ
- **Đối tác**: doanh nghiệp và chương trình trao đổi
- **Đánh giá sinh viên**:
  - Điểm đánh giá trung bình
  - Phân phối điểm đánh giá
  - Danh sách đánh giá chi tiết
  - Thống kê đánh giá tích cực/trung bình/cần cải thiện
- **Bản đồ** hiển thị vị trí trường

## Components chính

### UniversityList.tsx

- Trang chính hiển thị danh sách trường
- Chức năng tìm kiếm và lọc
- Responsive design với grid layout
- Animation với Framer Motion

### UniversityCard.tsx

- Component card hiển thị thông tin tóm tắt của mỗi trường
- Hover effects
- Link đến trang chi tiết

### UniversityDetail.tsx

- Trang chi tiết với layout 2 cột
- Sidebar sticky với thông tin cơ sở vật chất và đối tác
- Responsive design

### TrainingChart.tsx

- Sử dụng Recharts để hiển thị:
  - Line chart: xu hướng điểm chuẩn theo năm
  - Bar chart: so sánh điểm chuẩn các ngành
  - Bảng dữ liệu chi tiết

### ReviewSection.tsx

- Hiển thị đánh giá và rating
- Star rating system
- Phân phối đánh giá
- Thống kê tổng quan

### Map.tsx

- Tích hợp Leaflet maps
- Hiển thị vị trí trường trên bản đồ
- Fallback khi không load được map

## Công nghệ sử dụng

### Frontend Framework

- **Next.js 15** - React framework với App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling

- **TailwindCSS** - Utility-first CSS framework
- **Responsive design** - Mobile-first approach

### Animation

- **Framer Motion** - Smooth animations và transitions

### Charts

- **Recharts** - Charts library cho React

### Maps

- **React Leaflet** - Map integration
- **Leaflet** - Interactive maps

### Icons

- **Heroicons** - Beautiful SVG icons

## Cấu trúc dữ liệu

Dữ liệu trường đại học được định nghĩa trong `universityDataReview.ts` với interface:

```typescript
interface University {
  id: number;
  name: string;
  abbreviation: string;
  logo: string;
  banner: string;
  type: "Công lập" | "Tư thục" | "Quốc tế";
  foundedYear: number;
  address: string;
  website: string;
  hotline: string;
  overview: string;
  training: Training;
  ranking: Ranking;
  facilities: Facilities;
  partnerships: Partnerships;
  reviews: Review[];
  location: Location;
}
```

## Cách chạy

1. Cài đặt dependencies:

```bash
npm install
```

2. Chạy development server:

```bash
npm run dev
```

3. Mở trình duyệt tại `http://localhost:3000`

4. Điều hướng đến `/university-review` để xem trang tìm kiếm trường đại học

## Tính năng đáng chú ý

### Responsive Design

- Mobile-first approach
- Grid layout tự động điều chỉnh theo màn hình
- Navigation tối ưu cho mobile

### Performance

- Next.js App Router với static generation
- Dynamic imports cho Map component
- Optimized images và assets

### UX/UI

- Smooth animations với Framer Motion
- Hover effects và transitions
- Loading states và error handling
- Intuitive search và filter

### Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- Color contrast compliance
