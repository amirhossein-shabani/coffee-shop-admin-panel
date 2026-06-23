import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser, isPending } = useLogin();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(
      { email, password },
      {
        onSuccess: ({ profile }) => {
          if (profile.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/not-authorized");
          }
        },
        onError: (err) => {
          console.log(err.message);
        },
      },
    );
  };

  return (
    <div>
      <h1>صفحه ورود</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={isPending}>
          {isPending ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}

export default Login;
