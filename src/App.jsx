import { RoleProvider } from "./context";
import { Navbar } from "./ui/components/navbar";

function App() {

  return (
    <>
      <RoleProvider>
        <Navbar />
      </RoleProvider>
    </>
  )
}

export default App
