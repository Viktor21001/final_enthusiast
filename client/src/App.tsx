import './App.css'
import StartUp1 from './components/StartUp/StartUp';
import StartUps from './components/StartUps/StartUps';
import { store } from './redux/store'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <>
   <Provider store={store}>
      <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/startups" element={<StartUps />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/startUp/:id" element={<StartUp1/>} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/newstartup" element={<NewStartUp />} />
                </Routes>          
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
