import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { authProvider, loginRequest } from "./authConfig";

function App() {
  authProvider
    .acquireTokenSilent(loginRequest)
    .then((response) => console.log(response.accessToken));

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
