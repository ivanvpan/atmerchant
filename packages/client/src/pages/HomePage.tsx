// import StatusForm from '#/components/MerchantForm'
import GroupList from '#/components/GroupList'
import api from '#/services/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const HomePage = () => {
  const [groupName, setGroupName] = useState('')
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (name: string) => api.putGroup({ name }),
    onSuccess: (response) => {
      console.log('onSuccess', response)
      // Update the cache directly with the returned groups
      queryClient.setQueryData(['merchantGroups'], response.data)
      setGroupName('')
    },
  })

  return (
    <div>
      <div>
        <h1 className="text-xl font-semibold mb-4">Merchant Groups</h1>
        <div className="flex gap-4 mb-4">
          <input
            className="border border-gray-300 rounded-md p-2"
            type="text"
            placeholder="Enter group name"
            onChange={(e) => setGroupName(e.target.value)}
            value={groupName}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            type="button"
            onClick={() => mutation.mutate(groupName)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating...' : 'Create Group'}
          </button>
        </div>

        <GroupList />
      </div>
    </div>
  )
}

export default HomePage
