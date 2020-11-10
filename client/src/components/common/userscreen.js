import React from 'react';
import globalStyles from './globalStyles';

export default function UserScreen(props){
    const { name, userType, onClickLogout, appliedhouses, onStatusClick } = props;
 
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
                        <div key={index} className="housewrapper">
                            <div className="details">
                                <h2>{house.location}</h2>
                                <h4>BHK: {house.bhk}</h4>
                                <h5>Price: {house.price}</h5>
                            </div>
                            {userType === 'Tenant' ?
                                <h4 className="status">{house.status}</h4>
                                :
                                house.tenants.map((tenant, key) => 
                                    <div className="tenantwrapper" key={key}>
                                        <span className="name">{tenant.name.split(" ")[0]}</span>
                                        <div className="options">
                                            <a className="accept" onClick={() => onStatusClick(house._id, tenant.id, 'Accepted')}>Accept</a>
                                            <a className="reject" onClick={() => onStatusClick(house._id, tenant.id, 'Rejected')}>Reject</a>
                                        </div>
                                    </div>
                                )
                            }
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
                .housecontainer{
                    height: 66vh;
                    overflow: auto;
                }
                .housewrapper{
                    background: ${globalStyles.colors.white};
                    margin: 10px;
                    padding: 10px;
                    border-radius: 0.2em;
                    display: ${userType === 'Tenant' ? 'flex' : 'block'};
                    justify-content: space-between;
                    align-items: center;
                }
                .status{
                    background: ${globalStyles.colors.lightblue};
                    color: ${globalStyles.colors.white};
                    padding: 5px 10px;
                    border-radius: 0.2em;
                }
                .tenantwrapper{
                    background: ${globalStyles.colors.boxshadow};
                    color: ${globalStyles.colors.white};
                    padding: 5px 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 0.2em;
                    margin: 10px;
                }
                .name{
                    text-transform: capitalize;
                }
                .options{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .accept, .reject {
                    border-radius: 0.2em;
                    padding: 5px 10px;
                    margin: 5px;
                }
                .accept {
                    background: ${globalStyles.colors.green};
                }
                .reject {
                    background: ${globalStyles.colors.red};
                }

                ::-webkit-scrollbar {
                    width: 5px;
                }
                ::-webkit-scrollbar-track {
                    box-shadow: inset 0 0 5px ${globalStyles.colors.boxshadow};
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: ${globalStyles.colors.boxshadow};
                    height: 10px;
                    width: 10px;
                    border-radius: 10px;
                }
                @media screen and (min-width: 960px){
                    #main {
                        width: 60%;
                        margin: 0 auto;
                        margin-top: 60px;
                    }
                }
            `}</style>
        </div>
    )
}