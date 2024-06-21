"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { EventInfo } from "./event-info"
import { useState } from "react"
import eventitosApi from "@/api/eventitos-api"

const formSchema = z.object({
    bookingCode: z.string().min(4, {
      message: "Booking code must be at least 4 characters.",
    })
  })

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

export const SearchEvent = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bookingCode: "",
        },
    })

    const getBooking = async ( bookingCode: string ) => {
        const resp = await eventitosApi.get(
            `/bookings/${bookingCode}`
        )

        const booking = await resp.data

        setBooking(booking)

        console.log(booking)

        return booking

    }

    const [booking, setBooking] = useState<Booking | undefined>()

    function onSubmit(values: z.infer<typeof formSchema>) {
        getBooking(values.bookingCode)
        form.reset()
    }

  return (
    <div className="flex flex-col w-full">

        <div className="flex justify-center">

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[30%]">
                <div className="grid gap-4 py-4">
                        <div className="flex flex-col justify-start space-y-2">
                                <FormField
                                    control={form.control}
                                    name="bookingCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="bookingCode" className="text-white">
                                                        Código de reserva
                                                    </Label>
                                                    <Input id="bookingCode" placeholder="BC765458679A45B2BD734DCB53F73729" className="col-span-3" {...field} value={field.value}/>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                        </div>
                    </div>
                    <Button type="submit" className={cn(
                            "w-full mt-2 bg-[#2AD2B1] hover:bg-[#2ad2b1e5] flex items-center space-x-2"
                        )}>
                        <Search size={24} className="" />
                        <span>Buscar Evento</span>
                    </Button>
            </form>
        </Form>

        </div>

        <div className="flex justify-center my-10">
            {
                booking !== undefined && (
                    <EventInfo booking={booking} />
                )
            }
        </div>

    </div>
            
  )
}
