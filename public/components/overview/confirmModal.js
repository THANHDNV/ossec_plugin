import React from 'react';

import {
  EuiText,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem
} from '@elastic/eui';

// eslint-disable-next-line react/prefer-stateless-function
export class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let text;
    if (Array.isArray(this.props.messages)) {
      // is array
      text = this.props.messages.map(line => {
        return (
          <p>
            {line}
          </p>
        );
      });
    } else {
      text = (
        <p>
          {this.props.messages}
        </p>
      );
    }
    return(
      <React.Fragment>
        <EuiText grow={false}>
          {text}
        </EuiText>
        <EuiButton iconType="check" onClick={this.props.onConfirm}>
          Confirm
        </EuiButton>
      </React.Fragment>
    );
  }
}