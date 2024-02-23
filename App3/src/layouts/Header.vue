<template>
  <a-row type="flex" justify="space-between" class="header-container">
    <a-col v-if="__POWERED_BY_QIANKUN__" class="leftLogo2"
      ><img src="../assets/img/zeus-logo-new.png"
    /></a-col>
    <a-col></a-col>
    <a-row>
      <!-- <a-col style="margin-right: 20px">
        <Spin v-if="loading.getGrantAccessOrgs" style="color: white"></Spin>
        <a-dropdown v-else>
          <a style="color: white" @click.prevent>
            <a-badge :dot="true" style="margin-right: 3px">
              <span style="color: #fff; margin-right: 5px">公告详情</span></a-badge
            ><DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-button type="text" size="small" @click="toPage('newFeature')">
                  <a-badge :dot="true"> 新功能 </a-badge>
                </a-button>
              </a-menu-item>
              <a-menu-item>
                <a-button type="text" size="small" @click="toPage('newTag')">
                  <a-badge :dot="true"> 新标签 </a-badge>
                </a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col> -->
      <a-col style="margin-right: 20px">
      </a-col>
      <a-col>
        <a-dropdown>
          <a style="color: white" @click.prevent>
            {{ userInfo.userName }}
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a-button type="text" size="small" @click="logout">
                  <template #icon>
                    <LogoutOutlined />
                  </template>
                  退出
                </a-button>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </a-row>
</template>

<script lang="ts">
import { useUserStore } from '@/stores/user';
import { defineComponent, onMounted, toRefs } from 'vue';
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { Spin } from 'ant-design-vue'
// import { Org } from '@/api/login';
import { mapStores } from 'pinia';
import router from '@/routers/RegisterRouters';

export default defineComponent({
  components: {
    DownOutlined,
    LogoutOutlined,
    // Spin,
  },
  setup() {
    const userStore = useUserStore();
    const { userInfo } = toRefs(userStore);

    onMounted(async () => {
    });
    const logout = async () => {
      let exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * -1);
      window.document.cookie = `loginInfo_auto=;path=/;expires=${exdate.toGMTString()}`;
      await userStore.logout();
    };
    const toPage = (type: string) => {
      if (type === 'newTag') {
        router.push({
          path: '/message-prompt/new-tag',
        });
      } else {
        router.push({
          path: '/message-prompt/new-feature',
        });
      }
    };
    return {
      userInfo,
      logout,
      loading: userStore.$loading,
      // userStore,
      __POWERED_BY_QIANKUN__: qiankunWindow.__POWERED_BY_QIANKUN__,
      toPage,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },
  methods: {
  },
});
</script>

<style lang="less" scoped>
.header-container {
  color: #fff;
}

.leftLogo2 {
  height: 100%;
  padding-top: 5px;
  float: left;
  margin-left: -50px;
  img {
    width: 84px;
    height: 46px;
    display: block;
    margin: 0px 0px;
    margin-left: 10px;
  }
}
</style>
