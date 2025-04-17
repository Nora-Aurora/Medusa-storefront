'use client'
import { useQuery } from '@tanstack/react-query'

export const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  if (!res.ok) throw new Error('Network response was not ok')
  return res.json()
}

export default function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  if (isLoading) return <p>Loading...</p>
  if (error instanceof Error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
