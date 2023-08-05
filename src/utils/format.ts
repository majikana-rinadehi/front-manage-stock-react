import { format } from "date-fns"


export const getYYYY_MM_DD = (timeStamp: string): string => {
    return format(new Date(timeStamp), 'yyyy-MM-dd')
}

export const getYYYY_MM = (timeStamp: string): string => {
    return format(new Date(timeStamp), 'yyyy-MM')
}

export const getMMDD = (timeStamp: string): string => {
    return format(new Date(timeStamp), 'M/d')
}