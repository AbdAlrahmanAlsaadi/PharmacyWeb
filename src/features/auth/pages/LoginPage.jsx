import LoginForm from "../components/LoginForm";
import LoginBrandPanel from "../components/LoginBrandPanel";

function LoginPage() {
  return (
    <main className="h-screen overflow-hidden bg-slate-50 lg:grid lg:grid-cols-2">
      <LoginBrandPanel />
      <LoginForm />
    </main>
  );
}

export default LoginPage;