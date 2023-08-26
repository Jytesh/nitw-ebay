import Link from "next/link";
import { Auth, signIn, useAuth } from "@/utils/authentication";
import { IconArrowLeft } from "@tabler/icons-react";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
  Box,
  rem,
} from "@mantine/core";

export default function SignIn() {
  const router = useAuth(Auth.SIGNED_OUT);
  function handleSubmit(e) {
    e.preventDefault();
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;
    if (email.split("@")[1] != "student.nitw.ac.in") {
      return alert("Only student email is allowed!");
    }
    (async () => {
      const user = await signIn(email, password).catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/wrong-password") {
          alert("Wrong password!");
        } else if (errorCode == "auth/user-not-found") {
          alert("No user found with this email!");
        } else if (errorCode == "auth/invalid-email") {
          alert("This email is invalid!");
        } else {
          alert("Some error occurred, contact the developers");
        }
      });
      if (user && !user.user.emailVerified) {
        router.push("/verifyEmail");
      } else if (user) {
        router.push("/");
      }
    })();
  }
  return (
    <Container size={420} my={40}>
      <Title align="center" sx={(theme) => ({ fontWeight: 900 })}>
        NITW Hostel
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title align="center">Sign In</Title>

        <form onSubmit={handleSubmit}>
          <TextInput
            type="email"
            label="Email"
            placeholder="you@student.nitw.ac.in"
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
          <Group position="apart" mt="lg">
            <Anchor component={Link} size="sm" href="/forgotPassword">
              Forgot Password?
            </Anchor>
            <Anchor component={Link} size="sm" href="/signUp">
              Dont have an account?
            </Anchor>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
