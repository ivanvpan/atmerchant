// import StatusForm from '#/components/MerchantForm'
import GroupList from '#/components/MerchantList'
import api from '#/services/api'
import { useState } from 'react'

const HomePage = () => {
  const [groupName, setGroupName] = useState('')

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Merchant Groups
        </h2>
        <GroupList />
        <input
          type="text"
          placeholder="Enter group name"
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button type="button" onClick={() => api.putGroup({ name: groupName })}>
          Create
        </button>
      </div>
    </div>
  )
}

export default HomePage
