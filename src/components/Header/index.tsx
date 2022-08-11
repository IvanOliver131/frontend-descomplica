import { SignOut } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

export function Header() {
  const navigate = useNavigate();
  function logout() {
    navigate("/");
  }
  return (
    <header className="w-full py-5 flex justify-center bg-[#333333] border-b border-gray-600">
      <Logo />
      <span className="font-bold ml-1">
        CONTROL
        <span className="text-[#00e88f]">Student</span>
        <span className="font-bold ml-1 text-[#FFD700]">.</span>
      </span>

      <div className="absolute right-8 top-4">
        <button
          className="flex flex-row items-center justify-center gap-1"
          onClick={logout}
        >
          <SignOut size={32} />
          <span className="hidden md:block">Sair</span>
        </button>
      </div>
    </header>
  );
}
