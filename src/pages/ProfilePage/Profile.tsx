import { useUserContext } from "../../context/UserContext"
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { userInfo } = useUserContext();
    const location = useLocation();
    const navigate = useNavigate();

    if(location.pathname !== `/profile/${userInfo?.id}`){
        navigate(`/`);
    }

  return (
    <div>
      Perfil de usuario {userInfo?.firstName + ' ' + userInfo?.lastName}
    </div>
  )
}

export default Profile
