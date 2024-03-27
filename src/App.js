import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";


import { Nav, Navbar, NavDropdown } from "react-bootstrap";





import Lenyilo_gabor from "./sajatosztalyok/Lenyilo_gabor"
import Torles_uzlet from "./sajatosztalyok/Torles_uzlet"
import Torles_varos from "./sajatosztalyok/Torles_varos"

//-----------Erik----------//
import Kereses2 from "./sajatosztalyok/Kereses2"
import Torles_komment from "./sajatosztalyok/Torles_komment"

//-----------Tibi----------//
import Diagram_film from "./sajatosztalyok/Diagram_etelek"
import Torles_etelek from "./sajatosztalyok/Torles_etelek"
import Torles_eteltipusok from "./sajatosztalyok/Torles_eteltipusok"
import Diagram2 from "./sajatosztalyok/Diagram2"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Link to={"/"} className="navbar-brand">
            Záródoga
          </Link>
          <div className="navbar-nav mr-auto">
 
            {/*<li className="nav-item">
              <Link to={"/Kereses"} className="nav-link">
                Keresés
              </Link>
            </li>*/}

            
            <li className="nav-item">
              <Link to={"/Kereses2"} className="nav-link">
                Keresés2
              </Link>
            </li>

            

            <li className="nav-item">
              <Link to={"/Lenyilo_gabor"} className="nav-link">
                Lenyíló
              </Link>
            </li>
                     

            

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_komment"} className="nav-link">
                  Komment törlése
                </Link>
              </li>
            )}


            

            {/*{showAdminBoard && (
              <li className="nav-item">
                <Link to={"/probaAdmin"} className="nav-link">
                  PróbaAdmin
                </Link>
              </li>
            )}*/}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_uzlet"} className="nav-link">
                  Üzlet Törlés
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_varos"} className="nav-link">
                  Város Törlés
                </Link>
              </li>
            )}

            {showAdminBoard && (
               <li className="nav-item">
                <Link to={"/Diagram_film"} className="nav-link">
                  Diagram ételek
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Diagram2"} className="nav-link">
                  Diagram típusok
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_etelek"} className="nav-link">
                  Törlés ételek
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Torles_eteltipusok"} className="nav-link">
                  Törlés típusok
                </Link>
              </li>
            )}

            
          </div>
        
         
          
        </Nav>
        <Nav>
        {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
           
            
           
            
            {/*<Route path="/Kereses" component={Kereses} />*/}
           
            {/*<Route path="/probaAdmin" component={probaAdmin} />*/}
            <Route path="/Lenyilo_gabor" component={Lenyilo_gabor} />
            <Route path="/Torles_uzlet" component={Torles_uzlet} />
            <Route path="/Torles_varos" component={Torles_varos} />

            {/*-------Erik-------*/}
            <Route path="/Kereses2" component={Kereses2} />
            <Route path="/Torles_komment" component={Torles_komment} />

            {/*-------Tibi-------*/}
            <Route path="/Diagram_film" component={Diagram_film} />
            <Route path="/Torles_etelek" component={Torles_etelek} />
            <Route path="/Torles_eteltipusok" component={Torles_eteltipusok} />
            <Route path="/Diagram2" component={Diagram2} />
            



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
