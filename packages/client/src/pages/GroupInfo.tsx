import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '#/services/api'

const GroupInfo = () => {
  const { groupTid } = useParams()

  if (!groupTid) {
    return <div>Error: No group tid</div>
  }

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['group', groupTid],
    queryFn: () => api.getGroup({ tid: groupTid }),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-row gap-4">
      <Link to="/" className="text-gray-500 hover:text-gray-700 font-bold">
        {'<'}
      </Link>
      <h1>Merchant Group: {response?.data.group.name}</h1>
    </div>
  )
}

export default GroupInfo
