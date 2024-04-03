// // import './App.css'
import Navbar from './components/Navbar/Navbar';
import SideNavbar from './components/SideNavbar/SideNavbar';
import Registration from './components/Reg/Reg';
import Login from './components/Login/Login';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

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
import { UserProvider } from './UserContext';
import NewIdea from './components/newIdea/NewIdea';
import NewStartUp from './components/NewStartUp/NewStartUp';
import OneStartUp from './components/OneStartUp/OneStartUp';

function App() {
  return (
    <>
      <Provider store={store}>

        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <div className="app-container">
              <div className="side-navbar">
                <SideNavbar />
              </div>
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<StartUps />} />
                  <Route path="/:id" element={<OneStartUp />} />
                  <Route path="/ideas" element={<Ideas />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/newidea" element={<NewIdea />} />
                  <Route path="/newstartup" element={<NewStartUp />} />


            {/*<Route path="/idea/:id" element={<OneIdea />} /> */}

                  {/* <Route path="/login" element={<Login />} /> */}
                  {/* <Route path="/registration" element={<Registration />} /> */}
                  {/* <Route path="/newstartup" element={<NewStartUp />} /> */}
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </UserProvider>
      </Provider>
    </>
  );
}

export default App;
