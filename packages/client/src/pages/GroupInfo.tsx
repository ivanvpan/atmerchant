import { Link, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import api from '#/services/api'

interface LocationFormData {
  name: string
  timezone: string
  externalId?: string
  address: {
    country: string
    postalCode: string
    region: string
    locality: string
    street: string
  }
  coordinates: {
    latitude: string
    longitude: string
  }
}

const GroupInfo = () => {
  const { groupTid } = useParams()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LocationFormData>()

  if (!groupTid) {
    return <div>Error: No group tid</div>
  }

  // TODO how to avoid two requests?
  const {
    data: groupResponse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['group', groupTid],
    queryFn: () => api.getGroup({ tid: groupTid }),
  })

  const {
    data: locationsResponse,
    isLoading: locationsLoading,
    isError: isLocationsError,
    error: locationsError,
  } = useQuery({
    queryKey: ['locations', groupTid],
    queryFn: () => api.listLocations({ groupTid }),
  })

  const createLocationMutation = useMutation({
    mutationFn: (data: LocationFormData) => {
      return api.putLocation({
        groupTid,
        name: data.name,
        timezone: data.timezone,
        externalId: data.externalId,
        address: data.address,
        coordinates: data.coordinates,
        parentGroup: groupResponse?.data.group.uri || '',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', groupTid] })
      reset()
    },
  })

  const onSubmit = (data: LocationFormData) => {
    createLocationMutation.mutate(data)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row gap-4">
        <Link to="/" className="text-gray-500 hover:text-gray-700 font-bold">
          {'<'}
        </Link>
        <h1 className="text-2xl font-bold">
          Merchant Group: {groupResponse?.data.group.name}
        </h1>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create New Location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="name"
                className="w-24 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Location name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: 1,
                  maxLength: 128,
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="externalId"
                className="w-24 text-sm font-medium text-gray-700"
              >
                External ID
              </label>
              <input
                id="externalId"
                type="text"
                placeholder="Optional"
                {...register('externalId', { maxLength: 64 })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="timezone"
              className="w-24 text-sm font-medium text-gray-700"
            >
              Timezone
            </label>
            <input
              id="timezone"
              type="text"
              placeholder="e.g. America/New_York"
              {...register('timezone', {
                required: 'Timezone is required',
                maxLength: 128,
              })}
              className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="latitude"
                className="w-24 text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                id="latitude"
                type="text"
                placeholder="e.g. 40.7128"
                {...register('coordinates.latitude', {
                  required: 'Latitude is required',
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="longitude"
                className="w-24 text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                id="longitude"
                type="text"
                placeholder="e.g. -74.0060"
                {...register('coordinates.longitude', {
                  required: 'Longitude is required',
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="street"
              className="w-24 text-sm font-medium text-gray-700"
            >
              Street
            </label>
            <input
              id="street"
              type="text"
              placeholder="Street address"
              {...register('address.street', {
                required: 'Street address is required',
              })}
              className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="city"
                className="w-16 text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="City"
                {...register('address.locality', {
                  required: 'City is required',
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="region"
                className="w-16 text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="region"
                type="text"
                placeholder="State/Region"
                {...register('address.region', {
                  required: 'State/Region is required',
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label
                htmlFor="postalCode"
                className="w-16 text-sm font-medium text-gray-700"
              >
                ZIP
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder="Postal code"
                {...register('address.postalCode', {
                  required: 'Postal code is required',
                })}
                className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="country"
              className="w-24 text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="e.g. US"
              {...register('address.country', {
                required: 'Country is required',
                minLength: 2,
                maxLength: 10,
              })}
              className="flex-1 h-10 pl-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
          {errors.externalId && (
            <p className="text-sm text-red-600">{errors.externalId.message}</p>
          )}
          {errors.timezone && (
            <p className="text-sm text-red-600">{errors.timezone.message}</p>
          )}
          {errors.coordinates?.latitude && (
            <p className="text-sm text-red-600">
              {errors.coordinates.latitude.message}
            </p>
          )}
          {errors.coordinates?.longitude && (
            <p className="text-sm text-red-600">
              {errors.coordinates.longitude.message}
            </p>
          )}
          {errors.address?.street && (
            <p className="text-sm text-red-600">
              {errors.address.street.message}
            </p>
          )}
          {errors.address?.locality && (
            <p className="text-sm text-red-600">
              {errors.address.locality.message}
            </p>
          )}
          {errors.address?.region && (
            <p className="text-sm text-red-600">
              {errors.address.region.message}
            </p>
          )}
          {errors.address?.postalCode && (
            <p className="text-sm text-red-600">
              {errors.address.postalCode.message}
            </p>
          )}
          {errors.address?.country && (
            <p className="text-sm text-red-600">
              {errors.address.country.message}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={createLocationMutation.isPending}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {createLocationMutation.isPending
                ? 'Creating...'
                : 'Create Location'}
            </button>
          </div>

          {createLocationMutation.isError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">
                Error creating location: {createLocationMutation.error.message}
              </div>
            </div>
          )}
        </form>
      </div>
      <div className="mt-8 text-xl font-semibold"> Locations </div>
      {locationsResponse && (
        <div className="grid grid-cols-3 gap-4">
          {locationsResponse.data.locations.map((location) => (
            <Link
              to={`/merchant/${groupTid}/location/${location.tid}`}
              key={location.tid}
            >
              {location.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default GroupInfo
