import React from 'react';
import {getCurrentApps} from '../services/ListApps';
import Listing from './Listing';

function Body(){
    return(
        <div className="container">
            <ul>
                {getCurrentApps().map(app => <Listing app={app}/>)}
            </ul>
        </div>
    )
}

export default Body