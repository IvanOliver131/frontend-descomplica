import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/images/close.svg";
import { useStudents } from "../../hooks/useStudents";

interface ModalProps {
  isOpen: boolean;
  id: string;
  onRequestClose: () => void;
}

interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export function ModalStudent({ isOpen, id, onRequestClose }: ModalProps) {
  const { students, editStudent } = useStudents();

  const [editName, setEditName] = useState("");
  const [editCpf, setEditCpf] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    students.forEach((student: Student) => {
      if (student.id === id) {
        setEditName(student.name);
        setEditCpf(student.cpf);
        setEditEmail(student.email);
      }
    });
  }, [id, students]);

  async function handleEditStudent(event: FormEvent) {
    event.preventDefault();

    const studentEdit = {
      id,
      name: editName,
      cpf: editCpf,
      email: editEmail
    };

    await editStudent(id, studentEdit);

    // Zero os campos antes de fechar o modal
    setEditName("");
    setEditCpf("");
    setEditEmail("");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <form
        onSubmit={handleEditStudent}
        className="m-4 grid
        grid-cols-1
        gap-2"
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
          placeholder="Valor"
          className="p-3 rounded-md text-gray-700"
          value={editCpf}
          onChange={(event) => setEditCpf(event.target.value)}
        />

        <input
          type="text"
          placeholder="Valor"
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
