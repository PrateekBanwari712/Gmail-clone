import './App.css'
import Navbar from './shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inbox from './shared/Inbox'
import Body from './components/Body'
import Mail from './components/Mail'
import SendMail from './components/sendMail'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
import { setuser } from './redux/appslice'

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
  const { user } = useSelector(store => store.appSlice)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setuser({
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL

        }));
      } else {
        dispatch(setuser(null));
      }
    })

    return () => unsubscribe();
  }, [dispatch])

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
