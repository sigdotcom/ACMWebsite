import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";

function Layout() {
    // This Layout page shows how each page will be rendered. The navbar and footer should always appear on every page, and the content
    // of the page will be rendered in the <Outlet /> section. 
    return (
        <>
            {/* <Navbar /> */}
            <main>
                <Outlet />
            </main>
            {/* Footer goes here */}
        </>
    );
}

export default Layout;