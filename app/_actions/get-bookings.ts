"use server"

import { db } from "../_lib/prisma"
import { startOfDay, endOfDay } from "date-fns"

interface getBookingsProps {
  serviceId: String
  date: Date
}

export const getBookings = ({ date }: getBookingsProps) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
