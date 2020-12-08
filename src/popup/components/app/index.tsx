
import React, { ChangeEvent } from 'react';
import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import './App.scss';

function App() {

  var [curTab, setCurTab] = React.useState(0);

  const onChange = (event: ChangeEvent<{}>, value: number) => {
    setCurTab(value);
  }

  return (
    <div className="App">
      <Header />
      <Body value={curTab} />
      <Footer value={curTab} handleChange={onChange}/>
    </div>
  );
}

export default App;
