import { useQuery } from '@tanstack/react-query';
import { WordPressService, BlogPost } from '@/services/WordPressService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, ExternalLink, Calendar, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const BlogSection = () => {
  const { toast } = useToast();
  
  const {
    data: posts,
    isLoading,
    error,
    refetch,
    isFetching,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['wordpress-posts'],
    queryFn: () => WordPressService.fetchLatestPosts(4),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });

  const handleSync = async () => {
    try {
      await refetch();
      toast({
        title: "Blog posts synced!",
        description: "Latest posts have been fetched from WordPress.",
      });
    } catch (error) {
      toast({
        title: "Sync failed",
        description: "Failed to fetch latest posts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const lastUpdated = dataUpdatedAt ? formatDistanceToNow(new Date(dataUpdatedAt), { addSuffix: true }) : null;

  if (error) {
    return (
      <section id="blog" className="section-padding bg-secondary/30">
        <div className="container-modern">
          <div className="text-center space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold">Latest Blog Posts</h2>
            <div className="card-modern p-8 text-center">
              <p className="text-muted-foreground mb-4">Failed to load blog posts</p>
              <Button onClick={handleSync} disabled={isFetching}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-padding bg-secondary/30">
      <div className="container-modern">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights on cybersecurity, vulnerability assessment, and industry trends
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              onClick={handleSync}
              disabled={isFetching}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Last updated {lastUpdated}
              </p>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="card-modern">
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-4 w-1/4 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {posts.map((post: BlogPost) => (
                <Card key={post.id} className="card-modern card-hover group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author.name}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      asChild
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Read More
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild variant="outline">
                <a 
                  href="https://chaitravm.wordpress.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Visit Full Blog
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;