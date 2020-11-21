import React, {Suspense} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Calculator from './Containers/Calculator/Calculator';

const Auth=React.lazy(()=>{
  return import('./Containers/Auth/Auth');
});

function App() {
  let routes=(
    <Switch>
      <Route path="/auth" render={(props)=><Auth {...props}/>} />
      <Route path="/" exact component={Calculator} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);
