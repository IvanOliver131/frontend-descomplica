import { useContext } from "react";
import { StudentsContext } from "../contexts/StudentsContext";

export function useStudents() {
  const context = useContext(StudentsContext);

  return context;
}
