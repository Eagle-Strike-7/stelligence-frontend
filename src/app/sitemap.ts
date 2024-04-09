import { ServerNode } from '@/types/graph/GraphProps';
import { MetadataRoute } from 'next';

const CLIENT_URL = 'https://www.stelligence.site';

export const getPosts = () => {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents`, {
    next: { revalidate: 60 * 10 }, // 10분 캐시
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch(() => {
      return [];
    });
};

const Sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const posts = await getPosts();
  const nodes = posts.results.documentNodes;

  const stars = nodes.map((node: ServerNode) => {
    return {
      url: `https://www.stelligence.site/stars/${node.documentId}}`,
      lastModified: new Date().toISOString(),
    };
  });

  const routes = [
    '',
    '/login',
    '/stars',
    '/new-star',
    '/vote-list',
    '/debate-list',
    '/mypage',
    '/info',
  ].map((route: string) => {
    return {
      url: `${CLIENT_URL}${route}`,
      lastModified: new Date().toISOString(),
    };
  });
  return [...routes, ...stars];
};

export default Sitemap;
