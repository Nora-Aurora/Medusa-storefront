'use client';

import { useGlobalContext } from '@/lib/context/GlobalContext';
import React from 'react';

function Loading() {
  const { loading } = useGlobalContext();
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10">
        <span className="loading loading-bars text-success loading-xl"></span>
      </div>
    );
}

export default Loading;
