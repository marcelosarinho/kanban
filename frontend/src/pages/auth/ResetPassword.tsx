import Button from "@components/Button";
import Input from "@components/Input";
import LoginCard from "@components/auth/LoginCard";
import LoginCardBody from "@components/auth/LoginCardBody";
import LoginCardHeader from "@components/auth/LoginCardHeader";

export default function ResetPassword() {
  return (
    <LoginCard>
      <LoginCardHeader>
        <h1 className="animate-slide-in-from-bottom text-center dark:text-gray-300 text-2xl font-medium">Redefinir senha</h1>
      </LoginCardHeader>
      <LoginCardBody>
        <form>
          <fieldset className="flex flex-col gap-4">
            <Input className="animate-slide-in-from-bottom" label="Nova senha" type="password" name="password" id="password" isPassword />
            <Input className="animate-slide-in-from-bottom" label="Confirmar nova senha" type="password" name="confirm-password" id="confirm-password" isPassword />
            <Button className="animate-slide-in-from-bottom justify-center">Enviar</Button>
          </fieldset>
        </form>
      </LoginCardBody>
    </LoginCard>
  )
}