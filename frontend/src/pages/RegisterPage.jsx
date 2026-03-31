import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Eye, EyeOff, User, Mail, Lock, Phone } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrors({ ...errors, [id]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await register(formData);
    if (res.success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F3F6] px-4 py-12 lg:px-0">
      <div className="bg-white w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        {/* Left Half: Branding */}
        <div className="bg-primary w-full md:w-[40%] p-10 flex flex-col justify-between text-white relative">
          <div>
            <h1 className="text-4xl font-black mb-6 tracking-tight leading-tight">Looks like you're new here!</h1>
            <p className="text-xl font-medium text-white/90 leading-relaxed">Sign up with your mobile number to get started</p>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-2 text-center opacity-10 pointer-events-none">
             <User size={250} />
          </div>

          <div className="relative z-10 flex flex-col space-y-4">
             <div className="h-1 w-12 bg-[#FFE500] rounded-full"></div>
             <p className="text-xs font-bold text-[#FFE500] uppercase tracking-widest leading-loose">Experience Personalized Shopping</p>
          </div>
        </div>

        {/* Right Half: Form */}
        <div className="w-full md:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <form onSubmit={handleRegister} className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                id="name"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor="name" className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block">Full Name</label>
              {errors.name && <p className="text-xs text-red-500 mt-2 font-bold">{errors.name}</p>}
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Email ID"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor="email" className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block">Email ID</label>
              {errors.email && <p className="text-xs text-red-500 mt-2 font-bold">{errors.email}</p>}
            </div>

            <div className="relative">
              <input
                type="tel"
                id="phone"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Mobile Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <label htmlFor="phone" className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block">Mobile Number</label>
              {errors.phone && <p className="text-xs text-red-500 mt-2 font-bold">{errors.phone}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="block w-full px-0 py-3 text-sm font-bold text-[#212121] bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-primary peer transition-all duration-300"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="password" className="absolute text-xs font-bold text-gray-400 duration-300 transform -translate-y-5 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 uppercase tracking-widest hidden peer-focus:block">Enter Password</label>
              <button 
                type="button"
                className="absolute right-0 top-3 text-gray-400 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-2 font-bold">{errors.password}</p>}
            </div>

            <div className="flex flex-col space-y-6 pt-6">
              <button 
                type="submit"
                className="w-full bg-[#fb641b] text-white py-4 font-black shadow-2xl rounded-sm text-sm uppercase tracking-widest transform transition-all hover:bg-[#e05410] active:scale-95 shadow-orange-500/20"
              >
                Sign Up
              </button>
              
              <Link 
                to="/login" 
                className="w-full text-center py-4 bg-white text-primary border border-gray-100 font-extrabold shadow-sm rounded-sm text-sm uppercase tracking-widest hover:bg-gray-50 transition-colors"
              >
                Existing User? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
