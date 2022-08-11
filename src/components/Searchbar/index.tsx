import { MagnifyingGlass, Plus } from "phosphor-react";
import { useState } from "react";
import { useStudents } from "../../hooks/useStudents";

interface SearchbarProps {
  onOpenCreateStudentModal: () => void;
}

export function Searchbar({ onOpenCreateStudentModal }: SearchbarProps) {
  const { searchStudent } = useStudents();
  const [textSearch, setTextSearch] = useState("");

  function handleSearchStudent(textTyped: string) {
    if (textTyped === "123delete456data") {
      setTextSearch("");
      return searchStudent("");
    }
    searchStudent(textTyped);
  }

  return (
    <div className="block sm:flex">
      <div className="relative m-3 flex-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
          <MagnifyingGlass color="black" size={24} />
        </div>
        <input
          type="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-none focus:ring-[#333333] focus:pink-gray-500 "
          placeholder="Pesquisar alunos..."
          value={textSearch}
          onChange={(event: any) => setTextSearch(event.target.value)}
          onKeyUp={(event: any) => handleSearchStudent(event.target.value)}
        />
        <button
          className="text-white absolute right-2.5 bottom-2.5 bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-4 py-1.5"
          onClick={() => handleSearchStudent("123delete456data")}
        >
          X
        </button>
      </div>
      <button
        className="p-2 rounded-md bg-[#333333] flex flex-row justify-center items-center gap-2 font-bold w-[94%] m-auto sm:max-w-[180px] sm:mx-4"
        onClick={onOpenCreateStudentModal}
      >
        <Plus weight="bold" />
        Criar Estudante
      </button>
    </div>
  );
}
