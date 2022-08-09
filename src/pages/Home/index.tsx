import { SmileySad } from "phosphor-react";
import { useEffect, useState } from "react";
import { CardStudent } from "../../components/CardStudent";
import { Header } from "../../components/Header";
import { Searchbar } from "../../components/Searchbar";

interface Student {
  name: string;
  cpf: string;
  email: string;
}

export function Home() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const student = {
      name: "Ivan",
      cpf: "136.070.106-09",
      email: "ivanoliver131@gmail.com"
    };
    setStudents([student]);
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full max-w-[1100px] mx-auto">
        <Searchbar />
        {students.length <= 0 ? (
          <div className="flex items-center justify-center flex-col gap-5 mt-6 md:flex-row">
            <SmileySad size={32} />
            <span className="text-center">
              Não conseguimos coletar informações de nenhum estudante
            </span>
          </div>
        ) : (
          <div className="block mx-auto md:grid grid-cols-1 lg:grid-cols-2">
            {students.map((student: Student) => {
              return (
                <CardStudent
                  key={student.cpf}
                  name={student.name}
                  cpf={student.cpf}
                  email={student.email}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
