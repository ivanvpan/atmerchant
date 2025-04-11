import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '#/services/api'

const LocationInfo = () => {
  const { groupTid, locationTid } = useParams()

  return (
    <div>
      <div>
        <h1>Location Info</h1>
        <p>{locationTid}</p>
      </div>
    </div>
  )
  // const { data: catalogs } = useQuery({
  //   queryKey: ['catalogs', locationTid],
  //   queryFn: () => api.listCatalogs(locationTid),
  // })

  //   <div>
  //     <h2>Catalogs</h2>
  //     {catalogs?.data.catalogs.map((catalog) => (
  //       <p key={catalog.tid}>{catalog.name}</p>
  //     ))}
  //   </div>
  // )
}

export default LocationInfo
