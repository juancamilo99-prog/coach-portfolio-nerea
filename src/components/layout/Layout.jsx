import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Footer'


export function Layout () {
  return (
    <>
        <div>
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  )
}
