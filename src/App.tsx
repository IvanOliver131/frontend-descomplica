import { BrowserRouter } from "react-router-dom";
import { StudentsProvider } from "./contexts/StudentsContext";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <StudentsProvider>
        <Router />
      </StudentsProvider>
    </BrowserRouter>
  );
}

export default App;
