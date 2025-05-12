import { signIn } from "next-auth/react"
import { Button } from "./button"
import { DialogDescription, DialogHeader, DialogTitle } from "./dialog"
import Image from "next/image"

const handleLoginWithGoogleClick = () => signIn("google")
const SigninDialog = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma!</DialogTitle>
        <DialogDescription>
          Conecte-se usando sua conta do google
        </DialogDescription>
      </DialogHeader>

      <Button className="gap-1 font-bold" onClick={handleLoginWithGoogleClick}>
        <Image
          alt="Login com o Google"
          src="/google.svg"
          width={18}
          height={18}
        />
        Login com o Google
      </Button>
    </>
  )
}

export default SigninDialog
