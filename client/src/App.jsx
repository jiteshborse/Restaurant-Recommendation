import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RestaurantProvider } from './context/RestaurantContext.jsx';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import RestaurantDetail from './pages/RestaurantDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <RestaurantProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RestaurantProvider>
  );
}

export default App;