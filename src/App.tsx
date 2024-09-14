import { BrowserRouter, Route, Routes } from "react-router-dom"
import Super from "./pages/Super"
import MainPage from "./pages/mainpage/MainPage"
import Admin from "./pages/admin/Admin"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Super/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/adminpage" element={<Admin/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
