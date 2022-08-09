import { MagnifyingGlass } from "phosphor-react";

export function Searchbar() {
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
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-pink-700 hover:bg-pink-900 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-4 py-2"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}
