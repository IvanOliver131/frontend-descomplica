import { NotePencil, Trash } from "phosphor-react";
import { useStudents } from "../../hooks/useStudents";

interface CardStudentProps {
  id: string;
  name: string;
  cpf: string;
  email: string;
  onOpenEditStudentModal: (id: string) => void;
}

export function CardStudent({
  id,
  name,
  cpf,
  email,
  onOpenEditStudentModal
}: CardStudentProps) {
  const { removeStudent } = useStudents();

  function handleDeleteStudent(selectedId: string) {
    removeStudent(selectedId);
  }

  return (
    <div className="m-2 rounded-md p-4 bg-white flex flex-col min-w-[300px] border-none">
      <header className="flex gap-2">
        <h1 className="text-[#009c60]">Nome:</h1>
        <span className="text-black">{name}</span>
      </header>
      <div className="flex ">
        <div className="flex-1">
          <div className="flex  gap-2">
            <h1 className="text-[#009c60]">CPF:</h1>
            <span className="text-black">{cpf}</span>
          </div>

          <div className="flex  gap-2">
            <h1 className="text-[#009c60]">Email:</h1>
            <span className="text-black">{email}</span>
          </div>
        </div>

        <div className="flex items-center justify-center flex-row gap-2">
          <button onClick={() => onOpenEditStudentModal(id)}>
            <NotePencil size={24} color="#009c60" />
          </button>
          <button onClick={() => handleDeleteStudent(id)}>
            <Trash size={24} color="#ff5252" />
          </button>
        </div>
      </div>
    </div>
  );
}
