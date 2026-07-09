import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-4 text-2xl font-bold">Katniss Reception</h1>

        <p className="mb-6 text-gray-700">
          Selecciona una demo conversacional.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/pelu"
            className="rounded-xl bg-black px-4 py-3 text-center text-white"
          >
            Demo peluquería
          </Link>

          <Link
            href="/restaurant"
            className="rounded-xl bg-black px-4 py-3 text-center text-white"
          >
            Demo restaurante
          </Link>
        </div>
      </div>
    </main>
  );
}