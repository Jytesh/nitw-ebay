import Link from "next/link";
import {
  Auth,
  auth,
  emailVerification,
  signUp,
  useAuth,
} from "@/utils/authentication";

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Container,
  Group,
  Button,
} from "@mantine/core";

export default function SignUp() {
  const router = useAuth(Auth.SIGNED_OUT);
  function handleSubmit(e) {
    console.log("Click");
    e.preventDefault();
    const email = document.querySelector("input[type=email]").value;
    const password = document.querySelector("input[type=password]").value;
    if (email.split("@")[1] != "student.nitw.ac.in") {
      alert("Only student email is allowed!");
    }
    (async () => {
      const user = await signUp(email, password).catch((e) => {
        const errorCode = e.code;
        if (errorCode == "auth/email-already-in-use") {
          alert("This email is already in use, try signing in instead!");
        } else if (errorCode == "auth/invalid-email") {
          alert("This email is invalid!");
        } else if (errorCode == "auth/weak-password") {
          alert("Your password is too weak! Try a stronger password!");
        } else {
          alert("Some error occurred, contact the developers");
        }
        signOut(auth);
      });

      if (user && !user.user.emailVerified) {
        emailVerification();
        router.push("/verifyEmail");
      }
    })();
  }
  return (
    <Container size={420} my={40}>
      <Title align="center" sx={(theme) => ({ fontWeight: 900 })}>
        NITW Hostel
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title align="center">Sign Up</Title>

        <form id="signUp" onSubmit={handleSubmit}>
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
            Sign Up
          </Button>
          <Group position="apart" mt="lg">
            <Anchor component={Link} size="sm" href="/forgotPassword">
              Forgot Password?
            </Anchor>
            <Anchor component={Link} size="sm" href="/signIn">
              Already have an account?
            </Anchor>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
