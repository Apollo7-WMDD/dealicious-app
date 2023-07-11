"use client";

import { useStore } from "../../lib/context/store";

function List({ userProp }) {
  return (
    <>
      {userProp.map((e) => (
        <div key={e._id}>
          <h2 className="text-2xl text-red-700 m-5">{e.name}</h2>
          <h2 className="text-2xl text-red-700 m-5">{e.email}</h2>
        </div>
      ))}
    </>
  );
}

export default List;
