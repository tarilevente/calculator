import React, {Suspense, useEffect} from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Calculator from './Containers/Calculator/Calculator';
import Logout from './Containers/Auth/Logout/Logout';
import Results from './Containers/Results/Results';
import SelectedResult from './Containers/Results/SelectedResult/SelectedResult';

import {connect} from 'react-redux';
import * as actions from './Store/Actions';

const Auth=React.lazy(()=>{
  return import('./Containers/Auth/Auth');
});

const App=(props)=> {
  const {onTryAutoSignup}=props;
  useEffect(()=>{
    onTryAutoSignup();
  },[onTryAutoSignup]);

  let routes=(
    <Switch>
      <Route path="/auth" render={(props)=><Auth {...props}/>} />
      <Route path="/" exact component={Calculator} />
      <Redirect to="/" />
    </Switch>
  );

  if(props.isAuthenticated){
    routes=(
      <Switch>
        <Route path="/logout" exact component={Logout} />
        <Route path="/results" exact component={Results} />
        <Route path={"/result/:id"} component={SelectedResult} />
        <Route path="/" exact component={Calculator} />
        <Redirect from="/auth" to="/" />
      </Switch>
    );
  }

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

const mapStateToProps=state=>{
  return{
    isAuthenticated:state.auth.token!==null
  };
};

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
