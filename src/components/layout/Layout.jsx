import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;