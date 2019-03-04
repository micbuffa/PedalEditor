import React, { Component } from 'react';
import Styled from 'styled-components';

class TabsBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTabId: 0
    }
  }

  handleTabClick = newCurrentTabId => {
    this.setState({
      currentTabId: newCurrentTabId
    });
  }


  render() {
    return (
      <Container>
        <Header>
          {this.props.tabs.map((tab, index) => (
            <Tab
              onClick={() => this.handleTabClick(index)}
              isSelected={this.state.currentTabId === index}
              key={index}
            >
              <span>{tab.label}</span>
            </Tab>
          ))}
        </Header>
        <main>
          {this.props.tabs[this.state.currentTabId].content}
        </main>
      </Container>
    )
  }
};

export default TabsBar;

const Container = Styled.div`
    display: flex;
    flex-flow: column nowrap;
`

const Header = Styled.header`
  display: flex;
  flex-flow: row nowrap;
  & > * {
    flex: 1 1 0;
  }
`

const Tab = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isSelected = false }) => isSelected ? '#9E9E9E' : '#c5c5c5'};
  padding: 10px 20px;
`;