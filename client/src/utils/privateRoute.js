import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const { token } = useSelector(state => state.auth)
  console.log({ token })
  return !!token ? (
    children
  ) : (
    <Navigate to='/login' state={{ path: location.pathname }} />
  )
}
