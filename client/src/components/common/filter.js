import React from 'react';
import globalStyles from './globalStyles';

export default function Filter(props){
    const {location, bhk, price, onInputChange, onFilterApply } = props;
    return ( 
        <div id="main">
            <div className="inputwrapper">
                <span className="inputlabel">Location</span>
                <select className="inputtext" value={location} name="location" onChange={onInputChange}>
                    <option value="" disabled>Choose Location</option>
                    <option name="delhi">Delhi</option>
                    <option name="mumbai">Mumbai</option>
                    <option name="kolkata">Kolkata</option>
                    <option name="bangalore">Bangalore</option>
                    <option name="jaipur">Jaipur</option>
                </select>
            </div>
            <div className="inputwrapper">
                <span className="inputlabel">BHK</span>
                <input type="number" name="bhk" placeholder="Enter BHK..." value={bhk} onChange={onInputChange} className="inputtext" />
            </div>
            <div className="inputwrapper">
                <span className="inputlabel">Price</span>
                <input type="number" name="price" placeholder="Enter Price(in INR)..." value={price} onChange={onInputChange} className="inputtext" />
            </div>
            <div className="submitbtn">
                <a className="submit" onClick={onFilterApply}>Apply</a>
            </div>
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
                    bottom: 70px;
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
                        padding-top: 70px;
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