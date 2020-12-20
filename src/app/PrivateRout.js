import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function PrivateRoute({children, ...rest}) {
    const auth = useSelector(state => state.authorization);


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