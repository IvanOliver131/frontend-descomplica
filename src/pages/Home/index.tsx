import { SmileySad, Student } from "phosphor-react";
import { useState } from "react";
import { CardStudent } from "../../components/CardStudent";
import { Header } from "../../components/Header";
import { ModalStudent } from "../../components/Modal";
import { Searchbar } from "../../components/Searchbar";
import { useStudents } from "../../hooks/useStudents";

interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export function Home() {
  const { students } = useStudents();
  const [modalOpen, setModalOpen] = useState(false);
  const [studentId, setStudentId] = useState("");

  function handleCloseStudentModal() {
    setModalOpen(false);
  }

  function handleOpenStudentModal(studentId: string) {
    setStudentId(studentId);
    setModalOpen(true);
  }

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
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  cpf={student.cpf}
                  email={student.email}
                  onOpenEditStudentModal={handleOpenStudentModal}
                />
              );
            })}
          </div>
        )}
      </div>

      <ModalStudent
        isOpen={modalOpen}
        id={studentId}
        onRequestClose={handleCloseStudentModal}
      />
    </div>
  );
}
