import React from 'react';
import globalStyles from './globalStyles';

export default React.memo(function UserType(props){
    const {onPress} = props;
    return(
        <div className="container">
            <h2 className="heading">You are a...</h2>
            <div className="btn-wrapper">
                <a className="user-type" onClick={() => onPress("Tenant")}>Tenant</a>
                <a className="user-type" onClick={() => onPress("Landlord")}>Landlord</a>
            </div>
            <style jsx="true">{`
                .heading{
                    color: ${globalStyles.colors.darkblue};
                    margin: 30px;
                    text-align: center;
                }
                .btn-wrapper{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .user-type{
                    height: 150px;
                    width: 150px;
                    background: linear-gradient(120deg, ${globalStyles.colors.white} 0%, ${globalStyles.colors.lightblue} 100%);
                    border: 5px solid ${globalStyles.colors.white};
                    border-radius: 0.5em;
                    margin: 20px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5em;
                    font-weight: 500;
                    color: ${globalStyles.colors.darkblue};
                    box-shadow: 2px 0px 20px 0px ${globalStyles.colors.boxshadow};
                }

                @media screen and (min-width: 960px){
                    .heading {
                        margin-top: 140px;
                    }
                    .btn-wrapper{
                        flex-direction: row;
                        justify-content: center;
                    }
                }
            `}</style>
        </div>
    )
})