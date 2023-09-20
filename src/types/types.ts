export interface AuthorType {
  id: number;
  img: string;
  username: string;
}

export interface RatingType {
  result: number;
}

export interface TagType {
  tag_name: string;
}

export interface PostType {
  author: AuthorType;
  id: string;
  rating: RatingType;
  tags: TagType[];
  text: string;
  subject: string;
}

export type PostProps = {
    index: number,
    post: PostType
}

export type LoginPass = {
  username: string,
  password: string
}

export type PostListComponentPropsType = {
    items: Array<PostType>
}

export type sendScoreType = {
  postId: string | undefined
  score: number
}

// Registration
export type returnFinishReg = {
    email: string,
    username: string,
    password: string,
    remember: boolean
}