import React from 'react';
import {
  EuiBasicTable,
  EuiHealth,
  EuiButton,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import {
  AgentCreateForm
} from './agentCreateForm';

import {
  AgentDetailForm
} from './agentDetailForm';

import {
  ConfirmModal
} from './confirmModal';

const MODAL_NONE = 'none';
const MODAL_INFO = 'info';
const MODAL_CREATE_AGENT = 'create';
const MODAL_DETAIL = 'detail';

export class AgentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
      pageSize: 5,
      showPerPageOptions: false,
      sample_data: {
        'error': 0,
        'data': {
          'totalItems': 5,
          'items': [
            {
              'status': 'Alive',
              'lastAlive': 'None',
              'name': 'localhost.localdomain',
              'ip': '127.0.0.1',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.344000',
              'version': 'OSSEC HIDS v3.1.0',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '000'
            },
            {
              'status': 'Disconnected',
              'lastAlive': '2018-11-27 23:35:16.577000',
              'name': 'CLT1',
              'ip': '192.168.127.129',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.381000',
              'version': 'OSSEC HIDS v2.9.0',
              'key': 'a634b3c55d3e506139d5152fe90a3aec35217ea5b0b8709ae4296c32048e4a13',
              'config_sum': '',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '001'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'CLT2',
              'ip': '192.168.127.140',
              'dateAdd': '2018-11-28 16:53:19.383000',
              'key': '37651eedca887a80a02cf6f6e6eeaf3a404729f75424d15e7830661821c3eaa4',
              'id': '002'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'newAgent',
              'ip': 'any',
              'dateAdd': '2018-11-28 16:24:00.612000',
              'key': 'cad35e576109af333b71a837000bdac3a2e5f2fc76e433e20be359f5cd7433b8',
              'id': '005'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'NewHost',
              'ip': '192.168.127.200',
              'dateAdd': '2018-11-28 16:54:22.070000',
              'key': '6439c22a5e7c4365e7e74a39db79b3a27df68795b446e277608d8964e0384a5d',
              'id': '006'
            },
            {
              'status': 'Disconnected',
              'lastAlive': '2018-11-27 23:35:16.577000',
              'name': 'CLT1',
              'ip': '192.168.127.129',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.381000',
              'version': 'OSSEC HIDS v2.9.0',
              'key': 'a634b3c55d3e506139d5152fe90a3aec35217ea5b0b8709ae4296c32048e4a13',
              'config_sum': '',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '012'
            },
            {
              'status': 'Alive',
              'lastAlive': 'None',
              'name': 'localhost.localdomain',
              'ip': '127.0.0.1',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.344000',
              'version': 'OSSEC HIDS v3.1.0',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '000'
            },
            {
              'status': 'Disconnected',
              'lastAlive': '2018-11-27 23:35:16.577000',
              'name': 'CLT1',
              'ip': '192.168.127.129',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.381000',
              'version': 'OSSEC HIDS v2.9.0',
              'key': 'a634b3c55d3e506139d5152fe90a3aec35217ea5b0b8709ae4296c32048e4a13',
              'config_sum': '',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '001'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'CLT2',
              'ip': '192.168.127.140',
              'dateAdd': '2018-11-28 16:53:19.383000',
              'key': '37651eedca887a80a02cf6f6e6eeaf3a404729f75424d15e7830661821c3eaa4',
              'id': '002'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'newAgent',
              'ip': 'any',
              'dateAdd': '2018-11-28 16:24:00.612000',
              'key': 'cad35e576109af333b71a837000bdac3a2e5f2fc76e433e20be359f5cd7433b8',
              'id': '005'
            },
            {
              'status': 'Never connected',
              'lastAlive': 'None',
              'name': 'NewHost',
              'ip': '192.168.127.200',
              'dateAdd': '2018-11-28 16:54:22.070000',
              'key': '6439c22a5e7c4365e7e74a39db79b3a27df68795b446e277608d8964e0384a5d',
              'id': '006'
            },
            {
              'status': 'Disconnected',
              'lastAlive': '2018-11-27 23:35:16.577000',
              'name': 'CLT1',
              'ip': '192.168.127.129',
              'os_arch': 'x86_64',
              'dateAdd': '2018-11-28 16:53:19.381000',
              'version': 'OSSEC HIDS v2.9.0',
              'key': 'a634b3c55d3e506139d5152fe90a3aec35217ea5b0b8709ae4296c32048e4a13',
              'config_sum': '',
              'os': 'Linux localhost.localdomain 3.10.0-327.el7.x86_64 #1 SMP Thu Nov 19 22:10:57 UTC 2015 x86_64',
              'id': '012'
            },
          ]
        }
      },
      data: null,
      selectedItems: [],
      isModalVisible: false,
      modalType: MODAL_NONE,
      selectAgent: null
    };

    this.closeModal = this.closeModal.bind(this);
    this.showDetailModal = this.showDetailModal.bind(this);
    this.showCreateModal = this.showCreateModal.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.deleteAgent = this.deleteAgent.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
    this.onTableChange = this.onTableChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.restartAgent = this.restartAgent.bind(this);
  }

  updateData() {
    this.setState({
      selectedItems: [],
      data: null
    }, () => {
      fetch('../api/ossec-plugin/api-path').then(response => {
        return response.json();
      }).then(resp => {
        const apiPath = resp.apiPath.trim();
        const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents';
        fetch(url).then((resp) => {
          return resp.json();
        }).then((resp) => {
          this.setState({ data: resp.data }, () => {
          });
        }).catch((reason) => {
          console.log('No reponse');
          console.log(reason);
        });
      }).catch((reason) => {
        console.log('No reponse');
        console.log(reason);
      });
    });
  }

  componentDidMount() {
    this.updateData();
    setInterval(this.updateData, 5 * 60 * 1000);
  }

  onTableChange({ page = {} }) {
    const {
      index: pageIndex,
      size: pageSize
    } = page;

    this.setState({
      pageIndex,
      pageSize
    });
  }

  onSelectionChange = (selectedItems) => {
    this.setState({ selectedItems });
  };

  renderStatus = (status) => {
    let color = '';
    switch(status.toLowerCase()) {
      case 'active':
        color = 'success';
        break;
      case 'disconnected':
        color = 'danger';
        break;
      case 'never connected':
        color = 'subdued';
        break;
      case 'pending':
        color = 'warning';
        break;
      default:
        color = 'subdued';
    }
    return(
      <EuiHealth color={color}>{status}</EuiHealth>
    );
  }

  showInfoModal(message) {
    this.setState({
      isModalVisible: true,
      modalType: MODAL_INFO,
      infoModalMessage: message
    });
  }

  onClickDelete() {
    const { selectedItems } = this.state;

    for (const i in selectedItems) {
      if (selectedItems[i].id === '000') {
        selectedItems.splice(i, 1);
      }
    }

    // delete multi agent action
    fetch('../api/ossec-plugin/api-path').then(response => {
      return response.json();
    }).then(resp => {
      const apiPath = resp.apiPath.trim();
      const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents?older_than=10s';

      const data = {
        'ids': selectedItems.map(item => item.id)
      };

      fetch(url, {
        method: 'DELETE',
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
              resp.data.msg,
              'Deleted agents: ' + resp.data.affected_agents.join(),
              'Total deleted agents: ' + resp.data.total_affected_agents.toString()
            ];
            this.showInfoModal(message);
            setTimeout(this.updateData, 1500);
            break;
          case 1731:
            this.showInfoModal(resp.data.msg);
            break;
          default:
            break;
        }
      });
    }).catch((reason) => {
      console.log('No reponse');
      console.log(reason);
    });
  }

  renderModal(type = MODAL_NONE) {
    let modalTitle;
    let modalBody;
    switch(type) {
      case MODAL_CREATE_AGENT:
        modalTitle = 'Create new Agent';
        modalBody = (
          <AgentCreateForm onSave={(message) => {
            this.showInfoModal(message, true);
            setTimeout(this.updateData, 5000);
          }}
          />
        );
        break;
      case MODAL_DETAIL:
        modalTitle = 'Agent detail';
        const {
          selectAgent
        } = this.state;
        modalBody = (
          <AgentDetailForm
            agentId={selectAgent.id}
            onNotFound={this.showInfoModal}
            onDelete={this.deleteAgent}
            onRestart={this.restartAgent}
            onClose={this.closeModal}
          />
        );
        break;
      case MODAL_INFO:
        const {
          infoModalMessage
        } = this.state;
        modalBody = (
          <ConfirmModal messages={infoModalMessage} onConfirm={this.closeModal}/>
        );
        break;
      case MODAL_NONE:
      default:
        break;
    }

    return(
      <EuiOverlayMask>
        <EuiModal
          onClose={this.closeModal}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              {modalTitle}
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            {modalBody}
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  showCreateModal() {
    this.setState({
      isModalVisible: true,
      modalType: MODAL_CREATE_AGENT
    });
  }

  showDetailModal(agent) {
    this.setState({
      isModalVisible: true,
      modalType: MODAL_DETAIL,
      selectAgent: agent
    });
  }

  closeModal() {
    this.setState({
      isModalVisible: false,
      modalType: MODAL_NONE
    });
  }

  deleteAgent(agent) {
    if (agent.id === '000') {
      this.showInfoModal('Unable to delete manager');
    } else {
      //delete single agent action
      fetch('../api/ossec-plugin/api-path').then(response => {
        return response.json();
      }).then(resp => {
        const apiPath = resp.apiPath.trim();
        const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents/' + agent.id;
        fetch(url, {
          method: 'DELETE'
        }).then(resp => {
          return resp.json();
        }).then((resp) => {
          console.log(resp);
          switch(parseInt(resp.error)) {
            case 0:
              this.showInfoModal('Deleted agent');
              setTimeout(this.updateData, 1500);
              break;
            case 1701:
              this.showInfoModal('Agent does not exist');
              break;
            default:
              break;
          }
        });
      }).catch((reason) => {
        console.log('No reponse');
        console.log(reason);
      });
    }

    this.setState({ selectedItems: [] });
  }

  restartAgent(agents) {

    fetch('../api/ossec-plugin/api-path').then(response => {
      return response.json();
    }).then(resp => {
      const apiPath = resp.apiPath.trim();
      const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'agents/restart';

      const data = { 'ids': agents };
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
            const msg = [
              resp.data.msg,
              'Affected agents: ' + resp.data.affected_agents.join()
            ];
            this.showInfoModal(msg);
            setTimeout(this.updateData, 1500);
            break;
          case 1701:
            this.showInfoModal('Agent does not exist');
            break;
          default:
            break;
        }
      });
    }).catch((reason) => {
      console.log('No reponse');
      console.log(reason);
    });
  }

  restartAgents() {
    const { selectedItems } = this.state;

    this.restartAgent(selectedItems);

    this.updateData();
  }

  renderDeleteButton() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiFlexItem grow={false}>
        <EuiButton
          color="danger"
          iconType="trash"
          onClick={this.onClickDelete}
        >
          Delete {selectedItems.length} Agents
        </EuiButton>
      </EuiFlexItem>
    );
  }

  renderRestartButton() {
    const { selectedItems } = this.state;

    if (selectedItems.length === 0) {
      return;
    }

    return (
      <EuiFlexItem grow={false}>
        <EuiButton
          color="warning"
          iconType="console"
          onClick={this.updateData}
        >
          Restart {selectedItems.length} Agents
        </EuiButton>
      </EuiFlexItem>
    );
  }

  renderCreateButton() {
    return(
      <EuiFlexItem grow={false}>
        <EuiButton
          color="primary"
          iconType="save"
          onClick={this.showCreateModal}
        >
          Add new agent
        </EuiButton>
      </EuiFlexItem>
    );
  }

  renderRefreshButton() {
    return(
      <EuiFlexItem grow={false}>
        <EuiButton
          color="secondary"
          iconType="refresh"
          onClick={this.updateData}
        >
          Refresh
        </EuiButton>
      </EuiFlexItem>
    );
  }

  render() {
    const {
      pageIndex,
      pageSize,
      showPerPageOptions,
      data,
      // sample_data
    } = this.state;

    const actions = [{
      name: 'Detail',
      description: 'More detail about the agent',
      icon: 'document',
      onClick: this.showDetailModal,
      isPrimary: true
    }, {
      name: 'Delete',
      description: 'Delete this agent',
      icon: 'trash',
      onClick: this.deleteAgent,
      isPrimary: true
    }, {
      name: 'Restart agent',
      description: 'Restart the agent',
      icon: 'console',
      onClick: (agent) => {
        this.restartAgent([agent.id]);
      }
    }];

    const columns = [{
      field: 'id',
      name: 'Agent ID'
    },
    {
      field: 'name',
      name: 'Agent Name'
    },
    {
      field: 'ip',
      name: 'IP',
    },
    {
      field: 'status',
      name: 'Status',
      render: (status) => {
        return this.renderStatus(status);
      }
    }, {
      name: 'Actions',
      actions
    }];

    const deleteButton = this.renderDeleteButton();

    const createButton = this.renderCreateButton();

    const refreshButton = this.renderRefreshButton();

    const restartButton = this.renderRestartButton();

    let items = [];
    if (data) {
      items = data.items;
    } else {
      //only for testing
      // items = sample_data.data.items;
    }

    const totalItemCount = items.length;
    if (pageIndex.toString()) {
      if (pageSize) {
        if (items.length > Number(pageIndex) * Number(pageSize)) {
          items = items.slice((Number(pageIndex)) * Number(pageSize), (Number(pageIndex) + 1) * Number(pageSize));
        }
      }
    }

    const pagination = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalItemCount,
      hidePerPageOptions: !showPerPageOptions
    };

    const selection = {
      selectable: () => true,
      // selectable: (agent) => {
      //   // if (agent.status.toLowerCase() === 'Alive') return true;
      //   return true;
      // },
      selectableMessage: (selectable) => !selectable ? 'No such agent!' : undefined,
      onSelectionChange: this.onSelectionChange
    };

    let modal;
    if (this.state.isModalVisible) {
      modal = this.renderModal(this.state.modalType);
    }

    return(
      <React.Fragment>
        <EuiFlexGroup alignItems="center" gutterSize="s">
          {refreshButton}
          {createButton}
          {restartButton}
          {deleteButton}
        </EuiFlexGroup>
        <EuiBasicTable
          columns={columns}
          items={items}
          itemId="id"
          pagination={pagination}
          onChange={this.onTableChange}
          isSelectable={true}
          selection={selection}
        />
        {modal}
      </React.Fragment>
    );
  }
}