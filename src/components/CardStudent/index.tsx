import { NotePencil, Trash } from "phosphor-react";

interface CardStudentProps {
  name: string;
  cpf: string;
  email: string;
}

export function CardStudent({ name, cpf, email }: CardStudentProps) {
  return (
    <div className="m-2 rounded-md p-4 bg-gray-800 flex flex-col min-w-[300px]">
      <header className="flex gap-2">
        <h1>Nome:</h1>
        <span>{name}</span>
      </header>
      <div className="flex ">
        <div className="flex-1">
          <div className="flex  gap-2">
            <h1>CPF:</h1>
            <span>{cpf}</span>
          </div>

          <div className="flex  gap-2">
            <h1>Email:</h1>
            <span>{email}</span>
          </div>
        </div>

        <div className="flex items-center justify-center flex-row gap-2">
          <button>
            <NotePencil size={24} />
          </button>
          <button>
            <Trash size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
