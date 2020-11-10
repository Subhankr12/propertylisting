import React from 'react';
import globalStyles from './common/globalStyles';
import NavBar from './common/navbar';
import Loader from './common/loader';
import UserType from './common/usertype';
import SignupScreen from './common/signupscreen';
import LoginScreen from './common/loginscreen';
import UserScreen from './common/userscreen';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

let screen = ['loading', 'login', 'usertype', 'signup', 'result', 'error'];

export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            screen: screen[0],
            userType: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            loggedin: false,
            appliedhouses: [],
        }
        this.onSelectUserType = this.onSelectUserType.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.redirectToSignup = this.redirectToSignup.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitSignup = this.handleSubmitSignup.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    componentDidMount(){
        if(localStorage.jwtToken){
            let decode = jwt_decode(localStorage.jwtToken);
            let currentTime = Date.now() / 1000;

            if(decode.exp < currentTime){
                this.handleClickLogout();
            }
            else{
                if(decode.usertype === 'Tenant'){
                    axios.get(`/property/getapplied?userId=${decode.id}`)
                        .then(res => {
                            console.log(res);
                            this.setState({
                                appliedhouses: res.data,
                                loggedin: true,
                                name: decode.name,
                                userType: decode.usertype,
                                screen: screen[4],
                            })
                        })
                        .catch(err => console.log(err));
                }
                else {
                    this.setState({
                        loggedin: localStorage.jwtToken ? true : false,
                        name: decode.name,
                        userType: decode.usertype,
                    }, () => setTimeout(() => {
                            this.setState({
                                screen: localStorage.jwtToken ? screen[4] : screen[1],
                            })
                        }, 1000)
                    )
                }
            }   
        }
        else{
            setTimeout(() => {
                this.setState({
                    screen: screen[1],
                })
            }, 1000)
        }
        
    }
    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    onSelectUserType(type){
        this.setState({
            userType: type,
            screen: screen[3],
        })
    }
    redirectToLogin(){
        this.setState({
            screen: screen[1]
        })
    }
    redirectToSignup(){
        this.setState({
            screen: screen[2]
        })
    }

    handleSubmitSignup(){
        axios.post('/users/register', {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                usertype: this.state.userType,
            })
            .then(res => {
                console.log(res)
                this.setState({
                    screen: screen[1],
                })
            })
            .catch(err => console.log(err));
    }

    handleSubmitLogin(){
        axios.post('/users/login', {
                email: this.state.email,
                password: this.state.password,
            })
            .then(res => {
                console.log(res);
                let decode = jwt_decode(res.data.token);
                localStorage.setItem("jwtToken", res.data.token);

                this.setState({
                    screen: screen[4],
                    loggedin: true,
                    name: decode.name,
                    userType: decode.usertype,
                })
            })
            .catch(err => console.log(err));
    }

    handleClickLogout(){
        localStorage.removeItem("jwtToken");
        window.location.href = './login';
    }
    render(){
        return(
            <div className="container">
                <NavBar loggedin={this.state.loggedin} />
                {this.state.screen === screen[0] ?
                    <Loader />
                    :
                    this.state.screen === screen[1] ?
                    <LoginScreen
                        onInputChange={this.handleInputChange}
                        email={this.state.email}
                        password={this.state.password}
                        redirectToSignup={this.redirectToSignup}
                        onSubmitLogin={this.handleSubmitLogin}
                    />
                    :
                    this.state.screen === screen[2] ?
                    <UserType onPress={this.onSelectUserType} />
                    :
                    this.state.screen === screen[3] ?
                    <SignupScreen 
                        onInputChange={this.handleInputChange}
                        name={this.state.name}
                        email={this.state.email}
                        password={this.state.password}
                        confirmPassword={this.state.confirmPassword}
                        redirectToLogin={this.redirectToLogin}
                        onSubmitSignup={this.handleSubmitSignup}
                     />
                     :
                     <UserScreen
                        name={this.state.name}
                        userType={this.state.userType}
                        onClickLogout={this.handleClickLogout}
                        appliedhouses={this.state.appliedhouses}
                     />
                }
                
                <style jsx="true">{`
                   
                `}</style>
            </div>
        )
    }
}