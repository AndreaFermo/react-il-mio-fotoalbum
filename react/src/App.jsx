import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Messages from "./pages/Messages";
import Categories from "./pages/Categories";
import DefaultLayout from "./pages/DefaultLayout";
import { AuthProvider } from "./contexts/AuthContext";
import PrivatePages from "./middlewares/PrivatePages";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/create"
              element={
                <PrivatePages>
                  <Create />
                </PrivatePages>
              }
            ></Route>
            <Route
              path="/dashboard"
              element={
                <PrivatePages>
                  <Dashboard />
                </PrivatePages>
              }
            ></Route>
            <Route
              path="/image/edit/:id"
              element={
                <PrivatePages>
                  <Edit />
                </PrivatePages>
              }
            ></Route>
            <Route
              path="/messages"
              element={
                <PrivatePages>
                  <Messages />
                </PrivatePages>
              }
            ></Route>
            <Route
              path="/categories"
              element={
                <PrivatePages>
                  <Categories />
                </PrivatePages>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
