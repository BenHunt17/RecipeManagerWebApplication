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

const Title = styled.h1`
  margin-left: 100px;
`;

const NavigationBar = styled.div`
  display: flex;
  gap: 100px;
  margin-right: 150px;
`;

export default function Header() {
  return (
    <HeaderRoot>
      <Title>Recipes Manager</Title>
      <NavigationBar>
        <Link to="/" className="headerLink">
          Dashboard
        </Link>
        <Link to="/recipes" className="headerLink">
          Recipes
        </Link>
        <Link to="/ingredients" className="headerLink">
          Ingredients
        </Link>
        <Link to="/meal-plans" className="headerLink">
          Meal Plans
        </Link>
      </NavigationBar>
    </HeaderRoot>
  );
}
