import { Hero } from "@/app/components";
import  CarList  from "@/app/components/card/CarList";
export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <CarList />
    </main>
  );
}
