import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "./pages/Home";
import AlbumsDetailPage from "./pages/AlbumsDetailPage";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/bands/:id" exact>
              <AlbumsDetailPage />
            </Route>
          </Switch>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
