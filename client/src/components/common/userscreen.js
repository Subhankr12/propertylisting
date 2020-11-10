import React from 'react';
import globalStyles from './globalStyles';

export default function UserScreen(props){
    const { name, userType, onClickLogout, appliedhouses } = props;
 
    return(
        <div id="main">
            <div className="detailswrapper">
                <span className="detailitem"><small>Username:</small> {name}</span>
                <span className="detailitem"><small>User Type:</small> {userType}</span>
            </div>
            <a onClick={onClickLogout} className="submitbtn">Log Out</a>

            {appliedhouses.length !== 0 &&
                <div className="housecontainer">
                    {appliedhouses.map((house, index) => 
                        <div key={index} className="detailwrapper">
                            <h2>{house.location}</h2>
                            <h4>{house.status}</h4>
                        </div>
                    )
                    }
                </div>
            }
            <style jsx="true">{`
                #main {
                    padding: 30px 20px;
                }
                .detailswrapper{
                    padding: 10px 20px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    border: 5px solid ${globalStyles.colors.boxshadow};
                    border-radius: 0.2em;
                }
                .detailitem {
                    display: block;
                    font-size: 1.2em;
                    font-weight: 500;
                    text-transform: capitalize;
                    color: ${globalStyles.colors.darkblue};
                }
                .submitbtn{
                    height: 45px;
                    background: ${globalStyles.colors.red};
                    color: ${globalStyles.colors.white};
                    border: 5px solid ${globalStyles.colors.boxshadow};
                    border-radius: 0.2em;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </div>
    )
}