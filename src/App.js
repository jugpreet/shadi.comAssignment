import { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { renderRoutes } from "./Config/routes";
import './App.css';

function App() {
  return (
    <Suspense fallback={"...loading"}>
    <BrowserRouter>
          <Switch>
            {renderRoutes.map(([key, route]) => {
              return (
                <route.type
                  key={key}
                  exact
                  render={() => <route.component />}
                  path={route.path}
                />
              );
            })}
          </Switch>
        </BrowserRouter>
        </Suspense>
  );
}

export default App;