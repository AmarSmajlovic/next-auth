import { authService } from "@/services/auth";

export default function Home() {
  const onTest = async () => {
    const res = await authService.test();
    console.log(res);
  };

  return (
    <main>
      <button onClick={onTest}>test</button>
    </main>
  );
}
