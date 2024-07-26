import { Col, Menu, Row } from "antd";
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Avatar from "../shared/Avatar/Avatar";
import { avatarImgs } from "../../../../contains/fakeData";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const items = [
    {
      link: '/account',
      label: <div>Thông tin cá nhân</div>,
      icon: <AppstoreOutlined />,
    },
    {
      link: '/account-my-order',
      label: <div>Đơn hàng</div>,
      icon: <SettingOutlined />,
    },
  ].map(item => ({
    key: item.link,
    label: <Link to={item.link}>{item.label}</Link>,
    icon: item.icon
  }));

  const user = localStorage.getItem('user');

  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location.pathname]);

  const handleClick = e => {
    setCurrent(location.pathname);
  };

  return (
    <div className="nc-CommonLayoutProps container mt-14 mb-14 sm:mt-20">
      <Row gutter={[32, 24]}>
        <Col span={5}>
          <div className="shadow-lg p-3">
            <div className="flex items-center space-x-3 mb-2">
              <Avatar imgUrl={JSON.parse(String(user)).image || avatarImgs[10]} sizeClass="w-12 h-12" />
              <div className="flex-grow truncate break-all">
                <h4 className="font-semibold">{JSON.parse(String(user)).username}</h4>
                <p className="text-xs mt-0.5 ">{JSON.parse(String(user)).email}</p>
              </div>
            </div>
            <Menu
              onClick={handleClick}
              selectedKeys={[current]}
              defaultSelectedKeys={['/account']}
              mode="inline"
              items={items}
              className="border-none"
              style={{ borderInlineEnd: 0 }}
            />
          </div>
        </Col>
        <Col span={19}>
          <div className="shadow-lg">
            <div className="">
              <div className="max-w-4xl mx-auto">
                <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
                  {[
                    {
                      name: "Account info",
                      link: "/account",
                    },
                    {
                      name: " My order",
                      link: "/account-my-order",
                    },
                    {
                      name: "Change password",
                      link: "/account-change-password",
                    },
                  ].map((item, index) => (
                    <NavLink
                      key={index}
                      to={item.link}
                      className={({ isActive }) =>
                        `block py-5 md:py-8 border-b-2 border-transparent flex-shrink-0  text-sm sm:text-base ${
                          isActive
                            ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                            : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <hr className="border-slate-200 dark:border-slate-700"></hr>
              </div>
            </div>
            <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
              {children}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CommonLayout;