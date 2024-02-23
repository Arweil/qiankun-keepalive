import React, { useEffect, useContext } from 'react';
import { MobXProviderContext, observer } from 'malganis/mobx-react';
import {
  Button,
  Dropdown,
  LayoutExt,
  MenuProps,
  Space,
  Spin,
} from '@m-tools/antd-ext';
import { useHistory, useLocation } from 'malganis/router';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { UserStore as UserStoreMbx } from '@/stores/UserStore';
import styles from './style.module.less';

const noLayout = [/\/auth\/user\/.+$/, /\/data-processing\/modeling\/members$/];

export default observer(
  (props: { children?: React.ReactNode }): JSX.Element => {
    const { children } = props;
    const { store } = useContext(MobXProviderContext);
    const history = useHistory();
    const location = useLocation();

    const { UserStore } = store as { UserStore: UserStoreMbx };

    const {
      userInfo, menu, layoutOpenKeys, layoutSelectedKeys,
    } = UserStore;

    const dropMenus: MenuProps['items'] = [
      {
        label: (
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={async () => {
              await UserStore.logout();
              history.push('/login');
            }}
          >
            退出登录
          </Button>
        ),
        key: '0',
      },
    ];

    useEffect(() => {
      try {
        UserStore.getBaseInfo().catch(() => {});
      } catch (ex) {
        console.warn(ex);
      }

      return () => {};
    }, []);

    if (!UserStore.userInfo) {
      return <Spin style={{ width: '100%', marginTop: '50vh' }} />;
    }
    return (
      <LayoutExt
        className={noLayout.some((reg) => reg.test(location.pathname)) ? styles.nolayout : ''}
        history={history}
        menu={menu || []}
        openKeys={layoutOpenKeys}
        headerExtra={(
          <Dropdown menu={{ items: dropMenus }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userInfo?.nickname}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        )}
        selectedKeys={layoutSelectedKeys}
        setOpenKeys={UserStore.setOpenKeys}
        setSelectedKeys={UserStore.setSelectedKeys}
        setTitle={({ collapsed }) => (!collapsed ? (
          <div className={styles['site-info']}>
            <div className={styles['site-name']}>Application2</div>
          </div>
        ) : (
          <div className={styles['site-info']}>
            <div className={styles['site-name']}>App2</div>
          </div>
        ))}
      >
        {children}
      </LayoutExt>
    );
  },
);
