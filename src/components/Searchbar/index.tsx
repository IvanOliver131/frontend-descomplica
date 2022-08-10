import { MagnifyingGlass, Plus } from "phosphor-react";
import { useStudents } from "../../hooks/useStudents";

interface SearchbarProps {
  onOpenCreateStudentModal: () => void;
  changeCreate: () => void;
}

export function Searchbar({
  onOpenCreateStudentModal,
  changeCreate
}: SearchbarProps) {
  const { searchStudent } = useStudents();

  function handleSearchStudent(textTyped: string) {
    searchStudent(textTyped);
  }

  return (
    <div className="flex">
      <div className="relative m-3 flex-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
          <MagnifyingGlass color="black" size={24} />
        </div>
        <input
          type="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:pink-blue-500 "
          placeholder="Pesquisar alunos..."
          onKeyUp={(event: any) => handleSearchStudent(event.target.value)}
        />
      </div>
      <button
        className="p-2 rounded-md bg-green-700 flex flex-row justify-center items-center gap-2 font-bold m-4"
        // onClick={onOpenCreateStudentModal}
        onClick={changeCreate}
      >
        <Plus weight="bold" />
        Criar Estudante
      </button>
    </div>
  );
}
