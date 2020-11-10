import React from 'react';
import globalStyles from './globalStyles';

export default function LoginScreen(props){
    const { onInputChange, email, password, redirectToSignup, onSubmitLogin } = props;
 
    return(
        <div id="main">
            <div className="inputwrapper">
                <span className="inputlabel">Email</span>
                <input type="email" name="email" placeholder="Enter email..." value={email} onChange={onInputChange} className="inputtext" />
            </div>
            <div className="inputwrapper">
                <span className="inputlabel">Password</span>
                <input type="password" name="password" placeholder="Enter password..." value={password} onChange={onInputChange} className="inputtext" />
            </div>
            <a onClick={onSubmitLogin} className="submitbtn">Login</a>
            <span className="redirectwrapper">Don't have account? <a onClick={redirectToSignup} className="redirectbtn">Sign Up</a></span>
            <style jsx="true">{`
                #main {
                    padding: 30px 20px;
                }
                .inputwrapper{
                    padding: 10px 20px;
                    margin: 0 auto;
                    margin-bottom: 10px;
                    border: 5px solid ${globalStyles.colors.boxshadow};
                    border-radius: 0.2em;
                }
                .inputlabel {
                    display: block;
                    font-size: 1.2em;
                    font-weight: 500;
                    text-transform: uppercase;
                    color: ${globalStyles.colors.darkblue};
                }
                .inputtext {
                    width: 100%;
                    font-size: 1em;
                    margin-top: 10px;
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
                .redirectwrapper{
                    display: flex;
                    align-items: center;
                    margin: 50px 0;
                }
                .redirectbtn {
                    background: ${globalStyles.colors.lightblue};
                    color: ${globalStyles.colors.white};
                    border: 5px solid ${globalStyles.colors.boxshadow};
                    border-radius: 0.2em;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 5px;
                    width: 100px;
                    height: 35px;
                }
            `}</style>
        </div>
    )
}