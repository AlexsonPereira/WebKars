import { Route, Routes } from 'react-router-dom'
import Session from '../pages/Session'
import Homepage from '../pages/homePage'
import ProductPage from '../pages/ProductPage'
import ProfilePage from '../pages/ProfilePage'
import RegisterPage from '../pages/RegisterPage'
import RecoveryPassword from '../pages/RecoveryPassword'
import NotFound from '../pages/NotFound'
import Loading from '../components/Loading'

const Routed = () => (
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/session" element={<Session />} />
    <Route path="/product/:id" element={<ProductPage />} />
    <Route path="/profile/:id" element={<ProfilePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="users/resetPassword/:token" element={<RecoveryPassword />} />
    <Route path="/notFound" element={<NotFound />} />
    <Route path="/loading" element={<Loading />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)
export default Routed
