'use client';

import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostPreviewClient() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  useEffect(() => {
    if (!data) return;
    const fn = async () => {
      const response = await fetchUserById(data.userId);
      setUser(response);
    };
    fn();
  }, []);

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <Modal onClose={handleClose}>
      <button className={css.backBtn}>← Back</button>
      <div className={css.post}>
        <div className={css.wrapper}>
          <div className={css.header}>
            <h2>{data?.title}</h2>
          </div>

          <p className={css.content}>{data?.body}</p>
        </div>
        <p className={css.user}>{user?.name}</p>
      </div>
    </Modal>
  );
}
