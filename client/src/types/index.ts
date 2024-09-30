export interface Image {
  _id: string;
  url: string;
  originalName: string;
  filename?: string;
  createdAt: string;
}

export interface ImageCardProps {
  image: Image;
}
