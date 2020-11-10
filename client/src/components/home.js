import React from 'react';
import axios from 'axios';
import NavBar from './common/navbar';
import globalStyles from './common/globalStyles';
import Loader from './common/loader';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropertyScreen from './common/propertyscreen';

let screen = ['loading', 'result', 'error'];

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            screen: screen[0],
            houses: [],
            loggedin: false,
            userType: "",
            applied: [],
        }
        this.handleApplyClick = this.handleApplyClick.bind(this);
    }
    componentDidMount(){
        if(localStorage.jwtToken){
            let decode = jwt_decode(localStorage.jwtToken);

            this.setState({
                loggedin: true,
                userType: decode.usertype.toLowerCase(),
            })
        }
        else {
            this.setState({
                loggedin: false,
            })
        }

        axios.get('/property/')
            .then(property => {
                this.setState({
                    screen: screen[1],
                    houses: property.data,
                })
            })
            .catch(err => console.log(err));
    }
    handleApplyClick(propertyId){
        let decode = jwt_decode(localStorage.jwtToken);

        axios.post('/property/apply', {
                propertyId: propertyId,
                userId: decode.id,
                name: decode.name,
            })
            .then(res => {
                console.log(res);
                let duplicateApplied = [...this.state.applied];
                duplicateApplied.push(propertyId);
                this.setState({
                    applied: duplicateApplied,
                })
            })
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="main">
                <NavBar loggedin={this.state.loggedin}/>
                {this.state.screen === screen[0] ?
                    <Loader />
                    :
                    <div className="propertywrapper">
                        <h2 className="heading">Rent Your Dream Home</h2> 
                        {this.state.loggedin && this.state.userType === 'landlord' &&
                            <div className="listbtnwrapper">
                                <Link to="/admin" className="propertylistbtn">List Property</Link>   
                            </div>
                        }
                        <PropertyScreen 
                            houses={this.state.houses} 
                            loggedin={this.state.loggedin}
                            applied={this.state.applied}
                            onApplyClick={this.handleApplyClick}
                            userType={this.state.userType}
                        />
                    </div>   
                }
                <style jsx="true">{`
                    .listbtnwrapper{
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                    .propertylistbtn{
                        height: 35px;
                        width: 35%;
                        background: ${globalStyles.colors.darkblue};
                        color: ${globalStyles.colors.white};
                        box-shadow: 2px 0px 20px 0px ${globalStyles.colors.boxshadow};
                        border-radius: 0.2em;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin: 10px;
                    }
                    .heading{
                        color: ${globalStyles.colors.darkblue};
                        margin: 15px;
                        margin-bottom: 5px;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    }
}