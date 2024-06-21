import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { CalendarSearch, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-10 bg-[#293435]">
      <Logo />
      <div className="my-5 flex items-center space-x-2">
          <MapPin size={38} className="text-[#2AD2B1]" />
          <h1 className="text-[34px] font-medium text-[#2AD2B1]">Encuentra los eventos proximos en tu ciudad</h1>
      </div>
      <div className="my-10">
        <CalendarSearch size={200} className="text-[#2AD2B1]" />
      </div>
      <div>
        <Link href="/events" passHref>
          <Button variant="secondary" className="text-[#2A3334] flex items-center space-x-2">
            <Search size={24} className="text-[#2A3334]" />
            <span>Buscar eventos</span>
          </Button>
        </Link>
      </div>
    </main>
  );
}
