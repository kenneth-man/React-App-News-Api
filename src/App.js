import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContextProvider from './Context.js';
import Navbar from './Components/Navbar.js';
import Home from './Components/Home.js';
import Profile from './Components/Profile.js';
import Country from './Components/Country.js';
import Recent from './Components/Recent.js';
import Top from './Components/Top.js';
import LogIn from './Components/LogIn.js';
import Register from './Components/Register.js';

//dynamic <route> has to be defined last
function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar/>

          <Switch>
            <Route exact path='/' component={LogIn}/>

            <Route exact path='/Register' component={Register}/>

            <Route exact path='/Home' component={Home}/>

            <Route exact path='/Country' component={Country}/>

            <Route exact path='/Recent' component={Recent}/>

            <Route exact path='/Top' component={Top}/>

            <Route path='/:User' component={Profile}/>
          </Switch>
        </div>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;