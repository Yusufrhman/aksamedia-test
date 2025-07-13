import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center">
      <div className="w-full max-w-lg px-4 space-y-2 my-14">
        <h1 className=" text-lg">
          Welcome to <span className="font-semibold text-blue-500">AKSAMEDIA</span>
        </h1>
        <h2 className="text-4xl font-bold">Login</h2>
        <LoginForm />
      </div>
    </main>
  );
}
