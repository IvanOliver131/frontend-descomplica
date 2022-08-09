import { createContext, ReactNode, useEffect, useState } from "react";
let allStudents: Student[] = [];

interface Student {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

interface StudentsProviderProps {
  children: ReactNode;
}

interface StudentsContextData {
  students: Student[];
  editStudent: (selectedId: string, studentEdit: Student) => Promise<void>;
  deleteStudent: (selectedId: string) => Promise<void>;
  searchStudent: (textTyped: string) => void;
}

export const StudentsContext = createContext<StudentsContextData>(
  {} as StudentsContextData
);

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const listStudents = [
      {
        id: "1",
        name: "Ivan",
        cpf: "136.070.106-09",
        email: "ivanoliver131@gmail.com"
      },
      {
        id: "2",
        name: "Ana",
        cpf: "136.070.106-10",
        email: "ana@gmail.com"
      },
      {
        id: "3",
        name: "Teste",
        cpf: "136.070.106-11",
        email: "teste@gmail.com"
      }
    ];

    setStudents([...listStudents]);
    allStudents = listStudents;
  }, []);

  async function editStudent(selectedId: string, studentEdit: Student) {
    console.log(selectedId, studentEdit);
  }

  async function deleteStudent(selectedId: string) {
    console.log(selectedId);
  }

  function searchStudent(textTyped: String) {
    const foundedStudents: Student[] = [];
    const textSearch = new RegExp(textTyped.toLowerCase(), "g");

    for (const student of allStudents) {
      if (
        student.name.match(textSearch) ||
        student.cpf.match(textSearch) ||
        student.email.match(textSearch)
      ) {
        foundedStudents.push(student);
      } else {
        setStudents(allStudents);
      }
    }
    setStudents(foundedStudents);
  }

  return (
    <StudentsContext.Provider
      value={{
        students,
        editStudent,
        deleteStudent,
        searchStudent
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
