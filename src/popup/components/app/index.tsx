
import React, { ChangeEvent, Fragment } from 'react';
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';
import './App.scss';
import { getAuthToken } from 'popup/services/accountService';
import SignIn from '../SignIn';

function App() {

  var [curTab, setCurTab] = React.useState(0);
  var [user, setUser] = React.useState();

  const onChange = (event: ChangeEvent<{}>, value: number) => {
    setCurTab(value);
  }

  React.useEffect(()=> {
    const getAuthDetails = async () => {
      console.log(await getAuthToken());
    }

    getAuthDetails();
  })

  return (
    <div className="App">
      <Header />
      {
        user? 
        <Fragment>
          <Body value={curTab} />
          <Footer value={curTab} handleChange={onChange}/>
        </Fragment>
        :
        <SignIn/>
      }
    </div>
  );
}

export default App;
