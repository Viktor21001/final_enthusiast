
// // import './App.css'
import Navbar from './components/Navbar/Navbar'
import SideNavbar from './components/SideNavbar/SideNavbar'

// function App() {
  

//   return (
//     <div>
//       <Navbar />
//       <SideNavbar />
//     </div>
//   )

// import "./App.css";
import Ideas from "./components/Ideas/Ideas";
import StartUps from "./components/StartUps/StartUps";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <SideNavbar />
          <Routes>
            <Route path="/startups" element={<StartUps />} />
            <Route path="/ideas" element={<Ideas />} />

            {/* <Route path="/startUp/:id" element={<OneStartUp/>} /> */}
            {/* <Route path="/idea/:id" element={<OneIdea/>} /> */}

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/registration" element={<Registration />} /> */}
            {/* <Route path="/newstartup" element={<NewStartUp />} /> */}
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );

}

export default App;
