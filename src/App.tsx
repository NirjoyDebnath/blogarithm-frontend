import AppRouter from "./routes/route";
import CreateUpdateContextProvider from "./contexts/createupdateContext";
import StoryContextProvider from "./contexts/storyContext";
function App() {
  return (
    <>
      <StoryContextProvider>
        <CreateUpdateContextProvider>
          <AppRouter />
        </CreateUpdateContextProvider>
      </StoryContextProvider>
    </>
  );
}

export default App;
