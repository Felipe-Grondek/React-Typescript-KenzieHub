import RoutesMain from "./routes"
import UserContextProvider from "./contexts/UserContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { GlobalStyles } from "./styles/GlobalStyles"
import TechContextProvider from "./contexts/TechContext"
import LoadingOverlay from "./components/LoadingOverlay"


function App() {

  return (
    <div className="App">
      <GlobalStyles />
      <UserContextProvider>
        <TechContextProvider>
          <RoutesMain />
        </TechContextProvider>
        <LoadingOverlay />
      </UserContextProvider>
      <ToastContainer />
    </div>
  )
}

export default App
