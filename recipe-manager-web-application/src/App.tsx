import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { authProvider, loginRequest } from "./authConfig";
import RecipeInformation from "./Pages/RecipeInformation/RecipeInformation";
import IngredientInformation from "./Pages/IngredientInformation/IngredientInformation";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recipe/:id" element={<RecipeInformation />} />
        <Route path="/ingredient/:id" element={<IngredientInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
