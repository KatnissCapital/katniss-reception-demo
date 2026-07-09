import Reception from "@/components/Reception";
import { restaurantFlow } from "@/flows/restaurant";

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Reception flow={restaurantFlow} />
    </main>
  );
}