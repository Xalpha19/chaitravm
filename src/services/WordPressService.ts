export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  link: string;
  featured_image?: string;
  author: {
    name: string;
  };
}

export interface WordPressResponse {
  posts: BlogPost[];
  found: number;
}

const WORDPRESS_API_URL = 'https://public-api.wordpress.com/rest/v1.1/sites/chaitravm.wordpress.com/posts/';

export class WordPressService {
  static async fetchLatestPosts(count: number = 4): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${WORDPRESS_API_URL}?number=${count}&fields=ID,title,excerpt,content,date,URL,featured_image,author`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: WordPressResponse = await response.json();
      
      return data.posts.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: this.stripHtml(post.excerpt),
        content: post.content,
        date: post.date,
        link: post.link,
        featured_image: post.featured_image,
        author: post.author
      }));
    } catch (error) {
      console.error('Error fetching WordPress posts:', error);
      throw error;
    }
  }

  private static stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
}