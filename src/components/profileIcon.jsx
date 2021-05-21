import React from "react";
import { useHistory } from "react-router";
const ProfileIcon = ({ profile }) => {
  const history = useHistory();
  return (
    <>
      <div
        onClick={() => history.push(`/profile/${profile._id}`)}
        className="d-flex align-items-center  profile-icon"
      >
        <div
          className="username"
          style={{
            color: "white",
            backgroundColor: "#4B778D",
            cursor: "pointer",
            borderRadius: "30px",
            display: "flex",
            alignItems: "center",
            marginRight: "-20px",

            padding: "6px",
          }}
        >
          <h6 className="mb-0 pr-3">{profile.firstname}</h6>
        </div>
        <img
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50% 0 0 50%",
            cursor: "pointer",
          }}
          src={
            profile.imageUrl.trim().length !== 0
              ? profile.imageUrl
              : "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          }
          alt="avatar"
        />
      </div>
    </>
  );
};

export default ProfileIcon;
