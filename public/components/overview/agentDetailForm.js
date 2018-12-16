import React from 'react';

import {
  EuiFlexGrid,
  EuiFlexItem,
  EuiButton,
  EuiBasicTable,
  EuiSpacer,
  EuiOverlayMask,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
} from '@elastic/eui';

import {
  ConfirmModal
} from './confirmModal';

// eslint-disable-next-line react/prefer-stateless-function
export class AgentDetailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agentInfo: null,
      agentRootcheckInfo: null,
      agentSyscheckInfo: null,
      agentRootcheckEvent: null,
      agentSyscheckEvent: null,
      pageIndexRoot: 0,
      pageSizeRoot: 5,
      pageIndexSys: 0,
      pageSizeSys: 5,
      isModalVisible: false
    };

    this.onRootcheckTableChange = this.onRootcheckTableChange.bind(this);
    this.onSyscheckTableChange = this.onSyscheckTableChange.bind(this);
    this.restartRootcheck = this.restartRootcheck.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
          case 1000:
          default:
            break;
        }
        const rootcheckUrl = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'rootcheck/' + agentId + '/last_scan';
        fetch(rootcheckUrl).then((rResp) => {
          return rResp.json();
        }).then((rResp) => {
          switch(rResp.error) {
            case 0:
              this.setState({
                agentRootcheckInfo: rResp.data
              });
            default:
              break;
          }
        }).catch((rReason) => {
          console.log("No reponse");
          console.log(rReason);
        });

        const syscheckUrl = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'syscheck/' + agentId + '/last_scan';
        fetch(syscheckUrl).then((sResp) => {
          return sResp.json();
        }).then((sResp) => {
          switch(sResp.error) {
            case 0:
              this.setState({
                agentSyscheckInfo: sResp.data
              });
            default:
              break;
          }
        }).catch((rReason) => {
          console.log("No reponse");
          console.log(rReason);
        });

        const rootcheckItemsUrl = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/')
        + 'rootcheck/' + agentId + '?status=outstanding';
        fetch(rootcheckItemsUrl).then((rResp) => {
          return rResp.json();
        }).then((rResp) => {
          switch(rResp.error) {
            case 0:
              this.setState({
                agentRootcheckEvent: rResp.data
              });
            default:
              break;
          }
        }).catch((rReason) => {
          console.log("No reponse");
          console.log(rReason);
        });

        const syscheckItemsUrl = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'syscheck/' + agentId + '?limit=20';
        fetch(syscheckItemsUrl).then((sResp) => {
          return sResp.json();
        }).then((sResp) => {
          switch(sResp.error) {
            case 0:
              this.setState({
                agentSyscheckEvent: sResp.data
              });
            default:
              break;
          }
        }).catch((rReason) => {
          console.log("No reponse");
          console.log(rReason);
        });
      }).catch((reason) => {
        console.log("No reponse");
        console.log(reason);
      });
    }).catch((reason) => {
      console.log("No reponse");
      console.log(reason);
    });

  }

  getTimeString(time) {
    let date;
    if (time.toLowerCase() === 'none') {
      date = time;
    } else {
      date = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      }).format(new Date(time));
    }
    return date;
  }

  onRootcheckTableChange({ page = {} }) {
    const {
      index: pageIndexRoot,
      size: pageSizeRoot
    } = page;

    this.setState({
      pageIndexRoot,
      pageSizeRoot
    });
  }

  onSyscheckTableChange({ page = {} }) {
    const {
      index: pageIndexSys,
      size: pageSizeSys
    } = page;

    this.setState({
      pageIndexSys,
      pageSizeSys
    });
  }

  closeModal() {
    this.setState({
      isModalVisible: false,
    });
  }

  renderModal() {
    const { infoModalMessage } = this.state;
    return(
      <EuiOverlayMask>
        <EuiModal
          onClose={this.closeModal}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Messages
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <ConfirmModal messages={infoModalMessage} onConfirm={this.closeModal}/>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }

  restartRootcheck() {
    const { agentId } = this.props;

    fetch('../api/ossec-plugin/api-path').then(response => {
      return response.json();
    }).then(resp => {
      const apiPath = resp.apiPath.trim();
      const url = apiPath + (apiPath[apiPath.length - 1] === '/' ? '' : '/') + 'rootcheck/' + agentId;

      fetch(url, {
        method: 'PUT',
      }).then(resp => {
        return resp.json();
      }).then(resp => {
        this.setState({
          isModalVisible: true,
          infoModalMessage: resp.data
        });
      });
    }).catch((reason) => {
      console.log('No reponse');
      console.log(reason);
    });
  }

  render() {
    const {
      agentInfo,
      agentRootcheckInfo,
      agentSyscheckInfo,
      agentRootcheckEvent,
      agentSyscheckEvent,
      isModalVisible
    } = this.state;

    let body;

    if (agentInfo === null) {
      body = (
        <React.Fragment>
          <EuiFlexItem>No Info to display</EuiFlexItem>
        </React.Fragment>
      );
    } else {
      const date = this.getTimeString(agentInfo.lastKeepAlive);
      let rootcheckBody;
      let syscheckBody;
      let rootcheckTable;
      let syscheckTable;

      if (agentRootcheckInfo != null) {
        const start = this.getTimeString(agentRootcheckInfo.start);
        const end = this.getTimeString(agentRootcheckInfo.end);

        rootcheckBody = (
          <React.Fragment>
            <EuiFlexItem>
              <strong>Rootcheck start:</strong> {start}
            </EuiFlexItem>
            <EuiFlexItem>
              <strong>Rootcheck end:</strong> {end}
            </EuiFlexItem>
          </React.Fragment>
        );
      }

      if (agentSyscheckInfo != null) {
        const start = this.getTimeString(agentSyscheckInfo.start);
        const end = this.getTimeString(agentSyscheckInfo.end);

        syscheckBody = (
          <React.Fragment>
            <EuiFlexItem>
              <strong>Syscheck start:</strong> {start}
            </EuiFlexItem>
            <EuiFlexItem>
              <strong>Syscheck end:</strong> {end}
            </EuiFlexItem>
          </React.Fragment>
        );
      }

      if (agentRootcheckEvent != null) {
        const columns = [{
          field: 'log',
          name: 'Log'
        }, {
          field: 'date_first',
          name: 'Start time',
          render: (dateFirst) => {
            return this.getTimeString(dateFirst);
          }
        }, {
          field: 'date_last',
          name: 'End time',
          render: (dateLast) => {
            return this.getTimeString(dateLast);
          }
        }];

        const {
          pageIndexRoot: pageIndex,
          pageSizeRoot: pageSize
        } = this.state;

        let items = agentRootcheckEvent.items;
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
          hidePerPageOptions: true
        };

        rootcheckTable = (
          <React.Fragment>
            <EuiSpacer />
            <strong>Rootcheck Events</strong><br />
            <EuiSpacer size="m" />
            <EuiBasicTable
              columns={columns}
              items={items}
              pagination={pagination}
              onChange={this.onRootcheckTableChange}
            />
          </React.Fragment>
        );
      }

      if (agentSyscheckEvent != null) {
        const columns = [{
          field: 'file',
          name: 'File'
        }, {
          field: 'scanDate',
          name: 'Scan date',
          render: (scanDate) => {
            return this.getTimeString(scanDate);
          }
        }, {
          field: 'size',
          name: 'Size',
        }];
        const {
          pageIndexSys: pageIndex,
          pageSizeSys: pageSize
        } = this.state;

        let items = agentSyscheckEvent.items;
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
          hidePerPageOptions: true
        };
        syscheckTable = (
          <React.Fragment>
            <EuiSpacer />
            <strong>Syscheck Events</strong><br />
            <EuiSpacer size="m" />
            <EuiBasicTable
              columns={columns}
              items={items}
              pagination={pagination}
              onChange={this.onSyscheckTableChange}
            />
          </React.Fragment>
        );
      }

      let osComponent;
      if (agentInfo.os) {
        osComponent = (<EuiFlexItem><strong>Operating system:</strong> {agentInfo.os.name}</EuiFlexItem>);
      }

      let modal;
      if (isModalVisible) {
        modal = this.renderModal(this.state.modalType);
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
            {rootcheckBody}
            {syscheckBody}
          </EuiFlexGrid>
          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <EuiButton iconType="trash" color="danger" onClick={() => { this.props.onDelete({ id: agentInfo.id }); }}>
                Delete this agent
              </EuiButton>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton
                iconType="console"
                color="secondary"
                onClick={() => {
                  this.props.onRestart({ id: agentInfo.id });
                }}
              >
                Restart this agent
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiFlexGrid columns={1}>
            <EuiFlexItem>
              <EuiButton
                iconType="Refresh"
                color="primary"
                onClick={this.restartRootcheck}
              >
                Restart Rootcheck/Syscheck
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGrid>
          {rootcheckTable}
          {syscheckTable}
          {modal}
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