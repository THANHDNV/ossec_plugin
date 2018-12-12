import React from 'react';

import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
  EuiButton
} from '@elastic/eui';

// eslint-disable-next-line react/prefer-stateless-function
export class AgentCreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNameError: false,
      showIpError: false,
      nameError: '',
      ipError: '',
      agentName: '',
      agentIp: '',
      resultValue: '',
      isagentNamedisabled: false,
      isagentIpdisabled: false,
    };

    this.saveAgent = this.saveAgent.bind(this);
  }

  handleAgentNameChange = e => {
    this.setState({
      agentName: e.target.value,
      showNameError: false,
    });
  }

  handleAgentIpChange = e => {
    this.setState({
      agentIp: e.target.value,
      showIpError: false
    });
  }

  saveAgent() {
    const {
      agentName,
      agentIp
    } = this.state;

    fetch('../api/ossec-plugin/api-path').then(response => {
      return response.json();
    }).then(resp => {
      const apiPath = resp.apiPath.trim();
      const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents';

      const data = {
        'name': agentName,
        'ip': agentIp
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(resp => {
        return resp.json();
      }).then((resp) => {
        console.log(resp);
        switch(parseInt(resp.error)) {
          case 0:
            const message = [
              'Agent saved',
              'Agent ID: ' + resp.data.id,
              'Agent Key: ' + resp.data.key
            ];
            this.props.onSave(message);
            break;
          case 601:
            this.setState({
              showNameError: true,
              nameError: 'Invalid agent name'
            });
            break;
          case 1705:
            this.setState({
              showNameError: true,
              nameError: 'An agent with this name already exist'
            });
            break;
          case 606:
            this.setState({
              showIpError: true,
              ipError: 'Invalid agent IP'
            });
            break;
          case 1706:
            this.setState({
              showIpError: true,
              ipError: 'An agent with this IP already exist'
            });
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
    return(
      <EuiForm>
        <EuiFormRow
          label="Agent Name"
          isInvalid={this.state.showNameError}
          error={this.state.nameError}
        >
          <EuiFieldText name="name" value={this.state.agentName} onChange={this.handleAgentNameChange} disabled={this.state.isagentNamedisabled}/>
        </EuiFormRow>
        <EuiFormRow
          label="Agent IP"
          isInvalid={this.state.showIpError}
          error={this.state.ipError}
        >
          <EuiFieldText name="ip" value={this.state.agentIp} onChange={this.handleAgentIpChange} disabled={this.state.isagentIpdisabled}/>
        </EuiFormRow>
        <EuiFormRow>
          <EuiButton type="submit" onClick={this.saveAgent} fill>
            Save agent
          </EuiButton>
        </EuiFormRow>
        <EuiFormRow
          label="Result"
        >
          <EuiTextArea
            disabled
            value={this.state.resultValue}
          />
        </EuiFormRow>

      </EuiForm>
    );
  }
}