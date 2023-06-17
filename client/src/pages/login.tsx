import useAuth from "@/hooks/useAuth";

export default function Login() {
  const { doLogin } = useAuth();

  return (
    <div>
      <button onClick={doLogin}>login</button>
    </div>
  );
}
