import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { client } from "../lib/apollo";
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
  removeStudent: (selectedId: string) => Promise<void>;
  addStudent: (name: string, cpf: string, email: string) => Promise<void>;
  searchStudent: (textTyped: string) => void;
}

export const StudentsContext = createContext<StudentsContextData>(
  {} as StudentsContextData
);

const GET_STUDENT = gql`
  query Query {
    students {
      id
      name
      cpf
      email
    }
  }
`;

const CREATE_STUDENT = gql`
  mutation ($name: String!, $cpf: String!, $email: String!) {
    createStudent(name: $name, cpf: $cpf, email: $email) {
      id
      name
      cpf
      email
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation ($id: String!) {
    deleteStudent(id: $id) {
      id
      name
    }
  }
`;

const UPDATE_STUDENT = gql`
  mutation ($id: String!, $name: String!, $cpf: String!, $email: String!) {
    updateStudent(id: $id, name: $name, cpf: $cpf, email: $email) {
      id
      name
      cpf
      email
    }
  }
`;

export function StudentsProvider({ children }: StudentsProviderProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const { data: dataStudents } = useQuery<{ students: Student[] }>(GET_STUDENT);
  const [createStudent] = useMutation(CREATE_STUDENT);
  const [deleteStudent] = useMutation(DELETE_STUDENT);
  const [updateStudent] = useMutation(UPDATE_STUDENT);

  useEffect(() => {
    const listStudents = dataStudents?.students ? dataStudents?.students : [];
    setStudents([...listStudents]);
    allStudents = listStudents;
  }, [dataStudents]);

  async function editStudent(selectedId: string, studentEdit: Student) {
    await updateStudent({
      variables: {
        id: selectedId,
        name: studentEdit.name,
        cpf: studentEdit.cpf,
        email: studentEdit.email
      },
      refetchQueries: [GET_STUDENT]
    });
  }

  async function removeStudent(selectedId: string) {
    await deleteStudent({
      variables: { id: selectedId },
      refetchQueries: [GET_STUDENT]
    });
  }

  async function addStudent(name: string, cpf: string, email: string) {
    await createStudent({
      variables: {
        name,
        cpf,
        email
      },
      refetchQueries: [GET_STUDENT]
    });
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
        removeStudent,
        addStudent,
        searchStudent
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}
