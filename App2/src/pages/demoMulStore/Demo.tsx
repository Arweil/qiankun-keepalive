import { MobXProviderContext, observer } from 'malganis/mobx-react';
import { RouteComponentProps } from 'malganis/router';
import React, { useContext } from 'react';
import { Button, Input } from '@m-tools/antd-ext';

function Demo(props: {
  onClick: () => void;
}): JSX.Element {
  const {
    onClick,
  } = props;

  return (
    <div>
      This is DemoMulStore Page
      <Input />
      <Button onClick={onClick}>show context</Button>
    </div>
  );
}

export default observer((props: RouteComponentProps) => {
  console.log(props);

  const context = useContext(MobXProviderContext);

  return <Demo onClick={() => console.log('MulStore', context)} />;
});
