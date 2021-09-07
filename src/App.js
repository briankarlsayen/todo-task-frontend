import './App.css';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import TodoHeader from './components/TodoHeader';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Switch>      
          <Route path="/todo/:todoheaderid/todolist" component={()=>(
              <TodoList/>
          )} />
          <Route path="/todo" component={()=>(
              <TodoHeader/>
          )} />
          <Redirect to="/todo" />
      </Switch>
    </div>
  );
}

export default withRouter(App);
