import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import login from './components/login'
import home from './components/home'

const App = () => (
  <Switch>
    <Route exact path="/login" component={login} />
    <Route exact path="/" component={home} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
