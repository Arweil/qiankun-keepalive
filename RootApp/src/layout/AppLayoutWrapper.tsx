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
import { loadMicroApp } from 'qiankun';
import { UserStore as UserStoreMbx } from '@/stores/UserStore';
import AppStoreMbx from '@/stores/AppStore';
import styles from './style.module.less';

export default observer(
  (props: { children?: React.ReactNode }): JSX.Element => {
    const { children } = props;
    const { store } = useContext(MobXProviderContext);
    const history = useHistory();
    const location = useLocation();

    const { AppStore, UserStore } = store as { UserStore: UserStoreMbx, AppStore: AppStoreMbx };

    const {
      userInfo, menu, layoutOpenKeys, layoutSelectedKeys,
    } = UserStore;

    const { appList, cachePageKeys } = AppStore;

    const activeApps: string[] = Object.entries(cachePageKeys).reduce((pre, cur) => {
      const [appName, pageKeys] = cur;
      if (pageKeys.length > 0) {
        pre.push(appName);
      }
      return pre;
    }, [] as string[]);

    console.log('AppLayoutWrapper', activeApps, cachePageKeys);

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
        history={history}
        menu={menu || []}
        openKeys={layoutOpenKeys}
        // headerContent={<div>111</div>}
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
            <div className={styles['site-name']}>RootApp</div>
          </div>
        ) : (
          <div className={styles['site-info']}>
            <div className={styles['site-name']}>RAPP</div>
          </div>
        ))}
      >
        {
          appList.map((app) => (
            <div id={`container-${app.name}`} style={!location.pathname.startsWith(`/${app.name}`) ? { display: 'none' } : {}} />))
        }
      </LayoutExt>
    );
  },
);
