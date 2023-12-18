import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactMeModal from "./ContactMeModal";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const payload = {
    email,
    password,
  };
  const [showContactForm, setShowContactForm] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", payload);
      console.log(response.data.user);
      setUser(response.data.user);
      setToken(response.data.token);
      console.log(token);
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setShowModal(false);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      setError(true);
    }
  };

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser();
    setToken();
    setIsLoggedIn();
    navigate("/");
  }

  const contactMe = async (email, text) => {
    try {
      const response = await axios.post("http://localhost:3002/messages", {
        email,
        text,
      });
      console.log(response);
      alert("messaggio inviato correttamente");
      setShowContactForm(false);
    } catch (error) {
      console.error("Errore nell'invio dei dati al server:", error);
    }
  };

  useEffect(() => console.log(user, isLoggedIn), [user]);

  const [showModal, setShowModal] = useState(false);
  return (
    <header className="flex items-center justify-between container mx-auto mb-10 max-h-[15vh]">
      <Link
        to={"/dashboard"}
        className=" flex justify-center items-center ms-2"
      >
        <h1 className="text-customColorQuaternary text-center text-3xl font-bold">
          Il Mio Photo Album
        </h1>
      </Link>
      <div className="relative">
        {isLoggedIn ? (
          <Link
            className="bg-white px-5 py-2 rounded transition text-xl font-bold border-2 border-customColorSecondary hover:scale-95 hover:border-customColorQuaternary hover:text-customColorQuaternary"
            to="/messages"
          >
            Messaggi
          </Link>
        ) : (
          <>
            <button
              className="bg-white px-5 py-2 rounded transition text-xl font-bold border-2 border-customColorSecondary hover:scale-95 hover:border-customColorQuaternary hover:text-customColorQuaternary"
              onClick={() => setShowContactForm(!showContactForm)}
            >
              Contattami
            </button>
            <ContactMeModal
              show={showContactForm}
              onClose={() => setShowContactForm(false)}
              onSubmit={contactMe}
            />
          </>
        )}
      </div>

      <div className="inline-block me-2">
        <div className="text-center py-3 relative">
          <button
            onClick={
              !isLoggedIn ? () => setShowModal(!showModal) : () => logout()
            }
            className={
              "bg-white px-5 py-2 rounded transition text-xl font-bold border-2 border-customColorSecondary hover:scale-95 hover:border-customColorQuaternary hover:text-customColorQuaternary"
            }
          >
            {!isLoggedIn ? "Login" : "Logout"}
          </button>

          <div
            className={`px-5 py-2 absolute z-10 top-20 right-0 bg-white flex justify-center rounded border-2 border-customColorTertiary  ${
              showModal ? "" : "hidden"
            }`}
          >
            <form className="w-72 " onSubmit={login}>
              <div>
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                  placeholder="Enter Password"
                />
              </div>
              <div
                className={`text-red-500 font-semibold pt-2 ${
                  error ? "" : "hidden"
                }`}
              >
                Dati errati
              </div>
              <div className="mt-2 gap-4">
                <button className="inline-block text-center shadow-md text-sm bg-customColorTertiary text-white rounded-sm px-4 py-1 font-bold hover:bg-customColorQuaternary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
