'use client';
import { useGlobalContext } from '@/lib/context/GlobalContext';
import { sdk } from '@/lib/medusa/config';
import { HttpTypes } from '@medusajs/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
};

export const fetchRegions = async (): Promise<HttpTypes.StoreRegion[]> => {
  const res = await sdk.store.region.list();
  return res.regions;
};

export default function UserList() {
  const { setLoading, setError } = useGlobalContext();
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const {
    data: regionData,
    isLoading: isLoadingRegion,
    error: errorRegion,
  } = useQuery<HttpTypes.StoreRegion[]>({
    queryKey: ['regions'],
    queryFn: fetchRegions,
  });

  useEffect(() => {
    setLoading(isLoadingRegion);
    setError(errorRegion?.message || null);
  }, [isLoadingRegion, errorRegion]);
  return (
    <ul>
      {/* {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))} */}
      {regionData?.map(region => <li key={region.currency_code}>{region.name}</li>)}
    </ul>
  );
}
