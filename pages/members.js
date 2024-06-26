import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function Members() {
  const [members, setMembers] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchMembers();
    }
  }, [session]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      if (data.success) {
        setMembers(data.members);
      }
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  if (!session) return <p>Please sign in to view club members.</p>;

  return (
    <Layout>
      <h1>Club Members</h1>
      <ul>
        {members.map(member => (
          <li key={member._id}>{member.name} - {member.course}</li>
        ))}
      </ul>
    </Layout>
  );
}