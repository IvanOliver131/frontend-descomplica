import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";

import "react-toastify/dist/ReactToastify.css";
import { LogoDescomplica } from "../../components/LogoDescomplica";

export function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();
    if (
      email == import.meta.env.VITE_EMAIL &&
      password == import.meta.env.VITE_PASSWORD
    ) {
      navigate("/home");
    } else {
      toast.warn(
        "Certifique-se de que preencheu os campos da maneira correta 😁",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      );
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center bg-black">
      <div className="w-full max-w-[1100px] flex items-center flex-col justify-between mt-20 mx-auto md:flex-row gap-5">
        <div className="max-w-[640px] flex items-center justify-center flex-col p-5 md:p-0 md:block md:m-4">
          <h1 className="m-8 text-[2.5rem] leading-tight text-[#585858] text-center  ">
            Teste Engenheiro de Software Fullstack Jr -
            <strong className="text-[#00e88f]"> DESCOMPLICA</strong> utilizando
            <strong className="text-gray-300"> React ⚛</strong>
          </h1>
          <p className="m-4  text-[#00e88f] leading-relaxed text-[1.5rem] text-center md:m-4">
            Obrigado pela oportunidade!
          </p>
        </div>

        <div className="p-8 bg-[#333333] border border-gray-500  rounded md:m-3 md:w-[600px]">
          <header className="w-full py-5 flex justify-center bg-[#333333] border-b border-gray-600">
            <Logo />
            <span className="font-bold ml-1">
              CONTROL
              <span className="text-[#00e88f]">Student</span>
              <span className="font-bold ml-1 text-[#FFD700]">.</span>
            </span>
          </header>
          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubscribe}
          >
            <input
              className="bg-white rounded px-5 h-14 text-gray-700 mt-2"
              type="email"
              placeholder="Digite seu e-mail"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="bg-white rounded px-5 h-14 text-gray-700 mt-2"
              type="password"
              placeholder="Digite sua senha"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="mt-4 bg-[#00e88f] uppercase py-4 rounded font-bold text-sm hover:bg-[#009159] transition-colors disabled:opacity-50"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-end justify-center mt-[5rem]">
        <div className="flex items-center justify-center p-5">
          <LogoDescomplica />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
