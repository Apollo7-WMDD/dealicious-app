"use client";

import { useStore } from "../store";

function List({ userProp, campaigns = [] }) {
  const filter = useStore((state) => state.filter);
  return (
    <>
      {userProp.map((e) => (
        <div key={e._id}>
          <h2 className="text-2xl text-red-700 m-5">{e.email}</h2>
        </div>
      ))}
    </>
  );
}

export default List;
