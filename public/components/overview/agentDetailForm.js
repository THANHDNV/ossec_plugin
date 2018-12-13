import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiButton
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

    fetch('../api/ossec-plugin/api-path').then(response => {
      return response.json();
    }).then(resp => {
      const apiPath = resp.apiPath.trim();
      const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents/' + agentId;
      fetch(url).then((resp) => {
        return resp.json();
      }).then((resp) => {
        switch(resp.error) {
          case 0:
            this.setState({
              agentInfo: resp.data
            });
            break;
          case 1701:
            this.props.onNotFound('Agent not found');
          default:
            break;
        }
      }).catch((reason) => {
        console.log("No reponse");
        console.log(reason);
      });
    }).catch((reason) => {
      console.log("No reponse");
      console.log(reason);
    });

  }

  render() {
    const {
      agentInfo
    } = this.state;

    let body;

    if (agentInfo === null) {
      body = (
        <React.Fragment>
          <EuiFlexItem>No Info to display</EuiFlexItem>
        </React.Fragment>
      );
    } else {
      let date;

      if (agentInfo.lastKeepAlive.toLowerCase() === 'none') {
        date = agentInfo.lastKeepAlive;
      } else {
        date = new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }).format(new Date(agentInfo.lastKeepAlive));
      }
      
      let osComponent;
      if (agentInfo.os) {
        osComponent = (<EuiFlexItem><strong>Operating system:</strong> {agentInfo.os.name}</EuiFlexItem>);
      }

      body = (
        <React.Fragment>
          <EuiFlexGrid columns={2}>
            <EuiFlexItem><strong>Agent ID:</strong> {agentInfo.id}</EuiFlexItem>
            <EuiFlexItem><strong>Agent Name:</strong> {agentInfo.name}</EuiFlexItem>
            <EuiFlexItem><strong>Agent IP:</strong> {agentInfo.ip}</EuiFlexItem>
            <EuiFlexItem><strong>Agent Status:</strong> {agentInfo.status}</EuiFlexItem>
            <EuiFlexItem><strong>Last alive time:</strong> {date}</EuiFlexItem>
            {osComponent}
          </EuiFlexGrid>
          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <EuiButton iconType="trash" color="danger" onClick={() => { this.props.onDelete({ id: agentInfo.id}); }}>
                Delete this agent
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton iconType='console' color='secondary' onClick={() => {
                this.props.onRestart({ id: agentInfo.id });
              }}>
                Restart this agent
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGrid>
        </React.Fragment>
      );
    }

    return(
      <React.Fragment>
        {body}
      </React.Fragment>
    );
  }
}