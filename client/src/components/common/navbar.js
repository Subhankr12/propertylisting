import React from 'react';
import { NavLink } from 'react-router-dom';
import globalStyles from './globalStyles';

export default React.memo(function NavBar(props){
    const { loggedin } = props;
    return(
        <div className="pageheader">
            <h1 className="applogo">Kiraaya</h1>
            <ul className="navbar">
                <li><NavLink to="/" exact className="nav-link" activeStyle={{background: globalStyles.colors.darkblue}}>Home</NavLink></li>
                <li><NavLink to="/about" className="nav-link" activeStyle={{background: globalStyles.colors.darkblue}}>About</NavLink></li>
                <li><NavLink to="/login"  className="nav-link" activeStyle={{background: globalStyles.colors.darkblue}}>{loggedin ? 'Profile' : 'Login'}</NavLink></li>
            </ul>  
            <style jsx="true">{`
                .pageheader {
                    background: ${globalStyles.colors.white};
                    box-shadow: 2px 0px 20px 0px ${globalStyles.colors.boxshadow};
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                }
                .applogo{
                    display: none;
                }
                .navbar{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 60px;
                }
                .nav-link{
                      color: ${globalStyles.colors.white};
                      font-size: ${globalStyles.fontSize.small};
                      text-transform: uppercase;
                      background: ${globalStyles.colors.darkbackground};
                      padding: 7px 25px;
                      border-radius: 0.3em;
                }
                @media screen and (min-width: 960px){
                    .pageheader{
                        position: static;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .applogo{
                        display: block;
                        margin: 0 20px;
                        color: ${globalStyles.colors.darkblue};
                    }
                    .navbar{
                        display: flex;
                        justify-content: flex-end;
                    }
                    .nav-link{
                        margin: 20px;
                    }
                }
            `}</style>
        </div>
    )
})