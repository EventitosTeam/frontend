import { CircleCheck } from "lucide-react"
import CalendarItem from "./calendar-item"

type Booking = {
    booking_code: string
    event: {
        date: string
        desciption: string
        event_place_lat: string
        event_place_lon: string
        id: number
        name: string
        people_limit: number
    }
    event_id: number
    id: number
    registered: boolean
    user: string
}

interface Props {
    booking: Booking
}

export const EventInfo: React.FC<Props> = ({ booking }) => {
  return (
    <div className="bg-[#323C3F] py-10 px-5 rounded-lg w-[30%]">
        <div className="flex flex-col space-y-2">
            <h2 className="font-medium text-[22px] uppercase text-white">{booking.event.name}</h2>
            <CalendarItem fecha={booking.event.date} />
        </div>
        {/* <h3 className=" text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, placeat numquam. Dicta quasi sed.</h3> */}
        <hr className="my-3" />
        <div className="flex flex-col space-y-3 text-white">
            <span>Codigo del evento:</span>
            <span className=" underline ">{booking.booking_code}</span>
            {
                true && (
                    <>
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-[#2AD2B1]">
                            <CircleCheck size={24} className="" />
                            <span className="">REGISTRADO</span>
                        </div>
                    </>
                )
            }

            <div className="flex flex-col space-y-1 text-[16px]">
                <span>
                    {
                        booking.user
                    }
                </span>
                {/* <span>42265179</span> */}
            </div>
        </div>
    </div>
  )
}
