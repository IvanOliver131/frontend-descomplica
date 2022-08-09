import { createContext, ReactNode, useEffect, useState } from "react";

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
}

export const StudentsContext = createContext<StudentsContextData>(
  {} as StudentsContextData
);

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const student = {
      id: "1",
      name: "Ivan",
      cpf: "136.070.106-09",
      email: "ivanoliver131@gmail.com"
    };
    setStudents([student]);
  }, []);

  async function editStudent(selectedId: string, studentEdit: Student) {
    console.log(selectedId, studentEdit);
  }

  async function deleteStudent(selectedId: string) {
    console.log(selectedId);
  }

  return (
    <StudentsContext.Provider
      value={{
        students,
        editStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
