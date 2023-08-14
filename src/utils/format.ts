import { format } from "date-fns"

type TimeFormat = 'yyyy-MM-dd' | 'yyyy-MM' | 'M/d' | 'yyyy/MM/dd'

/**
 * Returns timestamp string formatted into specified `format`.  
 * If `timestamp` is INVALID, returns as-is `timeStamp` string.
 * @param timeStamp timestamp string
 * @param {TimeFormat} dateFormat 
 * @returns 
 */
export const getFormattedTimeStamp = (timeStamp: string, dateFormat: TimeFormat): string => {
    const isValidDate = !isNaN(new Date(timeStamp).getTime())
    return isValidDate ? format(new Date(timeStamp), dateFormat) : timeStamp
}