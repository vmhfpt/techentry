import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Router from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
       <ToastContainer />
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </>
  )
}

export default App
