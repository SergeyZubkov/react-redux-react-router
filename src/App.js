import './App.css';
import {Container, Row, Nav} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import PrivateRoute from './app/PrivateRout';
import LoginButton from './app/LoginButton';
import {ProvideAuth} from './app/auth-hook';
import Login from './features/login/Login';
import News from './features/news/News';
import Profile from './features/profile/Profile';

function App() {
  return (
    <div className="app">
       <ProvideAuth>
        <Router>
            <header>
              <Container>
                  <Row>
                    <Nav>
                      <Nav.Item>
                        <NavLink to="/login" activeClassName='active'>Логин</NavLink>
                      </Nav.Item>
                      <Nav.Item>
                        <NavLink to="/news" activeClassName='active'>Новости</NavLink>
                      </Nav.Item>
                      <Nav.Item>
                        <NavLink to="/profile" activeClassName='active'>Профаил</NavLink>
                      </Nav.Item>
                    </Nav>
                    <LoginButton></LoginButton>
                  </Row>
              </Container>
            </header>

            <main>
            <Container>
              <Switch>
                  <Route path='/' exact>
                    <Redirect to='/news'/>
                  </Route>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/news">
                    <News />
                  </Route>
                  <PrivateRoute path="/profile">
                    <Profile />
                  </PrivateRoute>
                </Switch>
            </Container>
            </main>
        </Router>
       </ProvideAuth>
    </div>
  );
}

export default App;
