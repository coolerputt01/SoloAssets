import { StrictMode } from 'react'
import { createRoot  } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage.tsx'
import ResultsPage from './pages/ResultsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
