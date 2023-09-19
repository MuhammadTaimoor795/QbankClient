import { Breadcrumb, Layout, theme } from 'antd';
import Dashboard from "./dashboard";
import Headers from "./Header";
import {
  PieChartOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Logout', '1', <PieChartOutlined />),
  getItem('Profile', 'sub1', <PieChartOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ])
];

const { Header, Content, Footer } = Layout;

const Home = () => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const getPofile = () =>{
 
  }




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const changePassword = () =>{
 
  }
  const Logout = () =>{
    localStorage.clear();
    window.location.reload();
  }



  return (
    <Layout>
<Headers/>

      <Content
        className="site-layout"
        style={{
          padding: '0 5px',
          
        }}
      >
        <Breadcrumb
          style={{
            margin: '26px 50px',
          }}
        >
          <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        
          <Dashboard />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          background:"#fff"
        }}
      >
        © QBank - <a href="mailto:info@ezlearningprep.com" style={{color:"rgb(6, 101, 166)", textDecoration:"underline"}}>info@ezlearningprep.com</a>
      </Footer>
    </Layout>
  );
};
export default Home;