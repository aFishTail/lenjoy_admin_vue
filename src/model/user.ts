export interface User  {
  id: string;
  username: string;
  password: string;
  nickname: string;
  avatar: string; // 头像
  email: string; // 邮箱
  emailVerified: boolean; // 邮箱
  description: string;
  // type: string; // 用户类型
  score: number;
  topicCount: number;
  commentCount: number;
  fansCount: number;
  followCount: number;
  role: string; // 用户角色
  status: string; // 用户状态
  forbiddenEndTime: Date;
  createAt: Date;
  updateAt: Date;

}