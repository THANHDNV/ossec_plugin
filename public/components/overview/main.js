import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiBasicTable,
  EuiHealth
} from '@elastic/eui';

import {
  AgentTable
} from './agentTable';

// eslint-disable-next-line react/prefer-stateless-function
export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <EuiFlexGroup>
        <EuiFlexItem>
          <AgentTable />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}