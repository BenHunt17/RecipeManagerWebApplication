import { Link } from "react-router-dom";
import "../../index.css";
import styled from "@emotion/styled";
import { useAuth } from "../../hooks/contextHooks";

const HeaderRoot = styled.div`
  width: 100%;
  display: flex;
  height: 150px;
  justify-content: space-between;
  background-color: var(--colour-primary);
  align-items: center;
  box-shadow: 0px 1px 1px var(--colour-light-grey);
`;

const Title = styled.h1`
  margin-left: 100px;
`;

const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  margin-right: 100px;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  color: white;
  text-decoration: underline;
  border: transparent;
  cursor: pointer;
`;

export default function Header() {
  const auth = useAuth();

  return (
    <HeaderRoot>
      <Title>Recipes Manager</Title>
      {!!auth?.bearerToken && (
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
          {/* Button styling is temporary since likely to have an account menu in future */}
          <LogoutButton onClick={() => auth.logout()}>Logout</LogoutButton>{" "}
        </NavigationBar>
      )}
    </HeaderRoot>
  );
}
