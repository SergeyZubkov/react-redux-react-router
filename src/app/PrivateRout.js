import {Route, Redirect} from 'react-router-dom';
import {useAuth} from './auth-hook';

export default function PrivateRoute({children, ...rest}) {
    const auth = useAuth();


    return <Route
                {...rest}
                render={({location}) => 
                    auth.userId
                    ? (children)
                    : <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                      />
                }
            />
}