import MainButton from "../components/buttons/MainButton";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80svh] flex items-center justify-center px-4 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-6xl font-bold text-neutral-900 dark:text-neutral-100">
          404
        </h1>
        <p className="text-xl text-neutral-700 dark:text-neutral-300">
          Halaman tidak ditemukan.
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Sepertinya kamu nyasar. Coba kembali ke halaman utama.
        </p>
        <Link to="/products">
          <MainButton className="w-full mt-4">Kembali ke halaman utama</MainButton>
        </Link>
      </div>
    </div>
  );
}
