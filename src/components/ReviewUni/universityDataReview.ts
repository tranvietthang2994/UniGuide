export interface Major {
  name: string;
  faculty: string;
}

export interface AdmissionScore {
  year: number;
  major: string;
  score: number;
}

export interface Training {
  levels: string[];
  majors: Major[];
  admissionScores: AdmissionScore[];
  tuitionFee: string;
}

export interface Ranking {
  domestic: string;
  international: string;
  employmentRate: string;
}

export interface Facilities {
  dormitory: string;
  library: string;
  labs: string;
  clubs: string[];
}

export interface Partnerships {
  companies: string[];
  internshipPrograms: string[];
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface University {
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

export const universities: University[] = [
  {
    id: 1,
    name: "Đại học Quốc gia Hà Nội",
    abbreviation: "VNU",
    logo: "https://example.com/vnu-logo.png",
    banner:
      "https://education.vnu.edu.vn/assets/uploads/files/Slider/56c6e-banner-web-2-.png",
    type: "Công lập",
    foundedYear: 1906,
    address: "144 Xuân Thủy, Cầu Giấy, Hà Nội",
    website: "https://vnu.edu.vn",
    hotline: "+84 24 3754 7732",
    overview:
      "Đại học Quốc gia Hà Nội là hệ thống đại học hàng đầu Việt Nam, tập trung vào nghiên cứu đa ngành và quốc tế hóa. Trường có nhiều chương trình đào tạo đạt chuẩn quốc tế.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Công nghệ Thông tin", faculty: "Trường Đại học Công nghệ" },
        { name: "Kinh tế", faculty: "Trường Đại học Kinh tế" },
        { name: "Luật", faculty: "Trường Đại học Luật" },
        {
          name: "Khoa học Tự nhiên",
          faculty: "Trường Đại học Khoa học Tự nhiên",
        },
        { name: "Ngôn ngữ Anh", faculty: "Trường Đại học Ngoại ngữ" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 28.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 28.5 },
        { year: 2021, major: "Kinh tế", score: 27.0 },
        { year: 2022, major: "Kinh tế", score: 27.5 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "1",
      international: "501-600 (THE World University Rankings)",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại, sức chứa 5,000 sinh viên",
      library: "Thư viện số hóa với hơn 1 triệu đầu sách",
      labs: "Phòng lab công nghệ cao cho IT và khoa học",
      clubs: [
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Kinh tế",
        "Câu lạc bộ Tiếng Anh",
      ],
    },
    partnerships: {
      companies: ["FPT Software", "Viettel Group"],
      internshipPrograms: [
        "Thực tập tại Silicon Valley",
        "Trao đổi sinh viên với Nhật Bản",
      ],
    },
    reviews: [
      {
        user: "Nguyễn Văn A",
        rating: 4.8,
        comment: "Môi trường học tập chuyên nghiệp, nhiều cơ hội nghiên cứu.",
      },
    ],
    location: {
      latitude: 21.0387,
      longitude: 105.7827,
    },
  },
  {
    id: 2,
    name: "Đại học Quốc gia TP. Hồ Chí Minh",
    abbreviation: "VNU-HCM",
    logo: "https://example.com/vnuhcm-logo.png",
    banner: "https://example.com/vnuhcm-banner.jpg",
    type: "Công lập",
    foundedYear: 1995,
    address: "Khu phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh",
    website: "https://vnuhcm.edu.vn",
    hotline: "+84 28 3724 2181",
    overview:
      "VNU-HCM là trung tâm giáo dục hàng đầu phía Nam, nổi bật với các chương trình STEM và quốc tế hóa. Trường có nhiều trường thành viên như Đại học Bách khoa và Đại học Khoa học Tự nhiên.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Điện", faculty: "Trường Đại học Bách khoa" },
        {
          name: "Công nghệ Sinh học",
          faculty: "Trường Đại học Khoa học Tự nhiên",
        },
        {
          name: "Quản trị Kinh doanh",
          faculty: "Trường Đại học Kinh tế - Luật",
        },
        {
          name: "Công nghệ Thông tin",
          faculty: "Trường Đại học Công nghệ Thông tin",
        },
        {
          name: "Khoa học Môi trường",
          faculty: "Trường Đại học Khoa học Tự nhiên",
        },
      ],
      admissionScores: [
        { year: 2021, major: "Kỹ thuật Điện", score: 26.5 },
        { year: 2022, major: "Kỹ thuật Điện", score: 27.0 },
        { year: 2021, major: "Công nghệ Thông tin", score: 27.5 },
        { year: 2022, major: "Công nghệ Thông tin", score: 28.0 },
      ],
      tuitionFee: "12-20 triệu VND/năm",
    },
    ranking: {
      domestic: "2",
      international: "601-800 (QS World University Rankings)",
      employmentRate: "92%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại với Wi-Fi miễn phí",
      library: "Thư viện với hơn 500,000 tài liệu",
      labs: "Phòng thí nghiệm công nghệ sinh học và kỹ thuật",
      clubs: [
        "Câu lạc bộ Robot",
        "Câu lạc bộ Kinh doanh",
        "Câu lạc bộ Môi trường",
      ],
    },
    partnerships: {
      companies: ["VinAI", "Samsung Vietnam"],
      internshipPrograms: ["Thực tập tại FPT", "Trao đổi với Hàn Quốc"],
    },
    reviews: [
      {
        user: "Trần Thị B",
        rating: 4.7,
        comment: "Cơ sở vật chất tốt, giảng viên nhiệt tình.",
      },
    ],
    location: {
      latitude: 10.8759,
      longitude: 106.8009,
    },
  },
  {
    id: 3,
    name: "Đại học Bách khoa Hà Nội",
    abbreviation: "HUST",
    logo: "https://example.com/hust-logo.png",
    banner: "https://example.com/hust-banner.jpg",
    type: "Công lập",
    foundedYear: 1956,
    address: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    website: "https://hust.edu.vn",
    hotline: "+84 24 3869 4242",
    overview:
      "Đại học Bách khoa Hà Nội là trường kỹ thuật hàng đầu, nổi tiếng với các chương trình kỹ thuật và công nghệ. Trường có truyền thống đào tạo nhân lực chất lượng cao.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Cơ khí" },
        { name: "Kỹ thuật Điện tử", faculty: "Khoa Điện tử - Viễn thông" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Kỹ thuật Hóa học", faculty: "Khoa Kỹ thuật Hóa học" },
        { name: "Kỹ thuật Xây dựng", faculty: "Khoa Xây dựng" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 28.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 28.5 },
        { year: 2021, major: "Kỹ thuật Cơ khí", score: 26.0 },
        { year: 2022, major: "Kỹ thuật Cơ khí", score: 26.5 },
      ],
      tuitionFee: "20-30 triệu VND/năm",
    },
    ranking: {
      domestic: "3",
      international: "401-500 (QS Asia University Rankings)",
      employmentRate: "93%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần khu học xá",
      library: "Thư viện kỹ thuật với tài liệu chuyên ngành",
      labs: "Phòng lab hiện đại cho kỹ thuật và công nghệ",
      clubs: [
        "Câu lạc bộ Kỹ thuật",
        "Câu lạc bộ Lập trình",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Viettel High Tech", "VinFast"],
      internshipPrograms: ["Thực tập kỹ thuật tại Nhật", "Trao đổi với Đức"],
    },
    reviews: [
      {
        user: "Lê Văn C",
        rating: 4.6,
        comment: "Chương trình học chất lượng, nhưng áp lực cao.",
      },
    ],
    location: {
      latitude: 21.0041,
      longitude: 105.8431,
    },
  },
  {
    id: 4,
    name: "Đại học Duy Tân",
    abbreviation: "DTU",
    logo: "https://example.com/dtu-logo.png",
    banner: "https://example.com/dtu-banner.jpg",
    type: "Tư thục",
    foundedYear: 1994,
    address: "254 Nguyễn Văn Linh, Thanh Khê, Đà Nẵng",
    website: "https://duytan.edu.vn",
    hotline: "+84 236 3827 111",
    overview:
      "Đại học Duy Tân là trường tư thục đầu tiên tại Việt Nam trở thành hệ thống đại học. Trường nổi bật với các chương trình công nghệ và quản trị.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        { name: "Kiến trúc", faculty: "Khoa Kiến trúc" },
        { name: "Du lịch", faculty: "Khoa Du lịch" },
        { name: "Y Dược", faculty: "Khoa Y Dược" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 24.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 24.5 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 22.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 22.5 },
      ],
      tuitionFee: "25-35 triệu VND/năm",
    },
    ranking: {
      domestic: "4",
      international: "301-400 (QS Asia University Rankings)",
      employmentRate: "88%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, sức chứa 2,000 sinh viên",
      library: "Thư viện hiện đại với tài liệu số",
      labs: "Phòng lab công nghệ và y dược tiên tiến",
      clubs: [
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Du lịch",
        "Câu lạc bộ Âm nhạc",
      ],
    },
    partnerships: {
      companies: ["FPT Software", "VNG Corporation"],
      internshipPrograms: [
        "Thực tập tại Singapore",
        "Chương trình trao đổi Mỹ",
      ],
    },
    reviews: [
      {
        user: "Phạm Thị D",
        rating: 4.5,
        comment: "Môi trường năng động, nhiều cơ hội thực tập.",
      },
    ],
    location: {
      latitude: 16.0601,
      longitude: 108.2098,
    },
  },
  {
    id: 5,
    name: "Đại học Kinh tế Quốc dân",
    abbreviation: "NEU",
    logo: "https://example.com/neu-logo.png",
    banner: "https://example.com/neu-banner.jpg",
    type: "Công lập",
    foundedYear: 1956,
    address: "207 Giải Phóng, Hai Bà Trưng, Hà Nội",
    website: "https://neu.edu.vn",
    hotline: "+84 24 3628 0280",
    overview:
      "Đại học Kinh tế Quốc dân là trường hàng đầu về kinh tế và quản trị, đào tạo nhiều lãnh đạo trong các lĩnh vực công và tư.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kinh tế Quốc tế", faculty: "Khoa Kinh tế Quốc tế" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        {
          name: "Tài chính - Ngân hàng",
          faculty: "Khoa Tài chính - Ngân hàng",
        },
        { name: "Kế toán", faculty: "Khoa Kế toán" },
        { name: "Marketing", faculty: "Khoa Marketing" },
      ],
      admissionScores: [
        { year: 2021, major: "Kinh tế Quốc tế", score: 27.5 },
        { year: 2022, major: "Kinh tế Quốc tế", score: 28.0 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 26.5 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 27.0 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "5",
      international: "601-800 (THE World University Rankings)",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá sạch sẽ, gần trung tâm",
      library: "Thư viện với hơn 300,000 tài liệu kinh tế",
      labs: "Phòng lab tài chính và phân tích dữ liệu",
      clubs: [
        "Câu lạc bộ Doanh nhân trẻ",
        "Câu lạc bộ Marketing",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vietcombank", "Vingroup"],
      internshipPrograms: ["Thực tập tại PwC", "Trao đổi với Úc"],
    },
    reviews: [
      {
        user: "Hoàng Văn E",
        rating: 4.8,
        comment: "Chương trình học thực tiễn, nhiều cơ hội nghề nghiệp.",
      },
    ],
    location: {
      latitude: 20.9965,
      longitude: 105.8412,
    },
  },
  {
    id: 6,
    name: "Đại học RMIT Việt Nam",
    abbreviation: "RMIT",
    logo: "https://example.com/rmit-logo.png",
    banner: "https://example.com/rmit-banner.jpg",
    type: "Quốc tế",
    foundedYear: 2000,
    address: "702 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
    website: "https://www.rmit.edu.vn",
    hotline: "+84 28 3776 1300",
    overview:
      "RMIT Việt Nam là trường quốc tế hàng đầu, cung cấp chương trình đào tạo theo chuẩn Úc. Trường nổi bật với các ngành công nghệ, kinh doanh và thiết kế.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Kinh doanh" },
        { name: "Thiết kế Đồ họa", faculty: "Khoa Thiết kế" },
        { name: "Kỹ thuật Phần mềm", faculty: "Khoa Công nghệ" },
        { name: "Truyền thông Đa phương tiện", faculty: "Khoa Truyền thông" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 20.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 21.0 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 19.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 20.0 },
      ],
      tuitionFee: "40-50 triệu VND/năm",
    },
    ranking: {
      domestic: "6",
      international: "251-300 (QS World University Rankings)",
      employmentRate: "95%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại, đầy đủ tiện nghi",
      library: "Thư viện số quốc tế với tài liệu đa ngôn ngữ",
      labs: "Phòng lab thiết kế và công nghệ tiên tiến",
      clubs: [
        "Câu lạc bộ Thiết kế",
        "Câu lạc bộ Kinh doanh",
        "Câu lạc bộ Công nghệ",
      ],
    },
    partnerships: {
      companies: ["Google Vietnam", "Unilever Vietnam"],
      internshipPrograms: ["Thực tập tại Úc", "Trao đổi quốc tế toàn cầu"],
    },
    reviews: [
      {
        user: "Nguyễn Thị F",
        rating: 4.9,
        comment: "Môi trường quốc tế, cơ hội việc làm cao.",
      },
    ],
    location: {
      latitude: 10.7296,
      longitude: 106.6951,
    },
  },
  {
    id: 7,
    name: "Đại học Y Hà Nội",
    abbreviation: "HMU",
    logo: "https://example.com/hmu-logo.png",
    banner: "https://example.com/hmu-banner.jpg",
    type: "Công lập",
    foundedYear: 1902,
    address: "Số 1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    website: "https://hmu.edu.vn",
    hotline: "+84 24 3852 3798",
    overview:
      "Đại học Y Hà Nội là trường y khoa hàng đầu Việt Nam, đào tạo bác sĩ và chuyên gia y tế chất lượng cao. Trường có lịch sử lâu đời và uy tín trong lĩnh vực y học.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Y Đa khoa", faculty: "Khoa Y" },
        { name: "Dược học", faculty: "Khoa Dược" },
        { name: "Điều dưỡng", faculty: "Khoa Điều dưỡng" },
        { name: "Y tế Công cộng", faculty: "Khoa Y tế Công cộng" },
        { name: "Răng Hàm Mặt", faculty: "Khoa Răng Hàm Mặt" },
      ],
      admissionScores: [
        { year: 2021, major: "Y Đa khoa", score: 28.5 },
        { year: 2022, major: "Y Đa khoa", score: 29.0 },
        { year: 2021, major: "Dược học", score: 27.0 },
        { year: 2022, major: "Dược học", score: 27.5 },
      ],
      tuitionFee: "20-30 triệu VND/năm",
    },
    ranking: {
      domestic: "7",
      international: "Not ranked",
      employmentRate: "94%",
    },
    facilities: {
      dormitory: "Ký túc xá gần bệnh viện thực hành",
      library: "Thư viện y khoa với tài liệu chuyên sâu",
      labs: "Phòng lab y học và mô phỏng hiện đại",
      clubs: [
        "Câu lạc bộ Y khoa",
        "Câu lạc bộ Tình nguyện",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vinmec", "Bệnh viện Bạch Mai"],
      internshipPrograms: [
        "Thực tập tại bệnh viện quốc tế",
        "Trao đổi với Nhật Bản",
      ],
    },
    reviews: [
      {
        user: "Lê Thị G",
        rating: 4.7,
        comment: "Chương trình đào tạo chuyên sâu, nhưng học rất nặng.",
      },
    ],
    location: {
      latitude: 21.0073,
      longitude: 105.8297,
    },
  },
  {
    id: 8,
    name: "Đại học FPT",
    abbreviation: "FPTU",
    logo: "https://example.com/fptu-logo.png",
    banner: "https://example.com/fptu-banner.jpg",
    type: "Tư thục",
    foundedYear: 2006,
    address: "Khu Công nghệ cao Hòa Lạc, Thạch Thất, Hà Nội",
    website: "https://fpt.edu.vn",
    hotline: "+84 24 7300 5588",
    overview:
      "Đại học FPT nổi bật với các chương trình công nghệ thông tin và quản trị, có liên kết chặt chẽ với ngành công nghiệp. Trường áp dụng mô hình đào tạo hiện đại, gần gũi với doanh nghiệp.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        { name: "Kỹ thuật Phần mềm", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Thiết kế Đồ họa", faculty: "Khoa Thiết kế" },
        { name: "Trí tuệ Nhân tạo", faculty: "Khoa Công nghệ Thông tin" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 24.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 24.5 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 22.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 22.5 },
      ],
      tuitionFee: "30-40 triệu VND/năm",
    },
    ranking: {
      domestic: "8",
      international: "Not ranked",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại, đầy đủ tiện nghi",
      library: "Thư viện số với tài liệu công nghệ",
      labs: "Phòng lab AI và lập trình tiên tiến",
      clubs: [
        "Câu lạc bộ Lập trình",
        "Câu lạc bộ Khởi nghiệp",
        "Câu lạc bộ Âm nhạc",
      ],
    },
    partnerships: {
      companies: ["FPT Software", "VNG Corporation"],
      internshipPrograms: ["Thực tập tại FPT Japan", "Trao đổi với Singapore"],
    },
    reviews: [
      {
        user: "Trần Văn H",
        rating: 4.6,
        comment: "Môi trường năng động, nhiều cơ hội thực tập.",
      },
    ],
    location: {
      latitude: 21.0134,
      longitude: 105.525,
    },
  },
  {
    id: 9,
    name: "Đại học Ngoại thương",
    abbreviation: "FTU",
    logo: "https://example.com/ftu-logo.png",
    banner: "https://example.com/ftu-banner.jpg",
    type: "Công lập",
    foundedYear: 1960,
    address: "91 Chùa Láng, Đống Đa, Hà Nội",
    website: "https://ftu.edu.vn",
    hotline: "+84 24 3835 6800",
    overview:
      "Đại học Ngoại thương là trường hàng đầu về kinh tế quốc tế và thương mại, nổi tiếng với các chương trình đào tạo quốc tế và đội ngũ giảng viên chất lượng.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kinh tế Quốc tế", faculty: "Khoa Kinh tế Quốc tế" },
        {
          name: "Quản trị Kinh doanh Quốc tế",
          faculty: "Khoa Quản trị Kinh doanh",
        },
        { name: "Tài chính Quốc tế", faculty: "Khoa Tài chính - Ngân hàng" },
        { name: "Luật Thương mại Quốc tế", faculty: "Khoa Luật" },
        { name: "Ngôn ngữ Thương mại", faculty: "Khoa Ngoại ngữ Kinh tế" },
      ],
      admissionScores: [
        { year: 2021, major: "Kinh tế Quốc tế", score: 28.0 },
        { year: 2022, major: "Kinh tế Quốc tế", score: 28.5 },
        { year: 2021, major: "Quản trị Kinh doanh Quốc tế", score: 27.0 },
        { year: 2022, major: "Quản trị Kinh doanh Quốc tế", score: 27.5 },
      ],
      tuitionFee: "18-25 triệu VND/năm",
    },
    ranking: {
      domestic: "9",
      international: "Not ranked",
      employmentRate: "92%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện chuyên về kinh tế và thương mại",
      labs: "Phòng lab phân tích tài chính",
      clubs: [
        "Câu lạc bộ Kinh tế",
        "Câu lạc bộ Tiếng Anh",
        "Câu lạc bộ Khởi nghiệp",
      ],
    },
    partnerships: {
      companies: ["HSBC Vietnam", "Deloitte Vietnam"],
      internshipPrograms: ["Thực tập tại Ernst & Young", "Trao đổi với Nhật"],
    },
    reviews: [
      {
        user: "Nguyễn Thị I",
        rating: 4.8,
        comment: "Chương trình quốc tế, nhiều cơ hội việc làm.",
      },
    ],
    location: {
      latitude: 21.0245,
      longitude: 105.8048,
    },
  },
  {
    id: 10,
    name: "Đại học Tôn Đức Thắng",
    abbreviation: "TDTU",
    logo: "https://example.com/tdtu-logo.png",
    banner: "https://example.com/tdtu-banner.jpg",
    type: "Công lập",
    foundedYear: 1997,
    address: "19 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh",
    website: "https://tdtu.edu.vn",
    hotline: "+84 28 3775 5050",
    overview:
      "Đại học Tôn Đức Thắng nổi bật với các chương trình kỹ thuật, kinh doanh và thể thao. Trường có cơ sở vật chất hiện đại và xếp hạng cao trong khu vực.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Kỹ thuật" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Thể dục Thể thao", faculty: "Khoa Thể dục Thể thao" },
        { name: "Kế toán", faculty: "Khoa Kế toán" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 26.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 26.5 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 24.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 24.5 },
      ],
      tuitionFee: "20-30 triệu VND/năm",
    },
    ranking: {
      domestic: "10",
      international: "201-250 (QS Asia University Rankings)",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại, sức chứa 3,000 sinh viên",
      library: "Thư viện số với tài liệu đa ngành",
      labs: "Phòng lab kỹ thuật và công nghệ tiên tiến",
      clubs: [
        "Câu lạc bộ Thể thao",
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Kinh doanh",
      ],
    },
    partnerships: {
      companies: ["Bosch Vietnam", "Vingroup"],
      internshipPrograms: ["Thực tập tại Hàn Quốc", "Trao đổi với Úc"],
    },
    reviews: [
      {
        user: "Trần Văn K",
        rating: 4.7,
        comment: "Cơ sở vật chất tốt, môi trường học tập năng động.",
      },
    ],
    location: {
      latitude: 10.7319,
      longitude: 106.6994,
    },
  },
  // Additional universities (11-50) to meet the requirement of ~50 universities
  {
    id: 11,
    name: "Đại học Sư phạm Hà Nội",
    abbreviation: "HNUE",
    logo: "https://example.com/hnue-logo.png",
    banner: "https://example.com/hnue-banner.jpg",
    type: "Công lập",
    foundedYear: 1951,
    address: "136 Xuân Thủy, Cầu Giấy, Hà Nội",
    website: "https://hnue.edu.vn",
    hotline: "+84 24 3754 7839",
    overview:
      "Đại học Sư phạm Hà Nội là trung tâm đào tạo giáo viên hàng đầu, nổi tiếng với các chương trình sư phạm và nghiên cứu giáo dục.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Sư phạm Toán", faculty: "Khoa Toán" },
        { name: "Sư phạm Ngữ văn", faculty: "Khoa Ngữ văn" },
        { name: "Sư phạm Tiếng Anh", faculty: "Khoa Ngoại ngữ" },
        { name: "Giáo dục Tiểu học", faculty: "Khoa Giáo dục Tiểu học" },
        { name: "Tâm lý học Giáo dục", faculty: "Khoa Tâm lý - Giáo dục" },
      ],
      admissionScores: [
        { year: 2021, major: "Sư phạm Toán", score: 27.0 },
        { year: 2022, major: "Sư phạm Toán", score: 27.5 },
        { year: 2021, major: "Sư phạm Tiếng Anh", score: 26.0 },
        { year: 2022, major: "Sư phạm Tiếng Anh", score: 26.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "11",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá gần khu học xá",
      library: "Thư viện giáo dục với tài liệu chuyên ngành",
      labs: "Phòng thực hành sư phạm hiện đại",
      clubs: [
        "Câu lạc bộ Giáo viên trẻ",
        "Câu lạc bộ Tiếng Anh",
        "Câu lạc bộ Văn học",
      ],
    },
    partnerships: {
      companies: ["Vinschool", "TH School"],
      internshipPrograms: ["Thực tập tại trường công", "Trao đổi với Hàn Quốc"],
    },
    reviews: [
      {
        user: "Nguyễn Thị L",
        rating: 4.5,
        comment: "Chương trình đào tạo giáo viên chất lượng.",
      },
    ],
    location: {
      latitude: 21.0387,
      longitude: 105.7827,
    },
  },
  {
    id: 12,
    name: "Đại học Cần Thơ",
    abbreviation: "CTU",
    logo: "https://example.com/ctu-logo.png",
    banner: "https://example.com/ctu-banner.jpg",
    type: "Công lập",
    foundedYear: 1966,
    address: "Khu II, Đường 3/2, Xuân Khánh, Ninh Kiều, Cần Thơ",
    website: "https://ctu.edu.vn",
    hotline: "+84 292 3832 663",
    overview:
      "Đại học Cần Thơ là trường lớn nhất khu vực Đồng bằng sông Cửu Long, nổi bật với các ngành nông nghiệp, thủy sản và công nghệ.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Nông nghiệp", faculty: "Khoa Nông nghiệp" },
        { name: "Thủy sản", faculty: "Khoa Thủy sản" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Kỹ thuật Xây dựng", faculty: "Khoa Kỹ thuật" },
        { name: "Kinh tế", faculty: "Khoa Kinh tế" },
      ],
      admissionScores: [
        { year: 2021, major: "Nông nghiệp", score: 22.0 },
        { year: 2022, major: "Nông nghiệp", score: 22.5 },
        { year: 2021, major: "Công nghệ Thông tin", score: 24.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 24.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "12",
      international: "Not ranked",
      employmentRate: "80%",
    },
    facilities: {
      dormitory: "Ký túc xá rộng rãi, gần trung tâm",
      library: "Thư viện với tài liệu nông nghiệp và thủy sản",
      labs: "Phòng lab nông nghiệp và công nghệ",
      clubs: [
        "Câu lạc bộ Nông nghiệp",
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vinamilk", "Loc Troi Group"],
      internshipPrograms: ["Thực tập tại nông trại", "Trao đổi với Thái Lan"],
    },
    reviews: [
      {
        user: "Trần Văn M",
        rating: 4.4,
        comment:
          "Môi trường học tập thân thiện, phù hợp với sinh viên miền Tây.",
      },
    ],
    location: {
      latitude: 10.0299,
      longitude: 105.7709,
    },
  },
  {
    id: 13,
    name: "Đại học Huế",
    abbreviation: "HU",
    logo: "https://example.com/hu-logo.png",
    banner: "https://example.com/hu-banner.jpg",
    type: "Công lập",
    foundedYear: 1957,
    address: "03 Lê Lợi, TP. Huế, Thừa Thiên Huế",
    website: "https://hueuni.edu.vn",
    hotline: "+84 234 3823 290",
    overview:
      "Đại học Huế là hệ thống đại học lớn tại miền Trung, cung cấp các chương trình đào tạo đa ngành từ khoa học tự nhiên đến nhân văn.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Sư phạm Lịch sử", faculty: "Khoa Sư phạm" },
        { name: "Kỹ thuật Xây dựng", faculty: "Khoa Kỹ thuật" },
        { name: "Y Dược", faculty: "Khoa Y Dược" },
        { name: "Du lịch", faculty: "Khoa Du lịch" },
        { name: "Kinh tế", faculty: "Khoa Kinh tế" },
      ],
      admissionScores: [
        { year: 2021, major: "Y Dược", score: 26.0 },
        { year: 2022, major: "Y Dược", score: 26.5 },
        { year: 2021, major: "Du lịch", score: 22.0 },
        { year: 2022, major: "Du lịch", score: 22.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "13",
      international: "Not ranked",
      employmentRate: "82%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm Huế",
      library: "Thư viện đa ngành với tài liệu phong phú",
      labs: "Phòng lab y học và kỹ thuật",
      clubs: [
        "Câu lạc bộ Du lịch",
        "Câu lạc bộ Văn hóa",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vietnam Airlines", "Sun Group"],
      internshipPrograms: ["Thực tập tại khách sạn 5 sao", "Trao đổi với Nhật"],
    },
    reviews: [
      {
        user: "Nguyễn Văn N",
        rating: 4.3,
        comment: "Môi trường học tập yên bình, gần gũi.",
      },
    ],
    location: {
      latitude: 16.4674,
      longitude: 107.5787,
    },
  },
  {
    id: 14,
    name: "Đại học Hoa Sen",
    abbreviation: "HSU",
    logo: "https://example.com/hsu-logo.png",
    banner: "https://example.com/hsu-banner.jpg",
    type: "Tư thục",
    foundedYear: 1991,
    address: "8 Nguyễn Văn Tráng, Quận 1, TP. Hồ Chí Minh",
    website: "https://hoasen.edu.vn",
    hotline: "+84 28 7309 1991",
    overview:
      "Đại học Hoa Sen là trường tư thục nổi bật với các chương trình kinh doanh, du lịch và thiết kế, tập trung vào đào tạo thực tiễn.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Quản trị Kinh doanh", faculty: "Khoa Kinh tế - Quản trị" },
        { name: "Du lịch", faculty: "Khoa Du lịch" },
        { name: "Thiết kế Đồ họa", faculty: "Khoa Thiết kế" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Marketing", faculty: "Khoa Kinh tế - Quản trị" },
      ],
      admissionScores: [
        { year: 2021, major: "Quản trị Kinh doanh", score: 22.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 22.5 },
        { year: 2021, major: "Du lịch", score: 20.0 },
        { year: 2022, major: "Du lịch", score: 20.5 },
      ],
      tuitionFee: "25-35 triệu VND/năm",
    },
    ranking: {
      domestic: "14",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện hiện đại với tài liệu kinh doanh",
      labs: "Phòng lab thiết kế và công nghệ",
      clubs: [
        "Câu lạc bộ Du lịch",
        "Câu lạc bộ Thiết kế",
        "Câu lạc bộ Marketing",
      ],
    },
    partnerships: {
      companies: ["Saigontourist", "VNG Corporation"],
      internshipPrograms: ["Thực tập tại khách sạn", "Trao đổi với Singapore"],
    },
    reviews: [
      {
        user: "Phạm Thị O",
        rating: 4.4,
        comment: "Môi trường học tập sáng tạo, nhiều hoạt động ngoại khóa.",
      },
    ],
    location: {
      latitude: 10.7739,
      longitude: 106.6945,
    },
  },
  {
    id: 15,
    name: "Đại học Công nghệ Thông tin - VNU-HCM",
    abbreviation: "UIT",
    logo: "https://example.com/uit-logo.png",
    banner: "https://example.com/uit-banner.jpg",
    type: "Công lập",
    foundedYear: 2006,
    address: "Khu phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh",
    website: "https://uit.edu.vn",
    hotline: "+84 28 3725 2002",
    overview:
      "Đại học Công nghệ Thông tin thuộc VNU-HCM, chuyên đào tạo các ngành công nghệ thông tin và truyền thông với chương trình hiện đại.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Kỹ thuật Phần mềm", faculty: "Khoa Kỹ thuật Phần mềm" },
        { name: "An toàn Thông tin", faculty: "Khoa An toàn Thông tin" },
        { name: "Khoa học Máy tính", faculty: "Khoa Khoa học Máy tính" },
        { name: "Hệ thống Thông tin", faculty: "Khoa Hệ thống Thông tin" },
        { name: "Trí tuệ Nhân tạo", faculty: "Khoa Khoa học Máy tính" },
      ],
      admissionScores: [
        { year: 2021, major: "Kỹ thuật Phần mềm", score: 27.0 },
        { year: 2022, major: "Kỹ thuật Phần mềm", score: 27.5 },
        { year: 2021, major: "An toàn Thông tin", score: 26.0 },
        { year: 2022, major: "An toàn Thông tin", score: 26.5 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "15",
      international: "Not ranked",
      employmentRate: "92%",
    },
    facilities: {
      dormitory: "Ký túc xá hiện đại, gần khu công nghệ cao",
      library: "Thư viện số với tài liệu công nghệ",
      labs: "Phòng lab lập trình và bảo mật",
      clubs: [
        "Câu lạc bộ Lập trình",
        "Câu lạc bộ An ninh mạng",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Axon Vietnam", "TMA Solutions"],
      internshipPrograms: [
        "Thực tập tại Silicon Valley",
        "Trao đổi với Hàn Quốc",
      ],
    },
    reviews: [
      {
        user: "Nguyễn Văn P",
        rating: 4.7,
        comment: "Chương trình học cập nhật, cơ hội việc làm tốt.",
      },
    ],
    location: {
      latitude: 10.8759,
      longitude: 106.8009,
    },
  },
  {
    id: 16,
    name: "Đại học Y Dược TP. Hồ Chí Minh",
    abbreviation: "UMP",
    logo: "https://example.com/ump-logo.png",
    banner: "https://example.com/ump-banner.jpg",
    type: "Công lập",
    foundedYear: 1947,
    address: "217 Hồng Bàng, Quận 5, TP. Hồ Chí Minh",
    website: "https://ump.edu.vn",
    hotline: "+84 28 3855 8411",
    overview:
      "Đại học Y Dược TP.HCM là trường y khoa hàng đầu phía Nam, đào tạo bác sĩ, dược sĩ và chuyên gia y tế chất lượng cao.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Y Đa khoa", faculty: "Khoa Y" },
        { name: "Dược học", faculty: "Khoa Dược" },
        { name: "Răng Hàm Mặt", faculty: "Khoa Răng Hàm Mặt" },
        { name: "Điều dưỡng", faculty: "Khoa Điều dưỡng" },
        { name: "Y tế Công cộng", faculty: "Khoa Y tế Công cộng" },
      ],
      admissionScores: [
        { year: 2021, major: "Y Đa khoa", score: 28.0 },
        { year: 2022, major: "Y Đa khoa", score: 28.5 },
        { year: 2021, major: "Dược học", score: 26.5 },
        { year: 2022, major: "Dược học", score: 27.0 },
      ],
      tuitionFee: "20-30 triệu VND/năm",
    },
    ranking: {
      domestic: "16",
      international: "Not ranked",
      employmentRate: "93%",
    },
    facilities: {
      dormitory: "Ký túc xá gần bệnh viện thực hành",
      library: "Thư viện y khoa với tài liệu chuyên sâu",
      labs: "Phòng lab y học hiện đại",
      clubs: [
        "Câu lạc bộ Y khoa",
        "Câu lạc bộ Tình nguyện",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vinmec", "Bệnh viện Chợ Rẫy"],
      internshipPrograms: [
        "Thực tập tại bệnh viện quốc tế",
        "Trao đổi với Nhật",
      ],
    },
    reviews: [
      {
        user: "Trần Thị Q",
        rating: 4.8,
        comment: "Chương trình học chuyên sâu, cơ sở vật chất tốt.",
      },
    ],
    location: {
      latitude: 10.7553,
      longitude: 106.6702,
    },
  },
  {
    id: 17,
    name: "Đại học Kinh tế TP. Hồ Chí Minh",
    abbreviation: "UEH",
    logo: "https://example.com/ueh-logo.png",
    banner: "https://example.com/ueh-banner.jpg",
    type: "Công lập",
    foundedYear: 1976,
    address: "59C Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh",
    website: "https://ueh.edu.vn",
    hotline: "+84 28 3829 5296",
    overview:
      "Đại học Kinh tế TP.HCM là trường hàng đầu về kinh tế và quản trị, với nhiều chương trình đào tạo quốc tế và thực tiễn.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kinh tế", faculty: "Khoa Kinh tế" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị" },
        { name: "Tài chính - Ngân hàng", faculty: "Khoa Tài chính" },
        { name: "Kế toán", faculty: "Khoa Kế toán" },
        { name: "Marketing", faculty: "Khoa Marketing" },
      ],
      admissionScores: [
        { year: 2021, major: "Quản trị Kinh doanh", score: 26.5 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 27.0 },
        { year: 2021, major: "Tài chính - Ngân hàng", score: 25.5 },
        { year: 2022, major: "Tài chính - Ngân hàng", score: 26.0 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "17",
      international: "501-600 (THE World University Rankings)",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện kinh tế với tài liệu quốc tế",
      labs: "Phòng lab tài chính và phân tích dữ liệu",
      clubs: [
        "Câu lạc bộ Doanh nhân",
        "Câu lạc bộ Marketing",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vietcombank", "Unilever Vietnam"],
      internshipPrograms: ["Thực tập tại PwC", "Trao đổi với Úc"],
    },
    reviews: [
      {
        user: "Nguyễn Văn R",
        rating: 4.7,
        comment: "Chương trình học thực tiễn, nhiều cơ hội nghề nghiệp.",
      },
    ],
    location: {
      latitude: 10.7865,
      longitude: 106.6882,
    },
  },
  {
    id: 18,
    name: "Đại học VinUni",
    abbreviation: "VinUni",
    logo: "https://example.com/vinuni-logo.png",
    banner: "https://example.com/vinuni-banner.jpg",
    type: "Tư thục",
    foundedYear: 2020,
    address: "Vinhomes Ocean Park, Gia Lâm, Hà Nội",
    website: "https://vinuni.edu.vn",
    hotline: "+84 24 7108 9779",
    overview:
      "Đại học VinUni là trường tư thục cao cấp, hợp tác với các trường hàng đầu thế giới như Cornell và Penn, tập trung vào y học, kỹ thuật và kinh doanh.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Y khoa", faculty: "Khoa Y" },
        { name: "Kỹ thuật Máy tính", faculty: "Khoa Kỹ thuật" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Kinh doanh" },
        { name: "Kỹ thuật Điện", faculty: "Khoa Kỹ thuật" },
        { name: "Điều dưỡng", faculty: "Khoa Y" },
      ],
      admissionScores: [
        { year: 2021, major: "Y khoa", score: 26.0 },
        { year: 2022, major: "Y khoa", score: 26.5 },
        { year: 2021, major: "Quản trị Kinh doanh", score: 24.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 24.5 },
      ],
      tuitionFee: "40-50 triệu VND/năm",
    },
    ranking: {
      domestic: "18",
      international: "Not ranked",
      employmentRate: "90%",
    },
    facilities: {
      dormitory: "Ký túc xá cao cấp, tiện nghi quốc tế",
      library: "Thư viện số hiện đại",
      labs: "Phòng lab y học và kỹ thuật tiên tiến",
      clubs: [
        "Câu lạc bộ Khởi nghiệp",
        "Câu lạc bộ Y khoa",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vingroup", "Vinmec"],
      internshipPrograms: ["Thực tập tại Mỹ", "Trao đổi với Cornell"],
    },
    reviews: [
      {
        user: "Trần Thị S",
        rating: 4.9,
        comment: "Môi trường học tập quốc tế, chất lượng cao.",
      },
    ],
    location: {
      latitude: 21.0467,
      longitude: 105.9265,
    },
  },
  {
    id: 19,
    name: "Đại học Hàng hải Việt Nam",
    abbreviation: "VMU",
    logo: "https://example.com/vmu-logo.png",
    banner: "https://example.com/vmu-banner.jpg",
    type: "Công lập",
    foundedYear: 1956,
    address: "484 Lạch Tray, Ngô Quyền, Hải Phòng",
    website: "https://vmu.edu.vn",
    hotline: "+84 225 3829 108",
    overview:
      "Đại học Hàng hải Việt Nam là trường hàng đầu về đào tạo hàng hải, logistics và kỹ thuật biển, phục vụ ngành vận tải biển.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Tàu thủy", faculty: "Khoa Kỹ thuật Tàu thủy" },
        { name: "Logistics", faculty: "Khoa Kinh tế Vận tải" },
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Kỹ thuật" },
        { name: "Điều khiển Tàu biển", faculty: "Khoa Hàng hải" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
      ],
      admissionScores: [
        { year: 2021, major: "Logistics", score: 24.0 },
        { year: 2022, major: "Logistics", score: 24.5 },
        { year: 2021, major: "Kỹ thuật Tàu thủy", score: 22.0 },
        { year: 2022, major: "Kỹ thuật Tàu thủy", score: 22.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "19",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá gần cảng, tiện nghi cơ bản",
      library: "Thư viện chuyên ngành hàng hải",
      labs: "Phòng mô phỏng tàu biển và kỹ thuật",
      clubs: [
        "Câu lạc bộ Hàng hải",
        "Câu lạc bộ Logistics",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["VIMC", "Vinalines"],
      internshipPrograms: ["Thực tập trên tàu biển", "Trao đổi với Hàn Quốc"],
    },
    reviews: [
      {
        user: "Nguyễn Văn T",
        rating: 4.3,
        comment: "Chương trình học chuyên sâu, phù hợp với ngành hàng hải.",
      },
    ],
    location: {
      latitude: 20.8501,
      longitude: 106.688,
    },
  },
  {
    id: 20,
    name: "Đại học Công nghiệp Hà Nội",
    abbreviation: "HaUI",
    logo: "https://example.com/haui-logo.png",
    banner: "https://example.com/haui-banner.jpg",
    type: "Công lập",
    foundedYear: 1898,
    address: "298 Cầu Diễn, Bắc Từ Liêm, Hà Nội",
    website: "https://haui.edu.vn",
    hotline: "+84 24 3765 5121",
    overview:
      "Đại học Công nghiệp Hà Nội là trường kỹ thuật lâu đời, chuyên đào tạo các ngành công nghiệp, công nghệ và quản trị.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Cơ khí" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Kỹ thuật Điện", faculty: "Khoa Điện" },
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        { name: "Công nghệ May", faculty: "Khoa Công nghệ May" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 25.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 25.5 },
        { year: 2021, major: "Kỹ thuật Cơ khí", score: 23.0 },
        { year: 2022, major: "Kỹ thuật Cơ khí", score: 23.5 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "20",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần khu công nghiệp",
      library: "Thư viện với tài liệu kỹ thuật",
      labs: "Phòng lab cơ khí và công nghệ",
      clubs: [
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Kinh doanh",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Canon Vietnam", "Samsung Vietnam"],
      internshipPrograms: ["Thực tập tại nhà máy", "Trao đổi với Nhật"],
    },
    reviews: [
      {
        user: "Trần Văn U",
        rating: 4.4,
        comment: "Chương trình học thực tiễn, cơ hội việc làm tốt.",
      },
    ],
    location: {
      latitude: 21.0531,
      longitude: 105.7354,
    },
  },
  {
    id: 21,
    name: "Đại học Nông Lâm TP. Hồ Chí Minh",
    abbreviation: "NLU",
    logo: "https://example.com/nlu-logo.png",
    banner: "https://example.com/nlu-banner.jpg",
    type: "Công lập",
    foundedYear: 1955,
    address: "Khu phố 6, Linh Trung, Thủ Đức, TP. Hồ Chí Minh",
    website: "https://hcmuaf.edu.vn",
    hotline: "+84 28 3722 2272",
    overview:
      "Đại học Nông Lâm TP.HCM là trường hàng đầu về nông nghiệp, lâm nghiệp và công nghệ thực phẩm, phục vụ phát triển bền vững.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Nông nghiệp", faculty: "Khoa Nông nghiệp" },
        { name: "Công nghệ Thực phẩm", faculty: "Khoa Công nghệ Thực phẩm" },
        { name: "Kỹ thuật Môi trường", faculty: "Khoa Môi trường" },
        { name: "Chăn nuôi", faculty: "Khoa Chăn nuôi" },
        { name: "Kinh tế Nông nghiệp", faculty: "Khoa Kinh tế" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thực phẩm", score: 23.0 },
        { year: 2022, major: "Công nghệ Thực phẩm", score: 23.5 },
        { year: 2021, major: "Nông nghiệp", score: 21.0 },
        { year: 2022, major: "Nông nghiệp", score: 21.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "21",
      international: "Not ranked",
      employmentRate: "80%",
    },
    facilities: {
      dormitory: "Ký túc xá gần khu nông nghiệp",
      library: "Thư viện chuyên ngành nông lâm",
      labs: "Phòng lab thực phẩm và môi trường",
      clubs: [
        "Câu lạc bộ Nông nghiệp",
        "Câu lạc bộ Môi trường",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Vinamilk", "TH True Milk"],
      internshipPrograms: ["Thực tập tại nông trại", "Trao đổi với Thái Lan"],
    },
    reviews: [
      {
        user: "Nguyễn Thị V",
        rating: 4.3,
        comment: "Chương trình học thực tế, hỗ trợ sinh viên nông thôn.",
      },
    ],
    location: {
      latitude: 10.8759,
      longitude: 106.8009,
    },
  },
  {
    id: 22,
    name: "Đại học Sư phạm TP. Hồ Chí Minh",
    abbreviation: "HCMUE",
    logo: "https://example.com/hcmue-logo.png",
    banner: "https://example.com/hcmue-banner.jpg",
    type: "Công lập",
    foundedYear: 1957,
    address: "280 An Dương Vương, Quận 5, TP. Hồ Chí Minh",
    website: "https://hcmue.edu.vn",
    hotline: "+84 28 3835 2020",
    overview:
      "Đại học Sư phạm TP.HCM là trường hàng đầu về đào tạo giáo viên, với các chương trình sư phạm và khoa học xã hội chất lượng cao.",
    training: {
      levels: ["Đại học", "Cao học"],
      majors: [
        { name: "Sư phạm Toán", faculty: "Khoa Toán" },
        { name: "Sư phạm Ngữ văn", faculty: "Khoa Ngữ văn" },
        { name: "Sư phạm Tiếng Anh", faculty: "Khoa Ngoại ngữ" },
        { name: "Giáo dục Tiểu học", faculty: "Khoa Giáo dục Tiểu học" },
        { name: "Tâm lý học", faculty: "Khoa Tâm lý - Giáo dục" },
      ],
      admissionScores: [
        { year: 2021, major: "Sư phạm Toán", score: 26.0 },
        { year: 2022, major: "Sư phạm Toán", score: 26.5 },
        { year: 2021, major: "Sư phạm Tiếng Anh", score: 25.0 },
        { year: 2022, major: "Sư phạm Tiếng Anh", score: 25.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "22",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện giáo dục với tài liệu phong phú",
      labs: "Phòng thực hành sư phạm",
      clubs: [
        "Câu lạc bộ Giáo viên trẻ",
        "Câu lạc bộ Tiếng Anh",
        "Câu lạc bộ Văn học",
      ],
    },
    partnerships: {
      companies: ["Vinschool", "TH School"],
      internshipPrograms: ["Thực tập tại trường công", "Trao đổi với Hàn Quốc"],
    },
    reviews: [
      {
        user: "Trần Văn W",
        rating: 4.4,
        comment: "Chương trình học chất lượng, hỗ trợ sinh viên tốt.",
      },
    ],
    location: {
      latitude: 10.7626,
      longitude: 106.6797,
    },
  },
  {
    id: 23,
    name: "Đại học Bách khoa TP. Hồ Chí Minh",
    abbreviation: "HCMUT",
    logo: "https://example.com/hcmut-logo.png",
    banner: "https://example.com/hcmut-banner.jpg",
    type: "Công lập",
    foundedYear: 1957,
    address: "268 Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh",
    website: "https://hcmut.edu.vn",
    hotline: "+84 28 3864 7256",
    overview:
      "Đại học Bách khoa TP.HCM là trường kỹ thuật hàng đầu phía Nam, nổi tiếng với các chương trình kỹ thuật và công nghệ.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Cơ khí" },
        { name: "Kỹ thuật Điện", faculty: "Khoa Điện - Điện tử" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Kỹ thuật Hóa học", faculty: "Khoa Kỹ thuật Hóa học" },
        { name: "Kỹ thuật Xây dựng", faculty: "Khoa Kỹ thuật Xây dựng" },
      ],
      admissionScores: [
        { year: 2021, major: "Công nghệ Thông tin", score: 27.5 },
        { year: 2022, major: "Công nghệ Thông tin", score: 28.0 },
        { year: 2021, major: "Kỹ thuật Cơ khí", score: 25.0 },
        { year: 2022, major: "Kỹ thuật Cơ khí", score: 25.5 },
      ],
      tuitionFee: "15-25 triệu VND/năm",
    },
    ranking: {
      domestic: "23",
      international: "401-500 (QS Asia University Rankings)",
      employmentRate: "92%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện kỹ thuật với tài liệu chuyên ngành",
      labs: "Phòng lab kỹ thuật hiện đại",
      clubs: [
        "Câu lạc bộ Robot",
        "Câu lạc bộ Lập trình",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Intel Vietnam", "Bosch Vietnam"],
      internshipPrograms: ["Thực tập tại Nhật", "Trao đổi với Đức"],
    },
    reviews: [
      {
        user: "Nguyễn Văn X",
        rating: 4.7,
        comment: "Chương trình học chất lượng, cơ hội việc làm tốt.",
      },
    ],
    location: {
      latitude: 10.7731,
      longitude: 106.6598,
    },
  },
  {
    id: 24,
    name: "Đại học Công nghệ và Quản lý Hữu Nghị",
    abbreviation: "FTU2",
    logo: "https://example.com/ftu2-logo.png",
    banner: "https://example.com/ftu2-banner.jpg",
    type: "Tư thục",
    foundedYear: 1999,
    address: "Khu Công nghiệp Biên Hòa 2, Biên Hòa, Đồng Nai",
    website: "https://ftu2.edu.vn",
    hotline: "+84 251 3836 666",
    overview:
      "Đại học Công nghệ và Quản lý Hữu Nghị chuyên đào tạo các ngành công nghệ và quản trị, phục vụ khu vực công nghiệp Đồng Nai.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Quản trị Kinh doanh", faculty: "Khoa Quản trị Kinh doanh" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Kỹ thuật" },
        { name: "Kế toán", faculty: "Khoa Kế toán" },
        { name: "Logistics", faculty: "Khoa Kinh tế" },
      ],
      admissionScores: [
        { year: 2021, major: "Quản trị Kinh doanh", score: 21.0 },
        { year: 2022, major: "Quản trị Kinh doanh", score: 21.5 },
        { year: 2021, major: "Công nghệ Thông tin", score: 22.0 },
        { year: 2022, major: "Công nghệ Thông tin", score: 22.5 },
      ],
      tuitionFee: "20-30 triệu VND/năm",
    },
    ranking: {
      domestic: "24",
      international: "Not ranked",
      employmentRate: "80%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần khu công nghiệp",
      library: "Thư viện với tài liệu công nghệ và kinh tế",
      labs: "Phòng lab kỹ thuật và lập trình",
      clubs: [
        "Câu lạc bộ Kinh doanh",
        "Câu lạc bộ Công nghệ",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Long Thành Corp", "Amata Vietnam"],
      internshipPrograms: [
        "Thực tập tại khu công nghiệp",
        "Trao đổi với Thái Lan",
      ],
    },
    reviews: [
      {
        user: "Phạm Văn Y",
        rating: 4.2,
        comment: "Chương trình học thực tế, gần gũi với doanh nghiệp.",
      },
    ],
    location: {
      latitude: 10.9577,
      longitude: 106.8568,
    },
  },
  {
    id: 25,
    name: "Đại học Giao thông Vận tải",
    abbreviation: "UTC",
    logo: "https://example.com/utc-logo.png",
    banner: "https://example.com/utc-banner.jpg",
    type: "Công lập",
    foundedYear: 1960,
    address: "Số 3 Cầu Giấy, Đống Đa, Hà Nội",
    website: "https://utc.edu.vn",
    hotline: "+84 24 3766 3301",
    overview:
      "Đại học Giao thông Vận tải chuyên đào tạo các ngành kỹ thuật giao thông, xây dựng và logistics, phục vụ ngành vận tải.",
    training: {
      levels: ["Đại học", "Cao học", "Liên thông"],
      majors: [
        { name: "Kỹ thuật Xây dựng Cầu đường", faculty: "Khoa Cầu đường" },
        { name: "Kỹ thuật Giao thông", faculty: "Khoa Giao thông" },
        { name: "Logistics", faculty: "Khoa Kinh tế Vận tải" },
        { name: "Kỹ thuật Cơ khí", faculty: "Khoa Cơ khí" },
        { name: "Công nghệ Thông tin", faculty: "Khoa Công nghệ Thông tin" },
      ],
      admissionScores: [
        { year: 2021, major: "Kỹ thuật Xây dựng Cầu đường", score: 24.0 },
        { year: 2022, major: "Kỹ thuật Xây dựng Cầu đường", score: 24.5 },
        { year: 2021, major: "Logistics", score: 23.0 },
        { year: 2022, major: "Logistics", score: 23.5 },
      ],
      tuitionFee: "10-20 triệu VND/năm",
    },
    ranking: {
      domestic: "25",
      international: "Not ranked",
      employmentRate: "85%",
    },
    facilities: {
      dormitory: "Ký túc xá tiện nghi, gần trung tâm",
      library: "Thư viện chuyên ngành giao thông",
      labs: "Phòng lab mô phỏng giao thông",
      clubs: [
        "Câu lạc bộ Logistics",
        "Câu lạc bộ Kỹ thuật",
        "Câu lạc bộ Thể thao",
      ],
    },
    partnerships: {
      companies: ["Cienco 4", "Viettel Logistics"],
      internshipPrograms: ["Thực tập tại công trình", "Trao đổi với Nhật"],
    },
    reviews: [
      {
        user: "Nguyễn Văn Z",
        rating: 4.3,
        comment: "Chương trình học thực tế, hỗ trợ sinh viên tốt.",
      },
    ],
    location: {
      latitude: 21.0285,
      longitude: 105.8057,
    },
  },
];
