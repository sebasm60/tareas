import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Menu from './componentes/menu';
import Inicio from './componentes/inicio';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route exact path="/" component={Inicio}/>
            <Route exact path="/inicio" component={Menu}/>
          </Switch>
        </Router>       
      </header>
    </div>
  );
}

export default App;
