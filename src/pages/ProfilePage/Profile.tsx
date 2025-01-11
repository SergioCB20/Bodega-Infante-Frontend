import { useUserContext } from "../../context/UserContext"

const Profile = () => {
    const { userInfo } = useUserContext();

  return (
    <div>
      Perfil de usuario {userInfo?.firstName + ' ' + userInfo?.lastName}
    </div>
  )
}

export default Profile
