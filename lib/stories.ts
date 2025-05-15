export type Story = {
  id: string;
  title: string;
  author: string;
  url: string;
  image: string;
};

export const stories: Story[] = [
  {
    id: "1",
    title: "The Tale of Peter Rabbit",
    author: "Beatrix Potter",
    url: "https://www.gutenberg.org/ebooks/14838",
    image: "https://www.gutenberg.org/cache/epub/14838/pg14838.cover.medium.jpg",
  },
  {
    id: "2",
    title: "The Velveteen Rabbit",
    author: "Margery Williams",
    url: "https://www.gutenberg.org/ebooks/11757",
    image: "https://www.gutenberg.org/cache/epub/11757/pg11757.cover.medium.jpg",
  },
  // Add more stories as needed
];
