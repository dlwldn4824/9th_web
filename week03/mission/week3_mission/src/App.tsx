import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import UpcomingPage from './pages/UpcomingPage';
import TopRatedPage from './pages/TopRatedPage';
import NowPlayingPage from './pages/NowPlayingPage';

export default function App() {
  return (
    <Routes>
      {/* 레이아웃(공통 Navbar) 아래에 페이지들 렌더 */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/now-playing" element={<NowPlayingPage />} />
        {/* 404 */}
        <Route path="*" element={<div className="p-6">페이지를 찾을 수 없습니다.</div>} />
      </Route>
    </Routes>
  );
}
