import React from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Badge, Space } from "antd";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user);

  const location = useLocation();

  const superUserMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Business Partners",
      path: "/business-partners",
      icon: "ri-service-line",
    },
    {
      name: "Tenant Management",
      path: "/property-management/tenant-management",
      icon: "ri-account-pin-box-line",
    },
    {
      name: "Properties",
      path: "/property-management/portfolio/",
      icon: "ri-building-2-line",
    },
    {
      name: "Leasing",
      path: "/property-management/leasing/",
      icon: "ri-building-2-line",
    },
    {
      name: "Compliance",
      path: "/compliance",
      icon: "ri-government-line",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "ri-task-line",
    },
    {
      name: "Contract Management",
      path: "/contract-management",
      icon: "ri-money-dollar-box-line",
    },
    {
      name: "Market Research",
      path: "/market-research",
      icon: "ri-bar-chart-grouped-line",
    },
    {
      name: "Accounting",
      path: "/accounting",
      icon: "ri-bank-line",
    },
    {
      name: "Team Management",
      path: "/team-management",
      icon: "ri-group-2-line",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-line",
    // },

  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Onboarding",
      path: "/admin/create-company",
      icon: "ri-folder-add-line",
    },
    {
      name: "Companies",
      path: "/admin/companies-list",
      icon: "ri-building-2-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Billing",
      path: "/admin/billing",
      icon: "ri-money-dollar-box-line",
    },
   
    // {
    //   name: "Profile",
    //   path:`/profile/${user?._id}`,
    //   icon: "ri-user-line",
    // },
  ];


  const professionalUserMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Business Partners",
      path: "/business-partners",
      icon: "ri-service-line",
    },
    {
      name: "Tenant Management",
      path: "/property-management/tenant-management",
      icon: "ri-account-pin-box-line",
    },
    {
      name: "Properties",
      path: "/property-management/portfolio/",
      icon: "ri-building-4-line",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "ri-task-line",
    },
    {
      name: "Team Management",
      path: "/team-management",
      icon: "ri-group-2-line",
    },
    {
      name: "Market Research",
      path: "/market-research",
      icon: "ri-bar-chart-grouped-line",
    },
    {
      name: "Accounting",
      path: "/accounting",
      icon: "ri-bank-line",
    },

  ];


  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.role === 'Professional User' ? professionalUserMenu : superUserMenu;
  const role = user?.isAdmin ? "System Administrator" : user?.role === 'Professional User' ? "Professional User" : "Super User";
  const companyName = user?.companyId.companyName
  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            {/* <img className="logo" src='' width='140' height='35'/> */}
            <h1 className="role">{companyName}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={index}
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-3">
              <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                <i className="ri-notification-line header-action-icon mr-2 px-3"></i>
              </Badge>
              <Link className="anchor mx-1">
              Help Desk Support
              </Link>
              <Link className="anchor mx-3 profile" to="/profile">
                {console.log(user)}
                {user?.firstName + ' ' + user?.lastName}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}
