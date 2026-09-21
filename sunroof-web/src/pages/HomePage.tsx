import { useNavigate } from "react-router-dom"

export const HomePage = () => {
  const navigate = useNavigate();

  return <div>
    <div><button onClick={() => navigate('/users')} type="button">Users</button></div>
  </div>
}