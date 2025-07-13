import './App.css'
import Navbar from './shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inbox from './shared/Inbox'
import Body from './components/Body'
import Mail from './components/Mail'
import SendMail from './components/sendMail'
import Login from './components/Login'
import { useSelector } from 'react-redux'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Inbox />
      },
      {
        path: "/mail/:id",
        element: <Mail />
      }
    ]
  }
])

function App() {
  const {user} = useSelector(store=> store.appSlice)
  return (
    <div className='bg-[#f6f8fc] h-[100vh] w-[100vw] overflow-hidden'>
      {
        !user ? (<Login />) : (
          <>
            <Navbar />
            <RouterProvider router={router} />
            <div className='absolute w-[30%] bottom-0  right-20 z-10'>
              <SendMail />

            </div>
          </>
        )
      }
    </div>
  )
}

export default App
