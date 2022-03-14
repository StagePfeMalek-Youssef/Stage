import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import { Form, Alert, FormGroup, Input, Label, Row, Col } from "reactstrap";
import {Button} from 'react-bootstrap';

import avatar from "../image/avatar.png"
import { Link } from 'react-router-dom';


import AuthenticationService from '../Service/AuthenticationService';
import SocialService from '../Service/SocialService';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';







class Login extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        
        email: "",
        password: "",
        emailSocial:sessionStorage.getItem("email"),
        passwordSocial:"kasdjhfkadhsY776ggTyUU65khaskdjfhYuHAwjnlji",
        error: "",
        token:sessionStorage.getItem("google"),
      };
    }
  
    changeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
   
  
    doLogin = async (event) => {
      event.preventDefault();
      
      AuthenticationService.useractive(this.state.email,this.state.password).then(
        (response)=> {
          let ac=response.active;
          console.log(this.ac);
            if(ac==1){
              AuthenticationService.signin(this.state.email,this.state.password).then(
                ()=>{
                  this.props.history.push('/profile');
                }
                
              )
            }else if(ac===0){
              sessionStorage.setItem("emailactive",this.state.email);
              this.props.history.push('/active');
            }else{
              alert("ereur");
            }       
        },
         
       );
    }
  
    responceGoogle=(response)=>{
       
      console.log(response.tokenId);
      console.log(this);
      SocialService.loginWithGoogle(response.tokenId).then(data=> {
        AuthenticationService.signin(data.email,this.state.passwordSocial).then(
          ()=>{
            this.props.history.push('/profile');
          }
      );
    });
      
  }

 
  responseFacebook = response => {
    console.log(response.accessToken);
    SocialService.loginWithFacebook(response.accessToken).then(data=> {
      AuthenticationService.signin(data.email,this.state.passwordSocial).then(
        ()=>{
          this.props.history.push('/profile');
        }
    );
   });
  }

  componentClicked = () => console.log("clicked");








    render() {
      return ( 
      
        <div>
           
          <AppNavbar/>
          <Container fluid>
            <Row style={{marginTop:"20px"}}>
            <Col sm="12" md={{ size: 3, offset: 4 }}>
              <div style={{marginBottom: "10px"}}>
                  
                <img src={avatar} alt="Avatar" className="avatar center" 
                  style={{width: "50%", height: "auto"}}/>
              </div>
              <Form  onSubmit={this.doLogin}>
                <FormGroup>
                  <Label for="email"><strong>Username</strong></Label>
                  <Input autoFocus 
                    type="text"
                    name="email" id="email"
                    value={this.state.email}
                    placeholder="Enter email"
                    autoComplete="email"
                    onChange={this.changeHandler}
                  />
                </FormGroup>
  
                <FormGroup>
                  <Label for="password"><strong>Password</strong></Label>
                  <Input type="password" 
                    name="password" id="password"
                    value={this.state.password}
                    placeholder="Enter Password"
                    autoComplete="password"
                    onChange={this.changeHandler}
                  />
                </FormGroup>
  
                <Button  type="submit" variant="primary" size="lg">
                  Sign In
                </Button >
                <Link to="/rezetPasswordSendEamil">motde passe oublier</Link>
                
               
                <Row className="mx-0">
                 
                <GoogleLogin
                    clientId='1067196279977-99ar67di0jnm0el8b5ase1llqb74jphh.apps.googleusercontent.com'
                    buttonText='Login'
                    onSuccess={this.responceGoogle}
                    onFailure={this.responceGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <FacebookLogin
                    appId="640459680575561"
                    autoLoad={false}
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                 />
               </Row>
               
              </Form>
              </Col>
            </Row>
          </Container>
             
         
        </div>);
    }
  }
  
  export default Login;