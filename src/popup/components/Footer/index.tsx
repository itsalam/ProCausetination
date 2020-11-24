import React from 'react';
import logo from 'icons/logo.svg';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Tab from '@material-ui/core/Tab/Tab';
import Tabs from '@material-ui/core/Tabs/Tabs';
import { Paper } from '@material-ui/core';
import "./Footer.scss";

function Footer(props: { value: any, handleChange: (event: React.ChangeEvent<{}>, value: any) => void}) {

    var [tabs, setTabs] = React.useState();

    const tabIds: {name: string, icon: JSX.Element}[] = [
        {name: "Main", icon: <i className="las la-home"/>}, 
        {name: "Cash", icon: <i className="las la-hand-holding-heart"/>},
        {name: "Settings", icon: <i className="las la-cog"/>}
    ];

    return (
        <Paper square>
            <Tabs value={props.value} onChange={props.handleChange} aria-label="simple tabs example">
                {tabIds.map((value, index) => {
                    return <Tab 
                        className={'tab'} 
                        key={`tab-${index}`} 
                        id={`tab-${index}`} 
                        aria-controls={`tabpanel-${index}`}
                        icon={value.icon}
                    />
                })}
            </Tabs>
        </Paper>
    );
}

export default Footer;
