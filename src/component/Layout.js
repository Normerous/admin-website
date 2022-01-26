import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import {
  useLocation,
  useNavigate
} from "react-router-dom";
const { Header, Content, Sider } = Layout;

const items = [
  { key: '1', label: 'Dashboard', path: '/app/dashboard', icon: <PieChartOutlined /> },
  { key: '2', label: 'Product', path: '/app/product', icon: <DesktopOutlined /> },
  { key: '3', label: 'AddProduct', path: '/app/addproduct', icon: <DesktopOutlined /> }
]

const MyLayout = props => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [current, setCurrent] = React.useState('1');
  const [breadcrumb, setBreadcrumb] = React.useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  React.useEffect(() => {
    let item = items.find(_item => pathname.startsWith(_item.path));
    if(item) {
      setCurrent(item.key);
      let pathSplit = pathname.split("/").slice(1);
      setBreadcrumb(pathSplit);
    } else navigate("/error");
  }, [pathname]);
  const onCollapse = input => setCollapsed(input);

  const clickMenu = e => {
    navigate(e);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div style={{ height: 64 }} />
        <Menu theme="dark" selectedKeys={current} defaultSelectedKeys={['1']} mode="inline">
          {items && items.map((el, i) =>
            <Menu.Item key={i + 1} icon={el.icon} onClick={() => clickMenu(el.path)}>
              {el.label}
            </Menu.Item>)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: "end" }} >
          <span onClick={handleLogout} style={{ marginRight: 16, color: "white", cursor: "pointer" }}>Logout</span>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumb && breadcrumb.map((el, i) =>
              <Breadcrumb.Item key={"Breadcrumb" + i}>{el[0].toUpperCase() + el.substring(1)}</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MyLayout;