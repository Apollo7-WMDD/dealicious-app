"use client";

import { signIn, useSession } from "next-auth/react";
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

const Login = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      window.history.go(-3);
    }
  }, [session]);

  // ADD USER TO THE DATABASE
  const handleSubmit = async function (e) {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    signIn("credentials", formData);
  };

  return (
    <>
      {status === "authenticated" ? (
        <div>Authenticated!</div>
      ) : (
        <>
          <h1 className="text-3xl text-center font-bold my-4">Login</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.input} htmlFor="email">
              Email
            </label>
            <input style={styles.input} type="email" name="email" id="email" />
            <label style={styles.input} htmlFor="password">
              Password
            </label>
            <input
              style={styles.input}
              type="password"
              name="password"
              id="password"
            />
            <button style={styles.button}>Submit</button>
          </form>
          <button
            className=" mx-2 px-4 py-2 border-solid border-red-700 border-2 rounded-md bg-red-700 text-white"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        </>
      )}
    </>
  );
};

export default Login;
