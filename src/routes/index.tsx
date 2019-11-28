import React from 'react'
import { HashRouter, Switch } from 'react-router-dom';
import Loadable from '@loadable/component'
import login from '@/routes/login';
import AuthRoute from './auth-route'
import { routerMenu, routerNotMenu } from './config'
import App from '@/App'

{/* <AuthRoute 
    key="home" 
    exact={true} 
    path="/" 
    component={Loadable(() => import('@/views/home'))} 
  />, */}

const AppComp = () => {
  return (
    <Switch>
      {
        routerNotMenu.map(item => {
          return <AuthRoute
            key={item.key}
            exact={item.exact}
            path={item.path}
            auth={item.auth}
            component={item.component}
          />
        })
      }
      <AuthRoute
        path='/'
        render={() => (
          <App>
            <Switch>
              {
                routerMenu.map(item => {
                  return <AuthRoute
                    key={item.key}
                    exact={item.exact}
                    path={item.path}
                    auth={item.auth}
                    component={item.component}
                  />
                })
              }
            </Switch>
          </App>
        )}
      />
    </Switch>
  );
}

export default function Router() {
  return (
    <HashRouter>
      <AppComp />
    </HashRouter>
  );
}
