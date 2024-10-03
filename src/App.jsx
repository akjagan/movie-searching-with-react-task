import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Movies from "./Components/Movies";
import { FaMoon, FaSun } from "react-icons/fa";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
          <header className="pt-12 pb-4 w-full">
            <h1 className="font-medium text-blue-800 text-center text-xl sm:text-xl md:text-8xl dark:text-white">
            Movie Searching App
            </h1>
            <span className="top-2 right-2 absolute">
              <button onClick={toggleDarkMode}>
                {darkMode ? <FaMoon className="w-6 sm:w-8 h-6 sm:h-8 text-slate-100"/> : <FaSun className="w-6 sm:w-8 h-6 sm:h-8"/>}        
              </button>
            </span>
          </header>
          <main className="p-8 pt-0">
            <Movies />
          </main>
          <Toaster />
        </div>
      </div>
    </Router>
  );
}

export default App;














// import { useState, useEffect } from "react";
// import { Toaster } from "react-hot-toast";
// import Movies from "./Components/Movies";
// import { FaMoon, FaSun } from "react-icons/fa";
// // import { useDarkMode } from "./hooks/useDarkMode";
// import { BrowserRouter as Router } from "react-router-dom";
// import './App.css';

// function App() {
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("darkMode") === "dark";
//   });

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("darkMode", darkMode ? "dark" : "light");
//   }, [darkMode]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   // const [darkMode, setDarkMode] = useState(true);
//   // const toggleDarkMode = () => {
//   //   setDarkMode(!darkMode);
//   //   localStorage.setItem("darkMode", !darkMode ? 'dark' : 'light');
//   // };

//   return (
//     <Router>
//       <div className="{`${darkMode ? 'dark' : ''}` }">
//         <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
//           <header className="pt-12 pb-4 w-full">
//             <h1 className="font-bold text-black dark:text-white text:4xl text-center sm:text-5xl md:text-6xl">
//               Arun Movieflix- The Movie Searching App
//             </h1>
//             <span className="top-2 right-2 absolute">
//               <button onClick={toggleDarkMode}>
                
//                 {darkMode ? <FaMoon className="w-6 sm:w-8 h-6 sm:h-8 text-slate-100"/> : <FaSun className="w-6 sm:w-8 h-6 sm:h-8"/>}        
//               </button>

//             </span>
//           </header>
//           <main className="p-8 pt-0">
//             <Movies />
//           </main>
//           <Toaster />


//         </div>
//       </div>
//     </Router>
//   );
// };

  

// export default App;