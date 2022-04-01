import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import RecipeInformation from "./Pages/RecipeInformation/RecipeInformation";
import IngredientInformation from "./Pages/IngredientInformation/IngredientInformation";
import IngredientCollectionPage from "./Pages/CollectionPages/IngredientCollectionPage";
import RecipeCollectionPage from "./Pages/CollectionPages/RecipeCollectionPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ingredients" element={<IngredientCollectionPage />} />
        <Route path="/recipes" element={<RecipeCollectionPage />} />
        <Route path="/recipe/:id" element={<RecipeInformation />} />
        <Route path="/ingredient/:id" element={<IngredientInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
