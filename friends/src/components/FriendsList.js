import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFormData = {
  name: "",
  age: "",
  email: "",
};

const FriendsList = (props) => {
  const [friendsList, setFriendsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then((res) => {
        setIsLoading(false);
        setFriendsList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", {
        ...formData,
        id: friendsList.length + 1,
      })
      .then((res) => {
        setFriendsList(res.data);
        setFormData(initialFormData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Friends List:</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {friendsList.map((friend) => {
                return (
                  <tr key={friend.id}>
                    <td>{friend.name}</td>
                    <td>{friend.age}</td>
                    <td>{friend.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2>Add New Friend</h2>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
            />
            <input
              type='text'
              name='age'
              value={formData.age}
              onChange={handleChange}
              placeholder='Age'
            />
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='email'
            />
            <button>Add Friend</button>
          </form>
        </>
      )}
    </>
  );
};

export default FriendsList;
