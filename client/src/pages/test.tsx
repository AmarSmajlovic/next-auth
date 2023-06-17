import { restaurantService } from "@/services/restaurantService";

export default function Home() {
  const onTest = async () => {
    const res = await restaurantService.getResturants();
    console.log(res);
  };

  return (
    <main>
      <button onClick={onTest}>test</button>
    </main>
  );
}
