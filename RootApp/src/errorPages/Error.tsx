import React from 'react';
import { Result } from '@m-tools/antd-ext';

export default function Error(): JSX.Element {
  return <Result status="500" title="500" subTitle="抱歉，服务发生了异常" />;
}
