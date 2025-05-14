import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "@/components/ui/barbershop-item"
import { quickSearchOptions } from "./_contants/search"
import BookingItem from "@/components/ui/booking-item"
import Search from "@/components/ui/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      {/* HEADER */}
      <Header />
      <div className="p-5">
        {/* TITLE */}
        <h2 className="text-xl font-bold">Olá, Saulo!</h2>
        <p>Sexta -feira, 02 de maio.</p>

        {/* SEARCH */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>
        {/* FIM BUSCA RAPIDA */}

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
        <h2 className="mb-3 mt-6 font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

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
    </div>
  )
}

export default Home
