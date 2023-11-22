import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import Login from "./components/login";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App-container">
        <Header />
        <Container>
          {/* <TableUsers /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
