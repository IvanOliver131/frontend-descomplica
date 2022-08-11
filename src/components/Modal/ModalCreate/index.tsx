import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../../assets/images/close.svg";
import { useStudents } from "../../../hooks/useStudents";
import { cpfMask } from "../../../mask/cpfMask";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ModalStudentProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalStudentCreate({
  isOpen,
  onRequestClose
}: ModalStudentProps) {
  const { students, addStudent } = useStudents();

  const [createName, setCreateName] = useState("");
  const [createCpf, setCreateCpf] = useState("");
  const [createEmail, setCreateEmail] = useState("");

  useEffect(() => {
    setCreateName("");
    setCreateCpf("");
    setCreateEmail("");
  }, [students]);

  async function handleCreateStudent(event: FormEvent) {
    event.preventDefault();

    if (!createName || !createCpf || !createEmail) {
      return toast.warn(
        "Desculpa 🙁 mas parece que você não preencheu todos os campos",
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

    await addStudent(createName, createCpf, createEmail);

    setCreateName("");
    setCreateCpf("");
    setCreateEmail("");

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
        onSubmit={handleCreateStudent}
        className="grid
        grid-cols-1
        gap-2
        w-full
        m-auto"
      >
        <h1 className="text-[#009c60] font-bold text-lg">Criar Estudante</h1>

        <input
          type="text"
          placeholder="Nome"
          className="p-3 rounded-md text-gray-700"
          value={createName}
          onChange={(event) => setCreateName(event.target.value)}
        />

        <input
          type="text"
          placeholder="CPF"
          className="p-3 rounded-md text-gray-700"
          value={createCpf}
          onChange={(event) => setCreateCpf(cpfMask(event.target.value))}
        />

        <input
          type="email"
          placeholder="E-mail"
          className="p-3 rounded-md text-gray-700"
          value={createEmail}
          onChange={(event) => setCreateEmail(event.target.value)}
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
