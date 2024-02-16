import { useEffect, useState } from "react"
import Header from "./components/header/header"
import { RouterProvider } from "react-router-dom"
// import Dashboard from "./pages/dashboard/dashboard"
// import Login from "./pages/login/login"
import Footer from "./components/footer/footer"
// import Signup from "./pages/signup/signup"
import { routes } from "./routes"
import { Container } from "@mui/material"

const App = () => {
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    const getUser = localStorage.getItem('user')
    
    if(getUser !== null){
      setUsername(JSON.parse(getUser))
    } else {
      routes.navigate('/login')
      // navigate('/login')
    }
  }, [username])

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Dashboard />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/signup" element={<Signup />} />
    //   </Routes>
    // </BrowserRouter>
    <>
      <Header user={username}/>
      <Container maxWidth="xl">
        <RouterProvider router={routes} />
      </Container>
      
      <Footer />
    </>
  )
}

export default App
