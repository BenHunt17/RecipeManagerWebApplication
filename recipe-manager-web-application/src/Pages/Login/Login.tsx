import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/AuthProvider";
import { SubmitButton } from "../../Components/Common/StyledComponents/ButtonComponents";
import { ErrorMessage } from "../../Components/Common/StyledComponents/ContentComponents";
import { FlexContainer } from "../../Components/Common/StyledComponents/ShortcutComponents";
import InputContainer from "../../Components/FormComponents/InputContainer";
import TextInput from "../../Components/FormComponents/TextInput";
import { UserCredentials } from "../../Types/UserTypes";

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
          <InputContainer
            title="Username*"
            input={
              <TextInput
                name="username"
                control={control}
                rules={{
                  required: "Required Field",
                }}
              />
            }
            error={
              <ErrorMessage>{formState.errors.username?.message}</ErrorMessage>
            }
          />
          <InputContainer
            title="Password*"
            input={
              <TextInput
                type="password"
                name="password"
                control={control}
                rules={{
                  required: "Required Field",
                }}
              />
            }
            error={
              <ErrorMessage>{formState.errors.password?.message}</ErrorMessage>
            }
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
