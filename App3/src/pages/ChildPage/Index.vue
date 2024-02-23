<template>
    <div>
        子菜单
        <a-row :gutter="[16, 16]">
            <a-col :span="6">
                <Input :width="200" />
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="tsx">
import { Input } from 'ant-design-vue'
</script>

<style>

</style>