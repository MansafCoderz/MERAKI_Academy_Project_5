import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Edit = () => {
  const [userInfo, setUserInfo] = useState({});
  const [newPass, setNewPass] = useState({});
  const [showPass, setShowPass] = useState(false);
  const user = useSelector((state) => {
    return state.users.users;
  });
  const userId = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  console.log(userInfo);

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:5000/users/${userId}`,

        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert(" updated successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePass = () => {
    setShowPass(false);

    if (newPass.new_pass === newPass.confirm) {
      if (newPass.oldPass) {
        axios
          .post(
            `http://localhost:5000/users/checkpass/${userId}`,
            { password: newPass.oldPass },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            if (result.data.success) {
              axios
                .put(
                  `http://localhost:5000/users/${userId}`,
                  {
                    password: newPass.new_pass,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  alert("password updated successfully");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("please insert the old password");
      }
    } else {
      alert("passwords must match");
    }
  };

  //   console.log(newPass);

  return (
    <div>
      <h3>Edit</h3>
      <img src={user[0]?.profile_image} />
      <br></br>

      <label>
        <span>User name</span>
        <input
          type="text"
          defaultValue={user[0]?.user_name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, user_name: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>First name</span>
        <input
          type="text"
          defaultValue={user[0]?.first_name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, first_name: e.target.value });
          }}
        />
      </label>
      <br></br>

      <label>
        <span>Last name</span>
        <input
          type="text"
          defaultValue={user[0]?.last_name}
          onChange={(e) => {
            setUserInfo({ ...userInfo, last_name: e.target.value });
          }}
        />
      </label>
      <br></br>

      <label>
        <span>Email</span>
        <input
          type="email"
          defaultValue={user[0]?.email}
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </label>
      <br></br>

      <label>
        <span>country</span>
        <input
          type="text"
          defaultValue={user[0]?.country}
          onChange={(e) => {
            setUserInfo({ ...userInfo, country: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>bio</span>
        <textarea
          type="text"
          defaultValue={user[0]?.bio}
          onChange={(e) => {
            setUserInfo({ ...userInfo, bio: e.target.value });
          }}
        />
      </label>
      <br></br>
      <button type="submit" onClick={handleUpdate}>
        save
      </button>

      <br></br>

      {!showPass ? (
        <a
          href="#"
          onClick={() => {
            setShowPass(true);
          }}
        >
          change password?
        </a>
      ) : (
        <form onSubmit={handleChangePass}>
          <input
            type="password"
            placeholder="enter old password"
            onChange={(e) => {
              setNewPass({ ...newPass, oldPass: e.target.value });
            }}
          />
          <br></br>

          <input
            type="password"
            placeholder="enter new password"
            onChange={(e) => {
              setNewPass({ ...newPass, new_pass: e.target.value });
            }}
          />
          <br></br>

          <input
            type="password"
            placeholder="confirm new password"
            onChange={(e) => {
              setNewPass({ ...newPass, confirm: e.target.value });
            }}
          />
          <br></br>
          <button type="submit">submit</button>
          <button
            onClick={() => {
              setShowPass(false);
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Edit;