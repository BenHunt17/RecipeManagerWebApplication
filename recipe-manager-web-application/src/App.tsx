import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import RecipeInformation from "./Pages/RecipeInformation/RecipeInformation";
import IngredientInformation from "./Pages/IngredientInformation/IngredientInformation";
import IngredientCollectionPage from "./Pages/CollectionPages/IngredientCollectionPage/IngredientCollectionPage";
import RecipeCollectionPage from "./Pages/CollectionPages/RecipeCollectionPage";
import Login from "./Pages/Login/Login";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ingredients" element={<IngredientCollectionPage />} />
          <Route path="/recipes" element={<RecipeCollectionPage />} />
          <Route path="/recipe/:recipeName" element={<RecipeInformation />} />
          <Route
            path="/ingredient/:ingredientName"
            element={<IngredientInformation />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
