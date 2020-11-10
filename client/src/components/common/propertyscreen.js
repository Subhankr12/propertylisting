import React from 'react';
import globalStyles from './globalStyles';
import propertyPng from '../../assets/property.png';


export default function PropertyScreen(props){
    const { houses, loggedin, applied, userType, onApplyClick} = props;
    return(
        <div className="container">
            {houses.map((house, index) => 
                <div className="housewrapper" key={index}>
                    <img src={propertyPng} alt="property image" className="houseimg"/>
                    <div className="houseoptions">
                        <div className="housedetails">
                            <h3>{house.location}</h3>
                            <h4>BHK: {house.bhk}</h4>
                            <h5>&#8377; {house.price.toLocaleString('en-IN')}</h5>
                        </div>
                        {loggedin &&
                            <div className="applybtnwrapper">
                                <a className="applybtn" onClick={() => onApplyClick(house._id)}>{applied.some(index => index === house._id) ? 'Applied': 'Apply'}</a>   
                            </div>
                        }
                    </div>
                </div>
            )
            }
            <style jsx="true">{`
                .container {
                    height: ${userType === 'landlord' ? '75vh' : '85vh'};
                    overflow: auto;
                }
                .housewrapper {
                    background: ${globalStyles.colors.white};
                    padding: 10px;
                    margin: 10px;
                    border-radius: 0.2em;
                }
                .houseimg{
                    width: 100%;
                }
                .houseoptions{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .applybtnwrapper{
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                }
                .applybtn{
                    height: 33px;
                    width: 70px;
                    text-align: center;
                    background: ${globalStyles.colors.lightblue};
                    color: ${globalStyles.colors.white};
                    border: 5px solid ${globalStyles.colors.boxshadow};
                    border-radius: 0.2em;
                    box-sizing: border-box;
                    margin: 10px;
                }
            `}</style>
        </div>
    )
}