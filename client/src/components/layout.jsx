import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

function Layout() {
    // This Layout page shows how each page will be rendered. The navbar and footer should always appear on every page, and the content
    // of the page will be rendered in the <Outlet /> section. 
    return (
        <>
            {/* <Navbar /> */}
            <Navbar /> 
            <main>
                <Outlet />
            </main>
            <Footer />
            {/* Footer goes here */}
        </>
    );
}

export default Layout;