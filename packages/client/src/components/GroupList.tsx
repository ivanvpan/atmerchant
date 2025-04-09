import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import api from '#/services/api'

const GroupList = () => {
  // Use React Query to fetch and cache statuses
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['merchantGroups'],
    queryFn: async () => {
      const { data } = await api.listGroups(undefined)
      return data
    },
    placeholderData: (previousData) => previousData, // Use previous data while refetching
    refetchInterval: 30e3, // Refetch every 30 seconds
  })

  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  // Destructure data
  const groups = data?.groups || []

  if (isPending && !data) {
    return (
      <div className="py-8 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading merchant groups...
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="py-4 text-red-500">
        {(error as Error)?.message || 'Failed to load statuses'}
      </div>
    )
  }

  if (groups.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500 dark:text-gray-400">
        No merchants yet.
      </div>
    )
  }

  return (
    <div>
      <div className="relative">
        {groups.map((group) => (
          <div key={group.tid}>
            <Link to={`/group/${group.tid}`}>{group.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupList
