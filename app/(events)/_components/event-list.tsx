"use client"

import eventitosApi from "@/api/eventitos-api"
import { useEffect, useState } from "react"


export const EventList = () => {

    const [events, setEvents] = useState([])

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

    <div className="flex flex-col justify-center items-center w-full bg-blue-500 p-10">
        <h1 className="text-4xl font-bold text-white">Eventos</h1>
        <ul className="flex flex-col space-y-4 mt-3 w-full items-center">

            {
                events && (
                    events.map((event) => {
                        return (
                            <button
                            className="bg-blue-600 hover:bg-blue-400 w-[30%] px-2 py-1 rounded-sm text-white"
                            key={event.id}
                            >
                                {event.name}
                                <hr />
                                {event.desciption}<br/>
                                Espacios disponibles: {event.people_limit}<br/>
                            </button>
                        )
                    })
                )
            }

        </ul>

    </div>
    </>
  )
}
