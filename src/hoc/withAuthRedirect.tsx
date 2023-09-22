import React from "react";
import {useAppSelector} from '../hooks/hooks';

import { Navigate } from "react-router-dom";

export const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthRedirect: React.FC<P> = (props) => {
    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (!isAuth) {
      return <Navigate to="/login" replace={true} />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthRedirect;
};
