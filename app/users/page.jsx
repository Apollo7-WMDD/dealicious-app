"use client";
import { useEffect } from "react";
import { useStore } from "../store";
import  List  from "../components/List";
import InputText from '../components/InputText'

const User = () => {
  // IMPORT HOOK FROM STATE MANAGEMENT STORE
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUser(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-4xl">TESTING DEV</h1>
      {console.log(user)}
     
     <InputText filter={filter} />

      <div>
        {console.log(filter)}
        <h1>{filter}</h1>

        <List userProp={user} />
       
      </div>
    </>
  );
};

export default User;
