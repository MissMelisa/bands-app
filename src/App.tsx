import { ReactQueryDevtools } from "react-query/devtools";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import { Home, LogIn, BandDetails, Register } from "./pages";
import { AuthUserProvider } from "./components";
import "./App.css";

export const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthUserProvider>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
              <Route path="/login" exact>
                <LogIn />
              </Route>
              <Route path="/bands/:id" exact>
                <BandDetails />
              </Route>
            </Switch>
          </AuthUserProvider>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
