// // import './App.css'
import Navbar from './components/Navbar/Navbar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Registration from './components/Reg/Reg';
import Login from './components/Login/Login';

// function App() {

//   return (
//     <div>
//       <Navbar />
//       <SideNavbar />
//     </div>
//   )

// import "./App.css";
import Ideas from './components/Ideas/Ideas';
import StartUps from './components/StartUps/StartUps';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import { UserProvider } from './UserContext';

function App() {
  return (
    <>
      <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <SideNavbar />
          <Routes>
            <Route path="/" element={<StartUps />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/startUp/:id" element={<OneStartUp />} />
            <Route path="/idea/:id" element={<OneIdea />} /> */}

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/registration" element={<Registration />} /> */}
            {/* <Route path="/newstartup" element={<NewStartUp />} /> */}
          </Routes>
        </BrowserRouter>
       </UserProvider>
      </Provider>
    </>
  );
}

export default App;
