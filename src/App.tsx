import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ArchivePage from '@/pages/ArchivePage'
import HomePage from '@/pages/HomePage'
import PostPage from '@/pages/PostPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostPage />} />
        <Route path="/archive" element={<ArchivePage />} />
      </Routes>
    </BrowserRouter>
  )
}
