import { Navigate } from 'react-router-dom';
import { authSliceState } from 'src/redux/store';



function PrivateRoute(props: IPrivateRouteProps) {

  const { isLogined } = authSliceState();

  const renderFn = () => {
    if (!isLogined) {
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