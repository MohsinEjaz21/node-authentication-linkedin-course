import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from 'src/auth/useToken';
import useUser from 'src/auth/useUser';
import axios from 'src/helpers/axios';
import { PATH } from '../routes/backend/paths';

const UserInfoPage = () => {
  // We'll use the history to navigate the user
  // programmatically later on (we're not using it yet)
  const navigate = useNavigate();
  const { id, info } = useUser().user;
  const { token } = useToken();
  // These states are bound to the values of the text inputs
  // on the page (see JSX below). 
  const [favoriteFood, setFavoriteFood] = useState(info?.favoriteFood || '');
  const [hairColor, setHairColor] = useState(info?.hairColor || '');
  const [bio, setBio] = useState(info?.bio || '');

  // These state variables control whether or not we show
  // the success and error message sections after making
  // a network request (see JSX below).
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // This useEffect hook automatically hides the
  // success and error messages after 3 seconds when they're shown.
  // Just a little user interface improvement.
  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showSuccessMessage, showErrorMessage]);

  const saveChanges = async () => {
    // Send a request to the server to
    // update the user's info with any changes we've
    // made to the text input values

    console.log("PATH 🌈", PATH.user.updateUserInfo.replace(':userId', id))


    const response = await axios.post({
      data: { favoriteFood, hairColor, bio },
      url: PATH.user.updateUserInfo.replace(':userId', id),
      token: token,
      method: 'PUT'
    })
    console.log("response 🌈", response)
    alert('Save functionality done');
  }

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const resetValues = () => {
    // Reset the text input values to
    // their starting values (the data we loaded from the server)
    alert('Reset functionality not implemented yet');
  }

  // And here we have the JSX for our component. It's pretty straightforward
  return (
    <div className="content-container">
      <h1>Info for ______</h1>
      {showSuccessMessage && <div className="success">Successfully saved user data!</div>}
      {showErrorMessage && <div className="fail">Uh oh... something went wrong and we couldn't save changes</div>}
      <label>
        Favorite Food:
        <input
          onChange={e => setFavoriteFood(e.target.value)}
          value={favoriteFood} />
      </label>
      <label>
        Hair Color:
        <input
          onChange={e => setHairColor(e.target.value)}
          value={hairColor} />
      </label>
      <label>
        Bio:
        <input
          onChange={e => setBio(e.target.value)}
          value={bio} />
      </label>
      <hr />
      <button onClick={saveChanges}>Save Changes</button>
      <button onClick={resetValues}>Reset Values</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}

export default UserInfoPage;