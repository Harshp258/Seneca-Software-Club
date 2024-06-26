import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const MainNav = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <Link href="/feed">Feed</Link>
          <Link href="/members">Club Members</Link>
          <Link href="/todo">To-Do List</Link>
          <div className="dropdown">
            <button>Account</button>
            <div className="dropdown-content">
              <a onClick={handleLogout}>Logout</a>
            </div>
          </div>
          <Link href="/feed">
            <button>+ Create Post</button>
          </Link>
        </>
      ) : (
        <Link href="/signin">Join Now</Link>
      )}
    </nav>
  );
};

export default MainNav;