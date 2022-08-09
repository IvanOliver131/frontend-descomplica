import { Logo } from "../Logo";

export function Header() {
  return (
    <header className="w-full py-5 flex justify-center bg-black border-b border-gray-600">
      <Logo />
      <span className="font-bold ml-1">
        CONTROL
        <span className="text-[#ff8787]">Student</span>
        <span className="font-bold ml-1 text-[#FF57B2]">.</span>
      </span>
    </header>
  );
}
