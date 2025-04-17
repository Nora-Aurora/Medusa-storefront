'use client'
import { sdk } from '@/lib/medusa/config'
import { useQuery } from '@tanstack/react-query'
import { HttpTypes } from "@medusajs/types"

export const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export const fetchRegions = async (): Promise<HttpTypes.StoreRegion[]> => {
    const res = await sdk.store.region.list()
    return res.regions
  }

export default function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const {data:regionData,isLoading:isLoadingRegion,error:errorRegion} = useQuery<HttpTypes.StoreRegion[]>({
    queryKey: ['regions'],
    queryFn: fetchRegions,
  })

  console.log('regionData', regionData)
  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {/* {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))} */}
      {
        regionData?.map((region) => (
          <li key={region.currency_code}>{region.name}</li>
        ))
      }
    </ul>
  )
}
