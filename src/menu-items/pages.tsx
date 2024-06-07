// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
  DollarOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  ProfileOutlined,
  TableOutlined,
  UserOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  PlusOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  HomeOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  DollarOutlined,
  LoginOutlined,
  PhoneOutlined,
  RocketOutlined,
  ProfileOutlined,
  TableOutlined,
  UserOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  PlusOutlined,
  CustomerServiceOutlined,
  ShopOutlined,
  HomeOutlined,
  BookOutlined,
  ClockCircleOutlined,
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id='pages' />,
  type: 'group',
  children: [
    {
      id: 'emp-list',
      title: (
        <span style={{ fontWeight: 'bold' }}>
          <FormattedMessage id='VNF Instance' />
        </span>
      ),
      type: 'item',
      url: '/vnf/list',
      icon: icons.HomeOutlined,
      breadcrumbs: false,
    },

    {
      id: 'vnfd',
      title: (
        <span style={{ fontWeight: 'bold' }}>
          <FormattedMessage id='VNFD' />
        </span>
      ),
      type: 'item',
      url: '/vnfd/list',
      icon: icons.BookOutlined,
      breadcrumbs: false,
    },

    // {
    //   id: "lcm-opocc",
    //   title: (
    //     <span style={{ fontWeight: "bold" }}>
    //       <FormattedMessage id="LCM OPOCC" />
    //     </span>
    //   ),
    //   type: "item",
    //   url: "/lcm-opocc",
    //   icon: icons.UserOutlined,
    // },

    {
      id: 'performance',
      title: (
        <span style={{ fontWeight: 'bold' }}>
          <FormattedMessage id='PERFORMANCE' />
        </span>
      ),
      type: 'item',
      url: 'http://127.0.0.1:55254',
      icon: icons.UserOutlined,
      breadcrumbs: false,
      target: true,
    },
    {
      id: 'alert',
      title: (
        <span style={{ fontWeight: 'bold' }}>
          <FormattedMessage id='ALERT' />
        </span>
      ),
      type: 'item',
      url: 'http://127.0.0.1:55302',
      icon: icons.ClockCircleOutlined,
      breadcrumbs: false,
      target: true,
    },
  ],
};

export default pages;
