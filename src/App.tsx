import { BrowserRouter, Route, Routes } from "react-router-dom"
import Super from "./pages/Super"
import MainPage from "./pages/mainpage/MainPage"
import Admin from "./pages/admin/Admin"
import { createContext } from "react"
import { useUserCookie } from "./hooks/users/useUserCookie"
import LeaderBoard from "./pages/leadboard/LeaderBoard"

export const CurrentUserContext = createContext<any>({})

function App() {
  const { user } = useUserCookie()

  // useEffect(()=> {
  //   getCookie()
  // },[user])

  return (
    <>
      <CurrentUserContext.Provider value={{user}}>
        <BrowserRouter>
          <Routes>
            <Route path="/main" element={<Super />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/adminpage" element={<Admin />} />
            <Route path='/lead' element={<LeaderBoard/>}/>
          </Routes>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </>
  )
}

export default App
