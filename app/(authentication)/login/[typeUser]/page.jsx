"use client";

import LoginComponent from "@/app/components/Login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = ({ params }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const urlParams = params.typeUser;

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
