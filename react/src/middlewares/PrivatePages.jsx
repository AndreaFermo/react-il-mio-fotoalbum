import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
export default function PrivatePages({ children }) {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" />;
  return children;
}
