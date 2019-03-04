// Dependencies
import React, { Component } from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

// Components
import * as Elements from './elements';


class TreePane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  handleClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    const { title, datas = [] } = this.props;

    return (
      <div>
        <span onClick={this.handleClick}>
          {datas.length > 0 &&
            <FontAwesomeIcon icon={this.state.isOpen ? faCaretDown : faCaretRight} />} {title}
        </span>
        {this.state.isOpen ?
          <TreePaneItemContainer>
            {createTreePaneItems(datas)}
          </TreePaneItemContainer> :
          null
        }
      </div>
    )
  }
}

export default TreePane;


const createTreePaneItems = items => items.map(({ label, type, propsOfType = {} }, index) => {
  if (typeof (label) !== 'string') throw new TypeError('Label must be a string.');
  if (typeof (type) !== 'string') throw new TypeError('TYpe must be a string.');

  const Type = Elements[type];

  return (
    <TreePaneItem key={index}>
      <Elements.Label>{`${label} : `}</Elements.Label>
      <Type {...propsOfType} />
    </TreePaneItem>
  );
});

const TreePaneItem = Styled.div`
  margin: 5px;
`;

const TreePaneItemContainer = Styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 15px;
`