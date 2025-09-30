// API client for universities

export interface UniversityListParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: string; // "1" | "2" | "3"
  region?: string; // "1" | "2" | "3"
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface ReviewListParams {
  page?: number;
  limit?: number;
}

export interface CreateReviewData {
  rating: number;
  comment?: string;
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
  region: number;
  rating: number;
  location: {
    latitude: number;
    longitude: number;
  };
  ranking: {
    domestic: string;
    international: string;
    employmentRate: string;
  };
  training: {
    levels: string[];
    majors: Array<{
      id?: number;
      name: string;
      faculty: string;
      admissionScores?: Array<{
        year: number;
        major: string;
        score: number;
        block?: string;
        quota?: number;
      }>;
    }>;
    tuitionFee: string;
    admissionScores: Array<{
      year: number;
      major: string;
      score: number;
    }>;
  };
  facilities: {
    dormitory: string;
    library: string;
    labs: string;
    clubs?: string[];
  };
  partnerships: {
    companies: string[];
    internshipPrograms: string[];
  };
  reviews: Review[];
  averageRating: number;
  totalReviews?: number;
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
}

class UniversityAPI {
  private baseUrl = "/api/universities";

  async getUniversities(
    params: UniversityListParams = {}
  ): Promise<ApiResponse<University[]>> {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    const url = `${this.baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    console.log("Frontend API call:", { params, url });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUniversityById(id: number): Promise<ApiResponse<University>> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUniversityReviews(
    universityId: number,
    params: ReviewListParams = {}
  ): Promise<
    ApiResponse<{
      reviews: Review[];
      pagination: any;
      averageRating: number;
      totalReviews: number;
    }>
  > {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    const url = `${this.baseUrl}/${universityId}/reviews${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createReview(
    universityId: number,
    reviewData: CreateReviewData
  ): Promise<ApiResponse<Review>> {
    const response = await fetch(`${this.baseUrl}/${universityId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.error || `HTTP error! status: ${response.status}`,
      } as any;
    }

    return response.json();
  }
}

// Export singleton instance
export const universityAPI = new UniversityAPI();

// Export utility functions
export const getUniversityTypeText = (type: number): string => {
  switch (type) {
    case 1:
      return "Công lập";
    case 2:
      return "Tư thục";
    case 3:
      return "Quốc tế";
    default:
      return "N/A";
  }
};

export const getRegionText = (region: number): string => {
  switch (region) {
    case 1:
      return "Miền Bắc";
    case 2:
      return "Miền Trung";
    case 3:
      return "Miền Nam";
    default:
      return "N/A";
  }
};
