"use client"

import eventitosApi from "@/api/eventitos-api"
import { Skeleton } from "@/components/ui/skeleton"
import { useSheetEvent } from "@/hooks/use-sheet-event"
import { useEffect, useState } from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Ticket } from "lucide-react"
import { Map } from "@/components/map"

type Event = {
    id: number
    name: string
    desciption: string
    event_place_lat: string
    event_place_lon: string
    people_limit: number
    date: string
}

export const EventList = () => {

    const { isOpen, onClose, onOpen, onOpenSetEvent } = useSheetEvent()

    const [events, setEvents] = useState<Event[] | undefined>()

    const getEvents = async () => {
        const resp = await eventitosApi.get(
            `/events`
        )

        const events = await resp.data

        return events

        // console.log(events)

        // setEvents(events)
        
    }

    useEffect(() => {
        const fetchEvents = async () => {
            const resp = await getEvents()
            // console.log(resp)
            setEvents(resp)
        }

        fetchEvents()
    }, [])

  return (
    <>

    <div className="flex flex-col w-full px-10 my-3 space-y-3">
        <h1 className="text-4xl font-bold text-white">Eventos</h1>

            {
                events === undefined && (
                    <div className="">
                            <div className="flex flex-col items-center space-y-4">
                                <Skeleton className="h-[110px] w-full rounded-sm bg-[#3b484b]" />
                                <Skeleton className="h-[110px] w-full rounded-sm bg-[#3b484b]" />
                                <Skeleton className="h-[110px] w-full rounded-sm bg-[#3b484b]" />
                                <Skeleton className="h-[110px] w-full rounded-sm bg-[#3b484b]" />
                                <Skeleton className="h-[110px] w-full rounded-sm bg-[#3b484b]" />
                            </div>
                    </div>
                )
            }

        <ul className="flex flex-col space-y-4 w-full items-center">

            {
                events && (
                    events.map((event) => {
                        return (
                            <>
                            <HoverCard>
                            <HoverCardTrigger asChild>
                                <button
                                className="bg-[#323C3F] hover:bg-[#3b484b] w-full px-2 py-1 rounded-sm text-white text-left"
                                key={event.id}
                                onClick={
                                    () => {
                                        onOpenSetEvent(event)
                                    }
                                }
                                >
                                    <div className="p-2">
                                        {event.name}
                                    </div>
                                    <hr className="" />
                                    <div className="p-2">
                                        {event.desciption}<br/>
                                        Espacios disponibles: {event.people_limit}<br/>
                                    </div>
                                </button>
                            </HoverCardTrigger>
                                <HoverCardContent className="w-80 h-80">
                                        <div className="flex items-center space-x-2">
                                            <Ticket size={22} className="" />
                                            <h2 className="text-[18px] font-medium">Evento {event.name}</h2>
                                        </div>
                                            <hr className="my-2" />
                                            <Map />
                                </HoverCardContent>
                            </HoverCard>
                            </>
                        )
                    })
                )
            }

        </ul>

    </div>
    </>
  )
}
