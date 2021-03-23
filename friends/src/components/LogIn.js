import React, { useState } from "react";
import axios from "axios";

const initialFormData = {
  username: "",
  password: "",
};

const LogIn = (props) => {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:5000/api/login", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        setIsLoading(false);
        props.history.push("/friendslist");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='username'
          />
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='password'
          />
          <button>Log In</button>
        </form>
      )}
    </>
  );
};

export default LogIn;
