import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem
} from '@elastic/eui';

// eslint-disable-next-line react/prefer-stateless-function
export class AgentDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      agentInfo: null,
    };
  }

  componentDidMount() {
    //get info from api
    const { agentId } = this.props;
  }

  render() {
    return(
      <React.Fragment>
        <EuiFlexGrid columns={2}>
          <EuiFlexItem></EuiFlexItem>
        </EuiFlexGrid>
      </React.Fragment>
    );
  }
}