import React, { useState, useEffect } from "react";
import { AiOutlineKey, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Cek apakah pengguna sudah login sebelumnya
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    console.log(token, username, email, role);
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  // Fungsi Menangani Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset pesan error

    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      const { token, role, username } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);

        // Redirect sesuai role
        if (role === "admin") {
          navigate("/home");
        } else {
          navigate("/dashboard"); // Misalnya halaman lain untuk user biasa
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Email atau Password Salah");
      } else {
        setMessage("Terjadi kesalahan, coba lagi nanti.");
      }
      console.error("Login Error", error);
    }
  };

  return (
    <main className="w-full font-poppins bg-orange-500">
      <div className="w-full min-h-screen flex flex-col justify-center items-center">
        <div className="w-[900px] h-[600px] bg-white flex justify-center items-center rounded-lg shadow-xl">
          {/* Gambar sebelah kiri */}
          <div className="w-[500px] h-full bg-blue-600 flex justify-center items-center rounded-l-lg">
            <img
              src="https://img.freepik.com/premium-photo/peach-orange-background-cement-floor-texture-concrete-texture-old-vintage-grunge-texture-design-ar-23-v-52-job-id-e3cfd4568627402fa5ea7abcd147573f_941600-62968.jpg?w=740"
              alt="login"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Form Login */}
          <div className="w-[500px] h-full bg-white rounded-r-lg flex flex-col justify-center items-center px-8">
            <h1 className="text-4xl text-gray-800 font-pacifico">
              Welcome Back!
            </h1>
            <p className="text-gray-600 text-sm font-light">
              Login to your account.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 w-full">
              {/* Input Email */}
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full border-b border-black py-2 px-4 focus:outline-none"
                  required
                  autoComplete="email"
                />
                <AiOutlineMail className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Input Password */}
              <div className="relative w-full pt-4">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-b mb-4 border-black py-2 px-4 focus:outline-none"
                  required
                  autoComplete="current-password"
                />
                <AiOutlineKey className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Tombol Login */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 hover:bg-gray-800 rounded-lg h-11 shadow-lg duration-500"
              >
                Login
              </button>
            </form>

            {/* Pesan Error */}
            {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

// import { Button, Input } from "antd";
// import { useState } from "react";

// const Login = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-orange-500">
//       <div className="relative w-[1000px] h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden">
//         {/* Sliding background */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl transition-transform duration-500 transform ${
//             isLogin ? "translate-x-full" : "translate-x-0"
//           }`}
//         ></div>

//         {/* Form sections */}
//         <div className="relative grid grid-cols-2">
//           {/* Login Section */}
//           <div
//             className={`p-10 transition-opacity duration-500 ${
//               isLogin ? "opacity-100" : "opacity-0 pointer-events-none"
//             }`}
//           >
//             <h2 className="text-3xl font-bold mb-5 text-center">Login</h2>
//             <Input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 mb-4 border rounded"
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 mb-4 border rounded"
//             />
//             <Button
//               type="primary"
//               className="w-full bg-indigo-600 text-white mt-4"
//             >
//               Sign In
//             </Button>
//             <p className="text-center mt-4">
//               Don’t have an account?{" "}
//               <Button
//                 type="link"
//                 className="p-0"
//                 onClick={() => setIsLogin(false)}
//               >
//                 Sign Up
//               </Button>
//             </p>
//           </div>

//           {/* Sign Up Section */}
//           <div
//             className={`p-10 transition-opacity duration-500 ${
//               isLogin ? "opacity-0 pointer-events-none" : "opacity-100"
//             }`}
//           >
//             <h2 className="text-3xl font-bold mb-5 text-center">
//               Create Account
//             </h2>
//             <Input
//               type="text"
//               placeholder="Name"
//               className="w-full p-3 mb-4 border rounded"
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 mb-4 border rounded"
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               className="w-full p-3 mb-4 border rounded"
//             />
//             <Button
//               type="primary"
//               className="w-full bg-indigo-600 text-white mt-4"
//             >
//               Sign Up
//             </Button>
//             <p className="text-center mt-4">
//               Already have an account?{" "}
//               <Button
//                 type="link"
//                 className="p-0"
//                 onClick={() => setIsLogin(true)}
//               >
//                 Login
//               </Button>
//             </p>
//           </div>
//         </div>

//         {/* Toggle Button */}
        
       
//       </div>
//     </div>
//   );
// }
// export default Login