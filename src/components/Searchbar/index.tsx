import { MagnifyingGlass } from "phosphor-react";
import { useStudents } from "../../hooks/useStudents";

export function Searchbar() {
  const { searchStudent } = useStudents();

  function handleSearchStudent(textTyped: string) {
    searchStudent(textTyped);
  }

  return (
    <form>
      <div className="relative m-3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none ">
          <MagnifyingGlass color="black" size={24} />
        </div>
        <input
          type="search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:pink-blue-500 "
          placeholder="Pesquisar alunos..."
          onKeyUp={(event: any) => handleSearchStudent(event.target.value)}
          required
        />
      </div>
    </form>
  );
}
