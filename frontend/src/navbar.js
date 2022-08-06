import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

export const NavbarSection= () => (
    <>
      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand to={`/`} as={Link}>Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/authors">Authors</Nav.Link>
            <Nav.Link as={Link} to={`/posts/`}>Posts</Nav.Link>
            <Nav.Link  as={Link} to={`/actors/`}>Actors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
