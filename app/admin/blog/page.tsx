import BlogAdminPage from '@/components/admin/blog/BlogAdminPage';

export const metadata = {
  title: 'Blog Admin — Teambotics',
  robots: { index: false, follow: false },
};

export default function BlogAdminRoute() {
  return <BlogAdminPage />;
}
