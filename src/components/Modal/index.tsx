import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/images/close.svg";
import { useStudents } from "../../hooks/useStudents";

interface ModalStudentProps {
  isOpen: boolean;
  id: string;
  create: boolean;
  onRequestClose: () => void;
}

export function ModalStudent({
  isOpen,
  id,
  create,
  onRequestClose
}: ModalStudentProps) {
  const { students, editStudent, addStudent } = useStudents();

  const [editName, setEditName] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    setEditName("");
    setEditCpf("");
    setEditEmail("");

    if (students) {
      for (const student of students) {
        if (student.id === id) {
          setEditName(student.name);
          setEditCpf(student.cpf);
          setEditEmail(student.email);
        }
      }
    }
  }, [id, students]);

  async function handleEditOrCreateStudent(event: FormEvent) {
    event.preventDefault();

    if (create) {
      addStudent(editName, editCpf, editEmail);

      // Zero os campos antes de fechar o modal
      setEditName("");
      setEditCpf("");
      setEditEmail("");
      onRequestClose();

      return;
    }

    const studentEdit = {
      id,
      name: editName,
      cpf: editCpf,
      email: editEmail
    };

    await editStudent(id, studentEdit);

    setEditName("");
    setEditCpf("");
    setEditEmail("");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onRequestClose}
      overlayClassName="bg-black-rgba fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
      className="w-full max-w-[400px] bg-[#f0f2f5] p-14 relative rounded-md m-3"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="absolute right-6 top-6 border-spacing-0 bg-transparent hover:filter brightness-50"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form
        onSubmit={handleEditOrCreateStudent}
        className="grid
        grid-cols-1
        gap-2
        w-full
        m-auto"
      >
        <h1 className="text-gray-700 font-bold text-lg">Editar Estudante</h1>

        <input
          type="text"
          placeholder="Nome"
          className="p-3 rounded-md text-gray-700"
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
        />

        <input
          type="text"
          placeholder="CPF"
          className="p-3 rounded-md text-gray-700"
          value={editCpf}
          onChange={(event) => setEditCpf(event.target.value)}
        />

        <input
          type="text"
          placeholder="E-mail"
          className="p-3 rounded-md text-gray-700"
          value={editEmail}
          onChange={(event) => setEditEmail(event.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-700 rounded-md p-3 hover:bg-gray-800"
        >
          Confirmar
        </button>
      </form>
    </Modal>
  );
}
