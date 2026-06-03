import dayjs from "dayjs"

export function DateFormatter(date:Date){
    const time = dayjs(date).format('MMMM DD, YYYY')
    
    
           return time
}