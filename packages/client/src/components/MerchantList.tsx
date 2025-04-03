import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

import api from '#/services/api'

const StatusList = () => {
  // Use React Query to fetch and cache statuses
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const { data } = await api.getMerchants(undefined)
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
  const merchants = data?.merchants || []

  if (isPending && !data) {
    return (
      <div className="py-8 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading merchants...
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

  if (merchants.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500 dark:text-gray-400">
        No merchants yet.
      </div>
    )
  }


  return (
    <div className="px-4">
      <div className="relative">
        {merchants.map((merchant) =>
          <div key={merchant}>{merchant}</div>
        )}
      </div>
    </div>
  )
}

export default StatusList
