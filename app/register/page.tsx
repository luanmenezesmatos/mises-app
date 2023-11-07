import CreateAccountForm from "@/components/auth/create-account-form";

export default async function Register() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <CreateAccountForm />
    </div>
  )
}
