import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from  './components/admin';
import Home from './components/home';
import About from './components/about';
import Login from './components/login';
import globalStyles from './components/common/globalStyles';

function App() {
  return (
    <Router>
      <div className="root">
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/about" component={About}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </div>
      <style jsx="true" global="true">{`
            body{
                background-color: #f2fcff;
                box-sizing: border-box;
            }
            input {
              border: none;
              background: transparent;
              outline: none;
            }
            a {
              cursor: pointer; 
              text-decoration: none;
            }
            ul{
              list-style: none;
              margin: 0;
              padding: 0;
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
            }
            ::placeholder {
              color: #80808077;
            }
            .page-heading{
              background: ${globalStyles.colors.red};
              color: ${globalStyles.colors.white};
              font-weight: ${globalStyles.fontWeight.semiBold};
              font-size: ${globalStyles.fontSize.heading};
              border: 3px solid ${globalStyles.colors.white};
              border-radius: 0.5em;
              box-shadow: 6px 6px 20px 6px ${globalStyles.colors.boxshadow};
              width: 300px;
              text-align: center;
              margin: 15px auto;
              padding: 10px 0;
            }
        `}</style>
    </Router>
  );
}

export default App;
