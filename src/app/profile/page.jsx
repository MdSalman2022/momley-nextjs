'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function UserRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/user/edit-profile');
  }, [router]);

  return null;
}