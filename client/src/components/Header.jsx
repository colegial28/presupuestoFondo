import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto">
            {
              user?.name ? <>
                <Nav.Link>Hello, {user.name}</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
                : <>
                  <Link className='nav-link' to='/login'>Login</Link>
                  <Link className='nav-link' to='/register'>Register</Link>
                </>
            }

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
