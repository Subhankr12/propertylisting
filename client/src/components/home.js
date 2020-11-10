import React from 'react';
import axios from 'axios';
import NavBar from './common/navbar';
import globalStyles from './common/globalStyles';
import Loader from './common/loader';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import PropertyScreen from './common/propertyscreen';
import filterSvg from '../assets/filter.svg'; 
import Filter from './common/filter';

let screen = ['loading', 'result', 'filter', 'error'];

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            screen: screen[0],
            houses: [],
            loggedin: false,
            userType: "",
            applied: [],
            location: "",
            bhk: "",
            price: "",
        }
        this.handleApplyClick = this.handleApplyClick.bind(this);
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.redirectToFilter = this.redirectToFilter.bind(this);
        this.handleFilterApply = this.handleFilterApply.bind(this);
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
    handleFilterInputChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleFilterApply(){
        const { location, price, bhk } = this.state;
        let query = "";
        if(location !== "") query += `location=${location}&`;
        if(price !== "") query += `price=${price}&`;
        if(bhk !== "") query += `bhk=${bhk}`;
        
        axios.get(`/property/filter?${query}`)
            .then(property => {
                this.setState({
                    screen: screen[1],
                    houses: property.data,
                })
            })
            .catch(err => console.log(err));
    }
    redirectToFilter(){
        this.setState({
            screen: screen[2],
        })
    }

    render(){
        return(
            <div className="main">
                <NavBar loggedin={this.state.loggedin}/>
                {this.state.screen === screen[0] ?
                    <Loader />
                    :
                    this.state.screen === screen[1] ?
                    <div className="propertywrapper">
                        <h2 className="heading">Rent Your Dream Home</h2> 
                        <div className="filterwrapper">
                            <a onClick={this.redirectToFilter} className="propertylistbtn">Filters
                                <img src={filterSvg} alt="filter svg" className="filtersvg"/>
                            </a>   
                            {this.state.loggedin && this.state.userType === 'landlord' &&
                                <Link to="/admin" className="propertylistbtn">List Property</Link>   
                            }
                        </div>
                        
                        <PropertyScreen 
                            houses={this.state.houses} 
                            loggedin={this.state.loggedin}
                            applied={this.state.applied}
                            onApplyClick={this.handleApplyClick}
                            userType={this.state.userType}
                        />
                    </div> 
                    :
                    <Filter 
                        location={this.state.location}
                        bhk={this.state.bhk}
                        price={this.state.price}
                        onInputChange={this.handleFilterInputChange}
                        onFilterApply={this.handleFilterApply}
                    />  
                }
                <style jsx="true">{`
                    .heading{
                        color: ${globalStyles.colors.darkblue};
                        margin: 15px;
                        margin-bottom: 5px;
                        text-align: center;
                    }
                    .filterwrapper{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .propertylistbtn{
                        height: 35px;
                        width: 130px;
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
                    .filtersvg{
                        width: 20px;
                        height: 25px;
                        margin-left: 10px;
                    }
                    @media screen and (min-width: 960px){
                        .propertylistbtn{
                            width: 200px;
                        }
                        .propertywrapper{
                            margin-top: 70px;
                        }
                        .filterwrapper{
                            width: 60%;
                            margin: 0 auto;
                        }
                    }
                `}</style>
            </div>
        )
    }
}