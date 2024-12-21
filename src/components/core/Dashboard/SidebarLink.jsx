// import { VscAccount, VscDashboard, VscHistory, VscVm } from "react-icons/vsc";
// import { VscSettingsGear } from "react-icons/vsc";
import * as Icons from 'react-icons/vsc';
import React from 'react'
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import { VscSettingsGear } from "react-icons/vsc";
function SidebarLink({link,iconName}) {

        const location = useLocation();
        const dispatch = useDispatch();
        const Icon = Icons[iconName];
        console.log(iconName)
        const matchRouteLink =(route)=>{
                return matchPath({path:route},location.pathname)
        };
return (
  <NavLink
  to={link.path}
  onClick={() => {}}
  className={`relative px-8 py-2 text-sm font-medium ${
    matchRouteLink(link.path)
      ? "bg-yellow-800 text-yellow-50"
      : "bg-opacity-0 text-richblack-300"
  } transition-all duration-200`}
>
  <span
    className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
      matchRouteLink(link.path) ? "opacity-100" : "opacity-0"
    }`}
  ></span>
  <div className="flex items-center gap-x-2">
    {/* Icon Goes Here */}
    {
      iconName ? <Icon className={"text-lg"}/> : <VscSettingsGear/>
    }
    <span>{link.name}</span>
  </div>
</NavLink>

  )
}

export default SidebarLink