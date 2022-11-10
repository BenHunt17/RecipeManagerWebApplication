import Header from "./components/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import RecipeInformation from "./pages/recipeInformation/RecipeInformation";
import IngredientInformation from "./pages/ingredientInformation/IngredientInformation";
import IngredientCollectionPage from "./pages/collectionPages/IngredientCollectionPage";
import RecipeCollectionPage from "./pages/collectionPages/RecipeCollectionPage";
import Login from "./pages/login/Login";
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
