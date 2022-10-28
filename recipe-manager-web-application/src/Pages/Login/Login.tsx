import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/AuthProvider";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import TextInput from "../../Components/form/TextInput";
import { UserCredentials } from "../../types/userTypes";

const LoginPageTemplate = styled.div`
  display: flex;
  height: calc(100vh - 200px); //Full screen height minus header and margin
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit, formState } = useForm<UserCredentials>({
    defaultValues: { username: "", password: "" },
  });

  const from = (location.state as { from: Location })?.from?.pathname || "";

  const onSubmit = (formValues: UserCredentials) => {
    auth?.login(formValues).then(() => navigate(from));
  };

  return (
    <LoginPageTemplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexContainer
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          gap={25}
          width={450}
        >
          <h2>Login</h2>
          <TextInput
            name="username"
            control={control}
            rules={{
              required: "Required Field",
            }}
          />
          <TextInput
            name="password"
            control={control}
            rules={{
              required: "Required Field",
            }}
            inputProps={{
              type: "password",
            }}
          />
          {auth?.authenticationDenied && (
            <ErrorMessage large>Incorrect Credentials</ErrorMessage>
          )}
          <SubmitButton type="submit">Login</SubmitButton>
        </FlexContainer>
      </form>
    </LoginPageTemplate>
  );
}
