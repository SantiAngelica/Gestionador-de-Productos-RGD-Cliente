import { useLocation } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ children }) {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <>
      {!hideHeader && <Header />}
      {children}
    </>
  );
}

export default Layout;