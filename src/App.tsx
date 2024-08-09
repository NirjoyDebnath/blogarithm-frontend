import { useContext } from "react";
import { ShowError } from "./components/Toast/showError";
import { ErrorSuccessContext } from "./contexts/errorsuccessContext";
import AppRouter from "./routes/route";
import { ShowSuccess } from "./components/Toast/showSuccess";
function App() {
  const { message, type } = useContext(ErrorSuccessContext);
  return (
    <>
      {message && (type === 'error'? <ShowError></ShowError>:<ShowSuccess></ShowSuccess>)}
      <AppRouter />
    </>
  );
}

export default App;
