import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import closeImg from "../../../assets/images/close.svg";
import { useStudents } from "../../../hooks/useStudents";
import { cpfMask } from "../../../mask/cpfMask";

import "react-toastify/dist/ReactToastify.css";

interface ModalStudentProps {
  isOpen: boolean;
  id: string;
  onRequestClose: () => void;
}

export function ModalStudentEdit({
  isOpen,
  id,
  onRequestClose
}: ModalStudentProps) {
  const { students, editStudent } = useStudents();

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

  async function handleEditStudent(event: FormEvent) {
    event.preventDefault();

    if (!editName || !editCpf || !editEmail) {
      return toast.warn(
        "Desculpa 🙁 mas parece que você deixou algum campo em branco",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        }
      );
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
        onSubmit={handleEditStudent}
        className="grid
        grid-cols-1
        gap-2
        w-full
        m-auto"
      >
        <h1 className="text-[#009c60] font-bold text-lg">Editar Estudante</h1>

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
          onChange={(event) => setEditCpf(cpfMask(event.target.value))}
        />

        <input
          type="email"
          placeholder="E-mail"
          className="p-3 rounded-md text-gray-700"
          value={editEmail}
          onChange={(event) => setEditEmail(event.target.value)}
        />

        <button
          type="submit"
          className="bg-[#13bb7a] rounded-md p-3 hover:bg-[#14e092]"
        >
          Confirmar
        </button>
      </form>
    </Modal>
  );
}
