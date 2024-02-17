// import { useEffect } from "react"
import Header from "./components/header/header"
import { RouterProvider } from "react-router-dom"
import Footer from "./components/footer/footer"
import { routes } from "./routes"
import { Container } from "@mui/material"
import { useEffect } from "react"
import { refreshToken } from "./services/auth.service"
// import { Context } from "./context/context"

const App = () => {
  // const [context, setContext] = useState({})

  // useEffect(() => {
  //   const getUser = localStorage.getItem('user')

  //   if(getUser !== null){
  //     // const user = JSON.parse(getUser)
      
  //     // setContext({user: user, isLoggedIn: true})
  //   } else {
  //     routes.navigate('/login')
     
  //   }
    
  // }, [])

  useEffect(() => {
    refreshToken()
  }, [])

  
  return (
   
    <>
      {/* <Context.Provider value={{context, setContext}}> */}
        <Header />
        <Container maxWidth="xl">
          <RouterProvider router={routes} />
        </Container>
        
        <Footer />
      {/* </Context.Provider> */}
    </>
  )
}

export default App
