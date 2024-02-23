import { Result } from 'antd';
import React from 'react';

export default function NotFoundPage(): JSX.Element {
  return <Result status="404" title="404-APP1" subTitle="抱歉，您访问的资源不存在" />;
}
