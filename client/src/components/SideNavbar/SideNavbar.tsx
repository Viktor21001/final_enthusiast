import React, { useState } from 'react';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';

// const { Header, Content, Footer, Sider } = Layout;

// const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `Главная ${key}`,

//       // children: new Array(1).fill(null).map((_, j) => {
//       //   const subKey = index * 4 + j + 1;
//       //   return {
//       //     key: subKey,
//       //     label: `option${subKey}`,
//       //   };
//       // }),
//     };
//   },
// );

// const Navbar: React.FC = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();

//   return (
//     <Layout>
//       <Header style={{ display: 'flex', alignItems: 'center' }}>
//         <div className="demo-logo" />
//         <Menu
//           theme="dark"
//           mode="horizontal"
//           defaultSelectedKeys={['2']}
//           items={items1}
//           style={{ flex: 1, minWidth: 0 }}
//         />
//       </Header>
//       <Content style={{  }}>
//         {/* <Breadcrumb style={{ margin: '16px 0' }}>
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb> */}
//         <Layout
//           style={{ padding: '14% 0', background: colorBgContainer, borderRadius: borderRadiusLG }} 
//         >
//           <Sider style={{ background: colorBgContainer }} width={200}>
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={['1']}
//               defaultOpenKeys={['sub1']}
//               style={{ height: '100%' }}
//               items={items2}
//             />
//           </Sider>
//           <Content style={{ padding: '0 860px', minHeight: 280 }}>Салам</Content>
//         </Layout>
//       </Content>
//       <Footer style={{ textAlign: 'center' }}>
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };

// export default Navbar;

import {
  TeamOutlined,
  WechatFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbFilled,
  HomeFilled,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Главная', '1', <HomeFilled />),
  getItem('Люди', '2', <TeamOutlined />),
  getItem('Билборд идей', '3', <BulbFilled />),
  getItem('Чаты', '4', <WechatFilled />),

//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),

//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),

//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
];

const SideNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 12 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default SideNavbar;