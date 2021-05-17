import React, { useState } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { updateProfile } from "../actions/profile.action";
import { Link } from "react-router-dom";

const notifyError = (errMsg) => toast.error(errMsg);

const EditProfile = ({ profile, errMsg, isLoading, ...props }) => {
  const id = props.match.params.id;

  const [email, setEmail] = useState(profile?.email);
  const [firstname, setFirstname] = useState(profile?.firstname);
  const [lastname, setLastname] = useState(profile?.lastname);
  const [isChangePass, seIsChangePass] = useState(false);
  // submitting the current password is required
  const [password, setPassword] = useState("");
  // for changing passwords

  const [newpass, setNewPass] = useState("");
  const [confirmpass, setConfirmPass] = useState("");

  const clearPasswords = () => {
    setPassword("");
    setNewPass("");
    setConfirmPass("");
  };

  const setInput = (setter) => (event) => setter(event.currentTarget.value);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!password.trim().length) {
      notifyError("Password is required to submit the changes!!");
      clearPasswords();
      return;
    }
    if (isChangePass) {
      if (newpass !== confirmpass) {
        notifyError("confirm password doesn't match the new password");
        clearPasswords();
        return;
      }
      props.updateProfile(
        {
          email,
          firstname,
          lastname,
          password,
          newPassword: newpass,
        },
        isChangePass
      );
    } else {
      props.updateProfile(
        {
          email,
          firstname,
          lastname,
          password,
        },
        isChangePass
      );
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: "2rem",
        }}
        className="widget w-75 newslettre-form  mx-auto text-center edit-form"
      >
        <div>
          <h4>Edit profile info</h4>
        </div>
        <div className="errors-messages">
          <span className="text-danger">{errMsg}</span>
        </div>
        <div className="edit-profile-form m-auto row">
          <div className="col-12 row">
            <label className="col-md text-left" htmlFor="edit-email">
              Email
            </label>
            <input
              className="col-md-8"
              id="edit-email"
              value={email}
              onInput={setInput(setEmail)}
            />
          </div>
          <div className="col-12 row">
            <label className="col-md text-left" htmlFor="edit-firstname">
              First Name
            </label>

            <input
              className="col-md-8"
              id="edit-firstname"
              value={firstname}
              onInput={setInput(setFirstname)}
            />
          </div>
          <div className="col-12 row">
            <label className="col-md text-left" htmlFor="edit-lastname">
              Last Name
            </label>

            <input
              className="col-md-8"
              id="edit-lastname"
              value={lastname}
              onInput={setInput(setLastname)}
            />
          </div>
          <div className="col-12 row">
            <label className="col-md text-left" htmlFor="edit-current-pass">
              Current Password
            </label>

            <input
              className="col-md-8"
              id="edit-current-pass"
              value={password}
              type="password"
              placeholder="Current Password.."
              onInput={setInput(setPassword)}
            />
          </div>

          <div className="col-12 d-flex align-items-center">
            <label className="my-0 mr-2" htmlFor="changepassword">
              Change password?{" "}
            </label>
            <input
              type="checkbox"
              id="changepassword"
              checked={isChangePass}
              onChange={() => seIsChangePass(!isChangePass)}
            />
          </div>

          <hr />
          {isChangePass && (
            <>
              <div className="col-12 row text-left">
                <label className="col-md-4" htmlFor="newpass">
                  New Password:{" "}
                </label>
                <input
                  className="col-md-8"
                  type="password"
                  id="newpass"
                  placeholder="New Password.."
                  value={newpass}
                  onInput={setInput(setNewPass)}
                />
              </div>
              <div className="col-12 row text-left">
                <label className="col-md-4" htmlFor="confirmpass">
                  Confirm Password:{" "}
                </label>
                <input
                  className="col-md-8"
                  type="password"
                  id="confirmpass"
                  placeholder="Confirm Password.."
                  value={confirmpass}
                  onInput={setInput(setConfirmPass)}
                />
              </div>
            </>
          )}
          <div className="col- m-auto  edit-control my-2">
            <button
              disabled={isLoading}
              className="btn btn-outline-success rounded-pill col-6"
              onClick={handleSubmitEdit}
            >
              Save
            </button>
            <Link
              className="btn btn-outline-secondary rounded-pill col-6"
              to={`/profile/${id}`}
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const mapStateToProps = (state) => {
  const { profile, errMsg, isLoading } = state.profile;
  return {
    profile,
    errMsg,
    isLoading,
  };
};

export default connect(mapStateToProps, { updateProfile })(EditProfile);
