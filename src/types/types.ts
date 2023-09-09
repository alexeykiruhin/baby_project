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
  id: number;
  rating: RatingType;
  tags: TagType[];
  text: string;
  subject: string;
}

export type PostProps = {
    index: number,
    post: PostType | null
}
