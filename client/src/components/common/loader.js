import React from 'react';
import loader from '../../assets/loader.gif';

export default React.memo(function Loader() {
    return(
       <div className="container">
            <img src={loader} className="loader" alt="loader"/>
            <style jsx="true">{`
                .loader{
                    height: 100%;
                    width: 100%;
                }

                @media screen and (min-width: 960px){
                    .loader{
                        width: 60%;
                        display: block;
                        margin: 0 auto;
                   }
                }

                @media screen and (min-width: 1440px){
                    .loader{
                        width: 45%;
                   }
                }
            `}</style>
            <style global="true">{`
                body{
                    background: #fff !important;
                }
            `}</style>
       </div>
    )
})