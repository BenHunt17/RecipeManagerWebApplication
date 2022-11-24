import Header from "./component/layout/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./page/dashboard/Dashboard";
import RecipeInformation from "./page/recipeInformation/RecipeInformation";
import IngredientInformation from "./page/ingredientInformation/IngredientInformation";
import IngredientCollectionPage from "./page/collectionPages/IngredientCollectionPage";
import RecipeCollectionPage from "./page/collectionPages/RecipeCollectionPage";
import Login from "./page/login/Login";
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
