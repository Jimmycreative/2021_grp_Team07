import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";


function SubMenu({prop, key, props}) {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  return (
    <>
      <Nav>
        <li
          className={
            activeRoute(prop.path)
          }
          key={key}
          >
            {/* both planner and manager can see */}
          {(prop.plannerSee && prop.managerSee)?prop.toView?
            <NavLink
              to={prop.subNav?new URL(window.location.href)?.pathname:prop.layout + prop.path}
              className="nav-link"
              activeClassName="active"
              onClick={prop.subNav && showSubnav}
              >
              <i className={prop.icon} />
              <p>{prop.name}
                {prop.subNav && subnav? prop.iconOpened: prop.subNav? prop.iconClosed: null}
              </p>
            </NavLink>:
            <div></div>:<div></div>}
          
          {/* only planner can see */}
          {(prop.plannerSee && !prop.managerSee)?(!prop.isManager && prop.toView)?
            <NavLink
              to={prop.subNav?new URL(window.location.href)?.pathname:prop.layout + prop.path}
              className="nav-link"
              activeClassName="active"
              onClick={prop.subNav && showSubnav}
              >
              <i className={prop.icon} />
              <p>{prop.name}
                {prop.subNav && subnav? prop.iconOpened: prop.subNav? prop.iconClosed: null}
              </p>
            </NavLink>:
            <div></div>:<div></div>}

          {/* only manager can see */}
          {(!prop.plannerSee && prop.managerSee)?(prop.isManager && prop.toView)?
            <NavLink
              to={prop.subNav?new URL(window.location.href)?.pathname:prop.layout + prop.path}
              className="nav-link"
              activeClassName="active"
              onClick={prop.subNav && showSubnav}
              >
              <i className={prop.icon} />
              <p>{prop.name}
                {prop.subNav && subnav? prop.iconOpened: prop.subNav? prop.iconClosed: null}
              </p>
            </NavLink>:
            <div></div>:<div></div>}

        </li>
        
        {/* submenu */}
        {subnav && prop.subNav.map((item, index) => {
          if (item.plannerSee && item.managerSee) {
            if (item.toView) {
              return (
                <li
                className="sub-menu"
                  // className={
                  //   activeRoute(prop.path + item.path)
                  // }
                  key={index}
                  >
                  <NavLink
                    to={item.layout + prop.path + item.path}
                    className="nav-link"
                    activeClassName="active"
                    >
                    <i className={item.icon} />
                    <p>{item.name}</p>
                  </NavLink>
                </li>
                );
            }
          }

          else if (item.plannerSee && !item.managerSee) {
            if (!item.isManager && item.toView) {
              return (
                <li
                className="sub-menu"
                  // className={
                  //   activeRoute(prop.path + item.path)
                  // }
                  key={index}
                  >
                  <NavLink
                    to={item.layout + prop.path + item.path}
                    className="nav-link"
                    activeClassName="active"
                    >
                    <i className={item.icon} />
                    <p>{item.name}</p>
                  </NavLink>
                </li>
                );
            }
          }

          else if (!item.plannerSee && item.managerSee) {
            if (item.isManager && item.toView) {
              return (
                <li
                className="sub-menu"
                  // className={
                  //   activeRoute(prop.path + item.path)
                  // }
                  key={index}
                  >
                  <NavLink
                    to={item.layout + prop.path + item.path}
                    className="nav-link"
                    activeClassName="active"
                    >
                    <i className={item.icon} />
                    <p>{item.name}</p>
                  </NavLink>
                </li>
                );
            }
          }
          // return (
          //   <li
          //   className="sub-menu"
          //     // className={
          //     //   activeRoute(prop.path + item.path)
          //     // }
          //     key={index}
          //     >
          //     <NavLink
          //       to={item.layout + prop.path + item.path}
          //       className="nav-link"
          //       activeClassName="active"
          //       >
          //       <i className={item.icon} />
          //       <p>{item.name}</p>
          //     </NavLink>
          //   </li>
          //   );
          })}
                 
      </Nav>
    </>
  );
};

export default SubMenu;