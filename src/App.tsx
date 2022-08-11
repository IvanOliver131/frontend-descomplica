import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { StudentsProvider } from "./contexts/StudentsContext";
import { useStudents } from "./hooks/useStudents";
import { client } from "./lib/apollo";
import { Router } from "./Router";

function App() {
  const { students } = useStudents();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StudentsProvider>
          <Router />
        </StudentsProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
