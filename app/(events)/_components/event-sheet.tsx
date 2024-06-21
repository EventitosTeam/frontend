"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSheetEvent } from "@/hooks/use-sheet-event"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
  } from "@/components/ui/form"
import eventitosApi from "@/api/eventitos-api"
import { toast } from "sonner";
import { useState } from "react"
import { Loader, LoaderCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const formSchema = z.object({
    userName: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    userPhone: z.string().min(4, {
        message: "phone must be at least 4 characters.",
    }),
    userEmail: z.string().min(4, {
        message: "email must be at least 4 characters.",
      }),
      userDni: z.string().min(4, {
        message: "dni must be at least 4 characters.",
    }),
  })

type UserBody = {
    name: string
    phone: string
    email: string
    dni: string
}

export const EventSheet = () => {

    const { isOpen, onClose, event, clearEvent } = useSheetEvent()

    const postBook = async (user: UserBody) => {

        // console.log("entra aca")

        if (!event) {
            // console.log("No event", event)
            return
        }

        const resp = await eventitosApi.post(
            `/events/${event.id}/bookings`,
            user
        )

        if (resp.status === 200) {
            handleClose()
            toast.success(`Reserva exitosa: ${resp.data.booking_code}`)
        }

        // console.log(resp)

        const data = await resp.data

        // console.log(data.booking_code) // booking_code

        return data

    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            userName: "",
            userPhone: "",
            userEmail: "",
            userDni: "",
        },
    })

    const handleClose = () => {
        form.reset(
            {
                userName: "",
                userPhone: "",
                userEmail: "",
                userDni: ""
            }
        )
        clearEvent()
        onClose()
        setloadingPostBook(false)
    }

    const [loadingPostBook, setloadingPostBook] = useState(false)

    function onSubmit(values: z.infer<typeof formSchema>) {

        setloadingPostBook(true)

        const user: UserBody = {
            name: values.userName,
            phone: values.userPhone,
            email: values.userEmail,
            dni: values.userDni
        }

        // console.log(user)

        postBook(user)

        // return
    }

  return (
    <>
        <Sheet
            open={isOpen}
            onOpenChange={handleClose}
        >
        {/* <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
        </SheetTrigger> */}
        <SheetContent className="bg-[#fbfbfb]">
            <SheetHeader>
            <SheetTitle className="">
                {
                    event && (
                        <>
                            {event.name}<br/>
                        </>
                    )
                }
            </SheetTitle>
            <SheetDescription className="">
                Inscribite en este evento
            </SheetDescription>
            <hr className="" />
            </SheetHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col justify-start space-y-2">
                                <FormField
                                    control={form.control}
                                    name="userName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="userName" className="">
                                                        Nombre del invitado
                                                    </Label>
                                                    <Input id="userName" placeholder="Bruno Romero" className="col-span-3" {...field} value={field.value}/>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                        </div>

                        <div className="flex flex-col justify-start space-y-2">
                            <FormField
                                control={form.control}
                                name="userPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <>
                                                <Label htmlFor="userPhone" className="">
                                                    Telefono del invitado
                                                </Label>
                                                <Input type="text" id="userPhone" placeholder="2604267316" className="col-span-3" {...field} value={field.value} />
                                            </>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col justify-start space-y-2">
                            <FormField
                                    control={form.control}
                                    name="userEmail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="userEmail" className="">
                                                        Email del invitado
                                                    </Label>
                                                    <div className="flex items-center">
                                                        {/* <span className="text-white bg-muted-foreground h-full rounded-l-lg p-2">
                                                            @
                                                        </span> */}
                                                        <Input type="email" id="userEmail" placeholder="b.romero@alumno.um.edu.ar" className="col-span-3" {...field} value={field.value} />
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                        </div>

                        <div className="flex flex-col justify-start space-y-2">
                            <FormField
                                    control={form.control}
                                    name="userDni"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <>
                                                    <Label htmlFor="userDni" className="">
                                                        Dni del invitado
                                                    </Label>
                                                    <div className="flex items-center">
                                                        {/* <span className="text-white bg-muted-foreground h-full rounded-l-lg p-2">
                                                            @
                                                        </span> */}
                                                        <Input type="text" id="userDni" placeholder="42265179" className="col-span-3" {...field} value={field.value} />
                                                    </div>
                                                </>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                        </div>

                    </div>

                    {/* <SheetClose asChild> */}
                        <Button type="submit" className={cn(
                            "w-full mt-2 bg-[#2AD2B1] hover:bg-[#2ad2b1e5]",
                            // loadingPostBook && ""
                        )}>
                            {
                                loadingPostBook ? (
                                    <div className="flex items-center space-x-2">
                                        <span>Inscribirse</span>
                                        <Loader className="w-6 h-6 animate-spin" />
                                    </div>
                                ) : (
                                    <span>Inscribirse</span>
                                )
                            }
                        </Button>
                    {/* </SheetClose> */}

                </form>
            </Form>
        </SheetContent>
        </Sheet>
    </> 
  )

}
