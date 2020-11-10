import React from 'react';
import globalStyles from './common/globalStyles';
import NavBar from './common/navbar';
import Loader from './common/loader';

let screen = ['loading', 'result', 'error'];

export default class About extends React.Component{
    constructor(){
        super();
        this.state = {
            screen: screen[0],
            loggedin: false,
        }
    }
    componentDidMount(){
        this.setState({
            loggedin: localStorage.jwtToken ? true : false,
        }, () => setTimeout(() => {
                this.setState({
                    screen: screen[1],
                })
            }, 1000)
        )
    }
    render(){
        return(
            <div className="container">
                <NavBar loggedin={this.state.loggedin} />
                {this.state.screen === screen[0] ?
                    <Loader />
                    :
                    <span className="heading">About Page soon to be Updated...</span>
                }
                <style jsx="true">{`
                    .heading{
                        color: ${globalStyles.colors.darkblue};
                        font-size: ${globalStyles.fontSize.heading};
                        display: block;
                        text-align: center;
                        margin: 100px auto;
                    }
    
                    @media screen and (min-width: 960px){
                        .heading{
                            font-size: ${globalStyles.fontSize.extraLarge};
                        }
                    }
                `}</style>
            </div>
        )
    }
}