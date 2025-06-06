import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export type AvailabilityTimeOfDay = {
  localHour: number
  localMinute: number
}

export type CatalogAvailabilityPeriod = {
  start: AvailabilityTimeOfDay
  end: AvailabilityTimeOfDay
  dayOfWeek:
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'
    | 'SUNDAY'
}

export function isActiveCatalog(
  periods: CatalogAvailabilityPeriod[],
  timezone: string,
) {
  const now = dayjs().tz(timezone)
  return periods.some((period) => {
    const dayOfWeek = now
      .format('dddd')
      .toUpperCase() as CatalogAvailabilityPeriod['dayOfWeek']
    const start = dayjs()
      .tz(timezone)
      .set('hour', period.start.localHour)
      .set('minute', period.start.localMinute)
    const end = dayjs()
      .tz(timezone)
      .set('hour', period.end.localHour)
      .set('minute', period.end.localMinute)
    return (
      dayOfWeek === period.dayOfWeek && now.isAfter(start) && now.isBefore(end)
    )
  })
}
