import React, { Component } from 'react';
import Styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

class Node extends Component {
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
    const { title, children = [] } = this.props.treeData;
    return (
      <li>
        <span onClick={this.handleClick}>
          {children.length > 0 &&
            <FontAwesomeIcon icon={this.state.isOpen ? faCaretDown : faCaretRight} />} {title}
        </span>
        {this.state.isOpen ?
          <Ul>
            {
              children.map(child => <Node treeData={child} />)
            }
          </Ul> :
          null
        }
      </li>
    )
  }
}

const TreeNode = ({ nodes = {} }) => (
  <Container>
    <Node treeData={nodes} />
  </Container>
);

export default TreeNode;

const Ul = Styled.ul`
  list-style-type: none;
  padding-left: 25px;
`

const Container = Styled(Ul)`
  margin: 0;
  padding: 0;
`