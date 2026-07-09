import Reception from "@/components/Reception";
import { peluFlow } from "@/flows/pelu";

export default function PeluPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Reception flow={peluFlow} />
    </main>
  );
}