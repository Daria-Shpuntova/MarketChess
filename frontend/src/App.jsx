import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from "./HomePage.jsx";
import {BrowserRouter as Router, Routes, Route, useLocation, useParams} from 'react-router-dom';
import Catalog from "./Сatalog.jsx";
import History from "./History.jsx";
import BasketPage from "./BasketPage.jsx";
import WishlistPage from "./WishListPage.jsx";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="chessAll" element={<Catalog />} />
        <Route path="history" element={<History />} />
        <Route path="basketPage" element={<BasketPage />} />
        <Route path="wishListPage" element={<WishlistPage />} />
      </Routes>
    </Router>
  )
}

export default App