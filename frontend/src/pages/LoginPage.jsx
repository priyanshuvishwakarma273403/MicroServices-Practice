import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await login(email, password);
    if (res.success) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F3F6] px-4 py-12 lg:px-0">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        {/* Left Half: Branding */}
        <div className="bg-primary w-full md:w-[40%] p-10 flex flex-col justify-between text-white relative">
          <div>
            <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight">Login</h1>
            <p className="text-xl font-medium text-white/90 leading-relaxed mb-4">Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-2 text-center opacity-10 pointer-events-none">
             <LogIn size={200} />
          </div>

          <div className="relative z-10 flex flex-col space-y-4">
             <div className="h-1 w-12 bg-[#FFE500] rounded-full"></div>
             <p className="text-xs font-bold text-[#FFE500] uppercase tracking-widest">Premium Member Benefits</p>
          </div>
        </div>

        {/* Right Half: Form */}
        <div className="w-full md:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="relative group">
              <input
                type="email"
                id="email"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Email/Mobile"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: '' });
                }}
              />
              <label 
                htmlFor="email" 
                className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block"
              >
                Enter Email/Mobile
              </label>
              {errors.email && <p className="text-xs text-red-500 mt-2 font-bold animate-pulse">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: '' });
                }}
              />
              <label 
                htmlFor="password" 
                className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block"
              >
                Enter Password
              </label>
              <button 
                type="button"
                className="absolute right-0 top-3 text-gray-400 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-2 font-bold animate-pulse">{errors.password}</p>}
            </div>

            <div className="flex flex-col space-y-6 pt-4">
              <p className="text-xs text-[#878787] font-medium leading-relaxed">
                By continuing, you agree to ShopKart's <span className="text-primary cursor-pointer hover:underline font-bold">Terms of Use</span> and <span className="text-primary cursor-pointer hover:underline font-bold">Privacy Policy</span>.
              </p>
              
              <button 
                type="submit"
                className="w-full bg-[#fb641b] text-white py-4 font-black shadow-2xl rounded-sm text-sm uppercase tracking-widest transform transition-all hover:bg-[#e05410] active:scale-95 shadow-orange-500/20"
              >
                Login
              </button>
              
              <Link 
                to="/register" 
                className="w-full text-center py-4 bg-white text-primary border border-gray-100 font-extrabold shadow-sm rounded-sm text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <UserPlus size={16} className="mr-3" />
                New to ShopKart? Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
