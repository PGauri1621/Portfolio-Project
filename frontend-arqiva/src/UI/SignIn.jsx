import React, { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from './ContextManager';

const SignIn = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); 
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  // Get setUserData from context
  const { setUserData } = useUser(); 

  // Handle the form submission
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });

      console.log(response.data);

      if (response.data.message) {
        // Successful login, show success toast
        setToastMessage('Login successful!');
        setToastType('success');
        setShowToast(true);

        handleClose();  
        setIsAuthenticated(true);  // Set authenticated state
        
        // Set user data after successful login
        setUserData({ email, name: response.data.name }); 
        
        navigate('/contributions'); 
      } else {
        setError('Failed to authenticate, please check your credentials.');
        setToastMessage('Failed to authenticate, please check your credentials.');
        setToastType('danger');
        setShowToast(true);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials');
      setToastMessage('Invalid credentials');
      setToastType('danger');
      setShowToast(true); 
    }
  };

  // Handle the "Forgot Password?" click
  const handleForgotPassword = () => {
    navigate('/forgot-password');  // Replace with your actual forgot-password page or modal - TODO
  };

  return (
    <div>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={toastType === 'success' ? 'success' : 'danger'}
        style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1050' }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form onSubmit={handleSignIn}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign In
            </Button>
          </Form>

          <div className="text-center mt-3">
            <Button variant="link" onClick={handleForgotPassword} style={{ padding: 0 }}>
              Forgot Password?
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignIn;
