import React from "react";

function UserInfo({ email, name, birthday, onDeregister }) { 
 
  const date = new Date(birthday);
  // Format the date according to the user's locale
  const formattedBirthday = date.toLocaleDateString();

  return (
    <>
      <h4>Profile Info</h4>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Birthday: {formattedBirthday}</p>
      <button className="favorite-button" onClick={onDeregister}>Deregister</button>
    </>
  );
}

export default UserInfo;
