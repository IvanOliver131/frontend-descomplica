import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { StudentsProvider } from "./contexts/StudentsContext";
import { client } from "./lib/apollo";
import { Router } from "./Router";

function App() {
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
