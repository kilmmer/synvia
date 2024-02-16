import { useEffect, useState } from "react"
import Header from "./components/header/header"
import { RouterProvider } from "react-router-dom"
// import Dashboard from "./pages/dashboard/dashboard"
// import Login from "./pages/login/login"
import Footer from "./components/footer/footer"
// import Signup from "./pages/signup/signup"
import { routes } from "./routes"
import { Container } from "@mui/material"
import { Context } from "./context/context"


const App = () => {
  const [user, setUser] = useState({})

  
  useEffect(() => {
    const getUser = localStorage.getItem('user')

    if(getUser !== null){
      const user = JSON.parse(getUser)
      console.log(user)
      
      setUser(user.name)
    } else {
      routes.navigate('/login')
      // navigate('/login')
    }

    console.log(user)

    
  }, [user])

  
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Dashboard />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
    <>
      <Context.Provider value={{user, setUser}}>
        <Header />
        <Container maxWidth="xl">
          <RouterProvider router={routes} />
        </Container>
        
        <Footer />
      </Context.Provider>
    </>
  )
}

export default App
