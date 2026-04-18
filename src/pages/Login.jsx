import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "admin" && password === "123") {
      const user = { username, role : "admin" };

      dispatch(loginSuccess(user));
      toast.success("Admin girişi başarılı ✅");

      navigate("/books");
    }else if (username === "user" && password === "123") {
      const user = { username, role : "user" };

      dispatch(loginSuccess(user));
      toast.success("User girişi başarılı ✅");

      navigate("/books");
    } else {
      toast.error("Kullanıcı adı veya şifre hatalı ❌");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-xl mb-4">Login</h2>

      <input
        placeholder="Kullanıcı adı"
        className="border p-2 mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Şifre"
        type="password"
        className="border p-2 mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Giriş Yap
      </button>
    </div>
  );
};

export default Login;