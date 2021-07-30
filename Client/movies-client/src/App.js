import './App.css';
import Login from './components/Login/Login';
import useToken from './components/Login/useToken';
import RootContainer from './components/RootContainer/RootContainer';
//  import {useEffect} from 'react'

function App() {
  const { token, setToken } = useToken();

  // useEffect(() => {
  //   const tokenString = localStorage.getItem('token');
  //   const userToken = JSON.parse(tokenString);
  //   if(userToken){setToken(userToken)}
  //   }, [])

  if (!token) {
    console.log('token is null: ', token);
    return <Login setToken={setToken} />;
  }
  console.log('token exists', token);
  return (
    <div className="App">
      <RootContainer />
    </div>
  );
}

export default App;
