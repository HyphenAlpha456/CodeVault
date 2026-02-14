import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ViewPaste from './pages/ViewPaste'; 
function App() {
  return (
    <BrowserRouter>
      
      <div className="gradient-bg" />
      
      <Toaster 
        position="bottom-center" 
        toastOptions={{
          style: { background: '#1e293b', color: '#fff', border: '1px solid #334155' }
        }} 
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/paste/:id" element={<ViewPaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;