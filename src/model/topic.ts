import { Category } from './category'

export interface Topic {
  id: string
  title: string
  summary: string
  content: string
  recommand: number
  viewCount: number
  commentCount: number
  likeCount: number
  favoriteCount: number
  lastCommentTime: string
  lastCommentUser: string
  userAgent: string
  ip: string
  category: Category
  userId: string
  createAt: string
  updateAt: string
  user: any
}

export type CreateTopicParam = Pick<Topic, 'title' | 'content' | 'summary'> & { categoryId: string }
