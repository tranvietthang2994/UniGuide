export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnailUrl?: string;
  author: string;
  universityId?: number;
  category?: string;
  status: number; // 1: Draft, 2: Published, 3: Archived
  publishedAt?: string;
  createdAt: string;
  updatedAt?: string;
  university?: {
    id: number;
    name: string;
    logoUrl?: string;
  };
}

export interface BlogListParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: number;
  search?: string;
  universityId?: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
