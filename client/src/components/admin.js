import React from 'react';
import axios from 'axios';
import globalStyles from './common/globalStyles';
import jwt_decode from 'jwt-decode';
import Loader from './common/loader';

let screen = ['loading', 'result', 'error'];

export default class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screen: screen[0],
            location: "Delhi",
            bhk: "",
            price: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        if(!localStorage.jwtToken){
            window.location.href = './';
        }else if(localStorage.jwtToken){
            let decode = jwt_decode(localStorage.jwtToken);
            if(decode.usertype !== 'Landlord'){
                window.location.href = './';
            }else {
                this.setState({
                    screen: screen[1]
                })
            }
        }
    }  
    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(){
        let decode = jwt_decode(localStorage.jwtToken)
        axios.post('/property/add', {
           location: this.state.location,
           bhk: this.state.bhk,
           price: this.state.price,
           landlordId: decode.id
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
    }
    render(){
        return ( 
            <div id="main">
                {this.state.screen === screen[0] ?
                    <Loader />
                    :
                    <>
                        <h1 className="page-heading">ADMIN Page!</h1>
                        <div className="inputwrapper">
                            <span className="inputlabel">Location</span>
                            <select className="inputtext" value={this.state.location} name="location" onChange={this.handleInputChange}>
                                <option name="delhi">Delhi</option>
                                <option name="mumbai">Mumbai</option>
                                <option name="kolkata">Kolkata</option>
                                <option name="bangalore">Bangalore</option>
                                <option name="jaipur">Jaipur</option>
                            </select>
                        </div>
                        <div className="inputwrapper">
                            <span className="inputlabel">BHK</span>
                            <input type="number" name="bhk" placeholder="Enter BHK..." value={this.state.bhk} onChange={this.handleInputChange} className="inputtext" />
                        </div>
                        <div className="inputwrapper">
                            <span className="inputlabel">Price</span>
                            <input type="number" name="price" placeholder="Enter Price(in INR)..." value={this.state.price} onChange={this.handleInputChange} className="inputtext" />
                        </div>
                        <div className="submitbtn">
                            <a className="submit" onClick={this.handleSubmit}>Post</a>
                        </div>
                    </>
                }
                <style jsx="true">{`
                    #main {
                        padding: 10px;
                    }
                    .inputwrapper {
                        padding: 10px 20px;
                        margin: 25px auto;
                        margin-bottom: 15px;
                        border: 5px solid ${globalStyles.colors.boxshadow};
                        border-radius: 0.5em;
                    }
                    .inputtext {
                        width: 100%;
                        font-size: 1em;
                        margin-top: 10px;
                    }
                    select.inputtext{
                       border: none;
                       background: transparent;
                       outline: none;
                    }
                    .inputlabel {
                        display: block;
                        font-size: 1.2em;
                        font-weight: 500;
                        text-transform: uppercase;
                        color: ${globalStyles.colors.darkblue};
                    }
                    .submitbtn {
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                        width: 100%;
                    }
                    .submit {
                        font-weight: 400;
                        font-size: 1.2em;
                        background-color: ${globalStyles.colors.darkblue};
                        color: ${globalStyles.colors.white};
                        padding: 10px 0;
                        border: 3px solid ${globalStyles.colors.white};
                        border-radius: 0.5em;
                        box-shadow: 6px 6px 20px 6px ${globalStyles.colors.boxshadow};
                        width: 90%;
                        margin: 0 auto;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    @media screen and (min-width: 960px){
                        #main{
                            width: 60%;
                            margin: 0 auto;
                        }
                        .submitbtn{
                            position: static;
                        }
                        .submit{
                            width: 50%
                        }
                    }
                    @media screen and (min-width: 1440px){
                        #main{
                            width: 50%;
                        }
                    }
                `}</style>
            </div>
         );
    }
}