import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/Home";
import AlbumsDetailPage from "./pages/AlbumsDetailPage";
import LogInPage from "./pages/LogInPage";
import AuthUserProvider from "./pages/authUserContext/authUserContext";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthUserProvider>
            <Switch>
              <Route path="/register" exact>
                <RegisterPage />
              </Route>
              <Route path="/login" exact>
                <LogInPage />
              </Route>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/bands/:id" exact>
                <AlbumsDetailPage />
              </Route>
            </Switch>
          </AuthUserProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
