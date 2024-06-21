"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
    fecha: string
}

const CalendarItem: React.FC<Props> = ({ fecha }) => {

    // const fecha = "23-06-2024"

    // Convert the fecha string to a recognizable format
    const [day, month, year] = fecha.split("-")
    const formattedFecha = `${year}-${month}-${parseInt(day) + 1}`

    // Create a Date object from the formatted date string
    const fechaDate = new Date(formattedFecha)

    const [date, setDate] = React.useState<Date | undefined>(fechaDate)

  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
        //   onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default CalendarItem
