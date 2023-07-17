"use client";

import LoginComponent from "@/app/components/Login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    padding: "1rem",
    height: "fit-content",
  },
  label: {
    margin: "0.5rem",
  },
  input: {
    margin: "0.5rem",
    alignSelf: "flex-start",
  },
  button: {
    margin: "0.5rem",
    padding: "0.5rem",
    width: "fit-content",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "lightblue",
  },
};

const Login = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const urlParams = params.login;

  useEffect(() => {
    if (session) {
      if (urlParams.includes("owner")) {
        router.push("/");
      } else {
        router.push(`/home/superCustomer`);
      }
    }
  }, [session]);

  // ADD USER TO THE DATABASE
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // signIn("credentials", formData);
  };

  return (
    <>
      {status === "authenticated" ? (
        <div>Authenticated!</div>
      ) : (
        <>
          <LoginComponent></LoginComponent>
        </>
      )}
    </>
  );
};

export default Login;
