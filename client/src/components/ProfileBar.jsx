function ProfileBar({ userData }) {
    return (
      <div className={"login_info"}>
        {Object.keys(userData).length === 0 ? (
          <h1>Welcome</h1>
        ) : (
          <h1>Wellcome back {userData.name}</h1>
        )}
      </div>
    );
  }
  
  export default ProfileBar;
  