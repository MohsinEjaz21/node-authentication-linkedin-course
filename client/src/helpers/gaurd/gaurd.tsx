import { Navigate } from 'react-router-dom';
import useUser from 'src/auth/useUser';



function PrivateRoute(props: IPrivateRouteProps) {

  // const { isLogined } = AuthSliceState();
  const { user } = useUser();
  console.log("user 🌈", user)

  const renderFn = () => {
    if (!user) {
      return <Navigate to="/login" />
    }
    return props.children
  }

  return renderFn()
}


interface IPrivateRouteProps {
  isLogined?: boolean;
  hasRole?: IROLES,
  children: any;
}

type IROLES = "ADMIN" | "USER" | "GUEST";

export default PrivateRoute;