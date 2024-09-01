import React, { useState, useRef, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';

const AppLayout = () => {
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);
  const [expandSize, setExpandSize] = useState('lg');

  const searchFormRef = useRef(null);

  const showSearchForm = () => {
    setIsSearchFormVisible(!isSearchFormVisible);
  };

  const handleClickOutside = event => {
    if (searchFormRef.current && !searchFormRef.current.contains(event.target)) {
      setIsSearchFormVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 991) {
        setExpandSize('lg');
      } else {
        setExpandSize('sm');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSearchFormVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchFormVisible]);

  return (
    <div className='main-container'>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className='logo'>
            <img src='https://www.wavve.com/img/ci-wavve.5b304973.svg' alt='wavve' />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expandSize}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expandSize}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expandSize}`}
            placement='end'
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='me-auto my-2 my-lg-0 nav-menu-wrap'>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  드라마
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  예능
                </Nav.Link>
                <Nav.Link as={Link} to='/movies' className='nav-font-style'>
                  영화
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  애니
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  해외시리즈
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  시사교양
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  키즈
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  영화플러스
                </Nav.Link>
                <Nav.Link as={Link} to='#' className='nav-font-style'>
                  LIVE
                </Nav.Link>
              </Nav>
              <Form className={`d-flex search-form-group ${isSearchFormVisible ? 'active' : ''}`} ref={searchFormRef}>
                <Button className={`search-button ${isSearchFormVisible ? 'active' : ''}`} onClick={showSearchForm}>
                  <svg
                    data-v-d955b8b8=''
                    width='22'
                    height='22'
                    viewBox='0 0 22 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      clip-rule='evenodd'
                      d='M15.4508 8.90796C15.4508 12.4977 12.5396 15.408 8.94985 15.408C5.3611 15.408 2.45081 12.4977 2.45081 8.90796C2.45081 5.31825 5.3611 2.40796 8.94985 2.40796C12.5396 2.40796 15.4508 5.31825 15.4508 8.90796Z'
                      stroke='#A5A5A5'
                      stroke-width='2'
                    ></path>
                    <path
                      d='M14.0474 13.6536L19.7904 19.2229'
                      stroke='#A5A5A5'
                      stroke-width='2'
                      stroke-linecap='round'
                    ></path>
                  </svg>
                </Button>
                <Form.Control
                  type='search'
                  placeholder='제목, 장르, 배우로 찾아보세요'
                  className={`me-2 search-form ${isSearchFormVisible ? 'active' : ''}`}
                  aria-label='Search'
                />
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
