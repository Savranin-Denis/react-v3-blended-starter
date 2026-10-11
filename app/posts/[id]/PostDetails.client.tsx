'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';

export default function PostDetailsClient() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  const { data, isLoading, error } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  const handleClickBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!data) return;
    const fn = async () => {
      const response = await fetchUserById(data.userId);
      setUser(response);
    };
    fn();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <main className={css.main}>
        {data && (
          <div className={css.container}>
            <div className={css.item}>
              <button onClick={handleClickBack} className={css.backBtn}>
                ← Back
              </button>

              <div className={css.post}>
                <div className={css.wrapper}>
                  <div className={css.header}>
                    <h2>{data.title}</h2>
                  </div>

                  <p className={css.content}>{data.body}</p>
                </div>
                <p className={css.user}>Author: {user?.name}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
