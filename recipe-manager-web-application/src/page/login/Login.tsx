import styled from "@emotion/styled";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitButton } from "../../component/styled/buttons";
import { LoadingSpinner } from "../../component/styled/output";
import { FlexContainer } from "../../component/styled/layouts";
import TextInput from "../../component/form/TextInput";
import { useAuth } from "../../hook/contextHooks";
import { UserCredentials } from "../../type/userTypes";

const LoginPageTemplate = styled.div`
  display: flex;
  height: calc(100vh - 200px); //Full screen height minus header and margin
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.b`
  font-size: 16px;
  color: var(--colour-error);
  margin: 0px;
  margin-top: 1px;
`;

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { control, handleSubmit } = useForm<UserCredentials>({
    defaultValues: { username: "", password: "" },
  });

  const from = (location.state as { from: Location })?.from?.pathname || "";

  useEffect(() => {
    if (!auth?.bearerToken) {
      return;
    }
    navigate(from);
  }, [auth?.bearerToken, from, navigate]);

  const onSubmit = (formValues: UserCredentials) => {
    auth?.login(formValues);
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
          <ErrorMessage>
            {auth?.authenticationDenied ? "Incorrect Credentials" : ""}
          </ErrorMessage>
          {auth?.authenticationPending ? (
            <LoadingSpinner />
          ) : (
            <SubmitButton type="submit">Login</SubmitButton>
          )}
        </FlexContainer>
      </form>
    </LoginPageTemplate>
  );
}
