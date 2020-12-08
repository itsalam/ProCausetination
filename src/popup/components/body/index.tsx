import React from 'react';
import { Box } from '@material-ui/core';
import Home from './tabs/home';
import './Body.scss';

function TabPanel(props: {value: number, index: number, children: React.ReactNode, className: string}) {
    const { children, value, index, className } = props;
  
    return (
      <div
        role="tabpanel"
        key={`simple-tabpanel-${index}`}
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className = {className}
      >
        {value === index && (
          children
        )}
      </div>
    );
}
  

function Body(props: {value: number}){

    let tabs = [<Home/>, "Item Two", "Item Three"]
    
    return(
        <div className="body-container">
            {tabs.map((tab, index) => {return <TabPanel key={`panel-key-${index}`} value={props.value} className={"body-tab"} index={index}> {tab} </TabPanel>})}
        </div>
    )
}

export default Body;