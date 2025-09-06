import { startOfWeek, addDays, formatISO } from 'date-fns'
export function isoDate(date: Date) { return formatISO(date, { representation: 'date' }) }
export function weekStart(date: Date) { return startOfWeek(date, { weekStartsOn: 1 }) }
export function daysOfWeek(start: Date) { return Array.from({ length: 7 }).map((_,i)=> addDays(start,i)) }
