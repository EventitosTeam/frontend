import { CalendarDays } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
  return (
    <div className="">
        <Link href="/" className="flex items-center space-x-3">
            <CalendarDays size={32} className="text-white" />
            <span className="text-white font-bold text-[20px]">Eventitos</span>
        </Link>
    </div>
  )
}
