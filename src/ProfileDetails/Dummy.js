import React, { useState } from "react";
import LoginPage from "../Login/Login";

const user = {
  title: "santhosh kathirvel",
  age: 22,
  company: "Markerz Global Solutions",
  experience: 5,
};

export default function Dummy() {
  const isLoggedIn = "santhosh";
  const login = isLoggedIn === "santhosh1" ? <LoginPage /> : null;

  const [highlight, setHighlight] = useState(false);

  const names = [
    { name: "balaji", id: 1 },
    { name: "vignesh", id: 2 },
    { name: "shakthivel", id: 3 },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="dummy_page">
      <h2>Hi, this is {user.title}</h2>
      <p>
        I'm around {user.age} years old. I'm currently working at {user.company}
        . I have {user.experience} years of experience in web development.
      </p>

      {login || <p style={{ color: "red" }}>Login failed: Unauthorized user</p>}

      <ul>
        {names.map((item) => (
          <li
            key={item.id}
            style={{ color: highlight ? "green" : "black", fontWeight: 500 }}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <button onClick={handleChange}>Click to change color</button>
      <button onClick={handleClick}>Click {count} to change color</button>
    </div>
  );
}
