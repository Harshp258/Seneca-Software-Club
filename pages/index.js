import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <h1>Welcome to Seneca Software Club</h1>
      <p>Join our community of developers!</p>
      <Link href="/signup">
        <button>Join Now</button>
      </Link>
    </Layout>
  );
}