import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/ui/barbershop-item"
import { quickSearchOptions } from "./_contants/search"
import BookingItem from "@/components/ui/booking-item"

const Home = async () => {
  //chamar meu banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* TITLE */}
        <h2 className="text-xl font-bold">Olá, Saulo!</h2>
        <p>Sexta -feira, 02 de maio.</p>

        {/* SEARCH */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Buscar por serviços ou barbearias" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
          {/* FIM BUSCA RAPIDA */}
        </div>
        {/* IMAGE BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>

        {/* BOOKINGS */}
        <BookingItem />

        {/* BARBEARIAS RECOMENDADAS*/}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {/* FECHA BARBEARIAS RECOMENDADAS */}

        {/* POPULARES */}
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        {/* FECHA POPULARES */}
      </div>
      {/* FOOTER */}
      <footer className="mt-3">
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-center text-sm text-gray-400">
              2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
      {/* FECHA FOOTER */}
    </div>
  )
}

export default Home
