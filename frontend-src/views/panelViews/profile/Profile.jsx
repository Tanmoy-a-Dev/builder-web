import React, { useContext } from "react";
import LinkedBtn from "../../../components/buttons/LinkedBtn.jsx";
import Table from "../../../components/table/Table.jsx";
import { LoggedinUserContext } from "../../../contexts/LoggedinUserContext.js";
// import "./profile.css";

const Profile = () => {
	const { userInfo } = useContext(LoggedinUserContext);
	// console.log(userInfo);

	return (
		<>
			<div className="profile-page">
				<div className="header-section">
					<h1>{userInfo.name}'s profile page</h1>
				</div>
				<div className="intro-section">
					<div className="image-section">
						{userInfo.profileImage !== "null" ? (
							<img src={userInfo.profileImage} alt="profile image" />
						) : (
							<img
								src={require(`../../../../Images/download.png`).default}
								alt="profile image"
							/>
						)}
					</div>
					<div className="named-section">
						<h3>
							{userInfo.name} |<span> {userInfo.role}</span>
						</h3>
						<p>{userInfo.email}</p>
					</div>
				</div>

				<div className="link-section">
					<LinkedBtn
						link={`/admin-panel/users/update-profile/${userInfo.id}`}
						btnTxt="Update Profile"
						btnClass="btn-primary"
					/>
					<LinkedBtn
						link={`/admin-panel/users/update-password/${userInfo.id}`}
						btnTxt="Update Password"
						btnClass="btn-primary"
					/>
				</div>

				<div className="others-section">
					<Table
						headers={[{ Permission: "string" }]}
						tableData={userInfo.permissions}
						actionBtns={false}
					/>
				</div>
			</div>
		</>
	);
};

export default Profile;
