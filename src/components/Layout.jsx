
import Header from "../components/Header";


function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
