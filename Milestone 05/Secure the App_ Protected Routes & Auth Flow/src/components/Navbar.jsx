import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar component.
 * BUG 4 FIXED: Navbar dynamically checks authentication state,
 * greeting the active user and exposing the functional Logout action.
 */
function Navbar() {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuth();

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-brand-600 font-bold text-xl">
          <Shield className="w-6 h-6" />
          <span>VaultApp</span>
        </Link>
        
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/dashboard" className="text-slate-600 hover:text-brand-600 transition-colors">Dashboard</Link>
          <Link to="/settings" className="text-slate-600 hover:text-brand-600 transition-colors">Settings</Link>
          
          <div className="h-6 w-px bg-slate-200 mx-2"></div>
          
          {/* BUG 4 FIXED: Conditionally rendering authentication controls */}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-slate-700">
                {user?.name}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-brand-50 text-brand-600 px-4 py-2 rounded-lg hover:bg-brand-100 transition-all font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
