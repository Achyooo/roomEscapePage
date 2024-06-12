// App.js

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ReservationProvider } from './libs/common/ReservationContext';

import MainPage from './pages/MainPage';
import RegisterPage from './pages/authPage/RegisterPage';
import LoginPage from './pages/authPage/LoginPage';
import ThemePage from './pages/ThemePage';
import ReservationPage from './pages/reservPage/ReservationPage';
import ReservationMakePage from './pages/reservPage/ReservationMakePage';
import ReservationSuccessPage from './pages/reservPage/ReservationSuccessPage';
import ReservationLookPage from './pages/reserveLookPage/ReservationLookPage';
import ReservationLookSuccessPage from './pages/reserveLookPage/ReservationLookSuccessPage';
import PostListPage from './pages/reviewPage/PostListPage';
import PostPage from './pages/reviewPage/PostPage';
import WritePage from './pages/reviewPage/WritePage'

function App() {
  return (
    // <ReservationProvider>
      <Routes>
        <Route index element={<MainPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/theme" element={<ThemePage/>}/>
        <Route path="/reservation" element={<ReservationPage/>}/>
        <Route path="/reservationMake" element={<ReservationMakePage/>}/>
        <Route path="/reservationSuccess" element={<ReservationSuccessPage/>}/>
        <Route path="/reservationLook" element={<ReservationLookPage/>}/>
        <Route path="/reservationLookSuccess" element={<ReservationLookSuccessPage/>}/>
        <Route path="/review" element={<PostListPage/>}/>
        <Route path="/:username/:id" element={<PostPage/>}/>
        <Route path="/write" element={<WritePage/>}/>
      </Routes>
    // </ReservationProvider>
  );
}

export default App;