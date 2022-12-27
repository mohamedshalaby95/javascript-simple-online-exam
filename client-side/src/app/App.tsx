import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PracticeScreen from "../pages/practice-screen";
import PageNotFound from "../pages/not-found";
import "react-toastify/dist/ReactToastify.css";
import RankScreen from "../pages/rank-screen";
import Home from "../pages/home";
 // this componet contain the routes at app
function App() {
  return (
    <div className="App">
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

      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="" element={<Home/>} />
          <Route path="practice" element={<PracticeScreen />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="rank" element={<RankScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
