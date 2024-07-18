import React, { useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/Queries";
import { useAuth } from "../context/auth/authContext";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CREATE_USER } from "../graphql/Mutations";
const Auth = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [login, { loading, error }] = useLazyQuery(LOGIN_USER, {
    errorPolicy: "all",
  });

  const [createUser, {loading:createUserLoading,error:createUserError} ] =useMutation(CREATE_USER);
  const [isLogin, setIsLogin] = useState(true);
  const { authData, login: loginAuthUser, logout: logoutUser } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    try {
      if(isLogin){
        //login query request
      const { data } = await login({ variables: { email, password } });
      // set the auth data in the context

      loginAuthUser({ ...data.login, email });
      }else{
        await createUser({variables:{user:{email,password}}});
        setIsLogin(true);
      }
    } catch (e) {
      console.error(e);
    }

   
  };



  const logoutHandler = async (event) => {
    logoutUser();
  };
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          {!authData.isAuthenticated && (
            <Col md={6}>
              <h2 className="text-center mt-4">{isLogin ? "Login" : "Sign up"}
              </h2>
              {isLogin && error && (
                <Alert variant="danger" className="mt-3">
                  {`Error ${isLogin ? "Login" : "Sign up"} in:`}
                  {error.networkError?.result?.errors.map(
                    ({ message }, index) => (
                      <span key={index}>{message}</span>
                    )
                  )}
                </Alert>
              )}
              {!isLogin && createUserError && (
                <Alert variant="danger" className="mt-3">
                  {`Error ${isLogin ? "Login" : "Sign up"} due to:`}
                  <ul>
                  {createUserError.graphQLErrors.map(
                    ({ message }, index) => (
                      <li key={index}>{message}</li>
                    )
                  )}
                  </ul>
                  
                </Alert>
              )}

              <div className="d-flex justify-content-center">
                <Button
                  variant={isLogin ? "primary" : "outline-primary"}
                  className="mx-2"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? "primary" : "outline-primary"}
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </Button>
              </div>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="formBasicEmail" className="mt-2">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    ref={passwordRef}
                    required
                  />
                </Form.Group>
                <Button
                  className="mt-2"
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  block
                >
                  {!isLogin && (createUserLoading ? "Signing up..." : "Sign up")}
                  {isLogin && (loading ? "Logging in..." : "Login")}
                </Button>
              </Form>
            </Col>
          )}
          {authData.isAuthenticated && (
            <Col md={6}>
              <Card className="mt-5 p-2">
                <Card.Body>
                  <Card.Text>Login User: {authData.email}</Card.Text>
                </Card.Body>
                <Button variant="primary" onClick={logoutHandler}>
                  Logout
                </Button>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Auth;
