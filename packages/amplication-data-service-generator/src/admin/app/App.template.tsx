import React, { useCallback } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
// @ts-ignore
import Navigation from "./Navigation";
// @ts-ignore
import Login from "./Login";
// @ts-ignore
import { Credentials, setCredentials } from "./auth";

declare const ROUTES: React.ReactNode[];

function App() {
  const history = useHistory();
  const handleLogin = useCallback(
    (credentials: Credentials) => {
      setCredentials(credentials);
      history.push("/");
    },
    [history]
  );
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
        {ROUTES}
      </Switch>
    </div>
  );
}

export default App;
