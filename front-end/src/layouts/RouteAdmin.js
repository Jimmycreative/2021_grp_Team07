import React from 'react';
import { Route } from "react-router-dom";



function RouteAdmin({prop}) {
    return (
        <>
        {prop.subNav.map((item, index) => {
            return (
                <Route
                    path={item.layout + prop.path + item.path}
                    component={item.component}
                    key={index}
                    />
                )
            })}
        </>
    );
};

export default RouteAdmin;