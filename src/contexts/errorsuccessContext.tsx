import { createContext, useState } from "react";

interface IErrorSuccessContext {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  type: "error" | "success" | null;
  setType: React.Dispatch<React.SetStateAction<"error" | "success" | null>>;
}

export const ErrorSuccessContext = createContext<IErrorSuccessContext>({
  message: null,
  setMessage: () => null,
  type: null,
  setType: () => null,
});

const ErrorSuccessContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "success" | null>(null);
  return (
    <ErrorSuccessContext.Provider
      value={{
        message,
        setMessage,
        type,
        setType,
      }}
    >
      {children}
    </ErrorSuccessContext.Provider>
  );
};

export default ErrorSuccessContextProvider;