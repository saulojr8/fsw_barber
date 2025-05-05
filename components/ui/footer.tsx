import { Card, CardContent } from "./card"

const Footer = () => {
  return (
    <footer className="mt-3">
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-center text-sm text-gray-400">
            2023 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
