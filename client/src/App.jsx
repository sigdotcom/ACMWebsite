import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/layout";
import General from "./pages/general/general";
import './App.css'
function App() {

  return (
    <Router>
      <Routes> {/* Browser Router will from here on out serve the correct page based on what the URL is set to. 
                  Default element is general (because "/" should should the general page) */}
        <Route path='/' element={<Layout />}>
          <Route index element={<General />} />
          {/* <Route path="security" element={<Security />} />    <-- example of how security page would be routed*/}
        </Route>
      </Routes>
    </Router>
  );
}

export default App
