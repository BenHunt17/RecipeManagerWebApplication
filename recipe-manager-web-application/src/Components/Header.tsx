import { Link } from "react-router-dom";
import "../index.css";
import styled from "@emotion/styled";

const HeaderRoot = styled.div`
  display: flex;
  height: 150px;
  justify-content: space-between;
  background-color: var(--colour-primary);
  align-items: center;
  box-shadow: 0px 1px 1px var(--colour-shadow);
`;

const NavigationBar = styled.div`
  display: flex;
  gap: 100px;
  margin-right: 150px;
`;

export default function Header() {
  return (
    <HeaderRoot>
      <h1>Recipes Manager</h1>
      <NavigationBar>
        <Link to="/" className="link">
          Dashboard
        </Link>
        <Link to="/recipes" className="link">
          Recipes
        </Link>
        <Link to="/ingredients" className="link">
          Ingredients
        </Link>
        <Link to="/meal-plans" className="link">
          Meal Plans
        </Link>
      </NavigationBar>
    </HeaderRoot>
  );
}
