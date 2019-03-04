import React, { Component } from 'react';
import Styled from 'styled-components';

import { NavMenu, TabsBar, TreePane } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [
        {
          label: 'Project',
          isActive: true,
          items: [
            {
              type: 'item',
              payload: {
                label: 'New project',
                shortcut: 'CTRL+N'
              }
            },
            {
              type: 'item',
              payload: {
                label: 'Open project',
                shortcut: 'CTRL+O'
              }
            },
            {
              type: 'separator',
            },
            {
              type: 'item',
              payload: {
                label: 'Save project',
                shortcut: 'CTRL+S'
              }
            },
            {
              type: 'item',
              payload: {
                label: 'Rename project'
              }
            },
            {
              type: 'separator',
            },
            {
              type: 'item',
              payload: {
                label: 'Exit',
                shortcut: 'CTRL+Q'
              }
            },
          ]
        },
        {
          label: 'Plugin',
          items: [
            {
              type: 'item',
              payload: {
                label: 'fetch plugin descriptor'
              }
            },
            {
              type: 'separator',
            },
            {
              type: 'item',
              payload: {
                label: 'Save plugin',
              }
            }
          ]
        },
        {
          label: 'Help',
          items: [
            {
              type: 'item',
              payload: {
                label: 'Documentation'
              }
            },
            {
              type: 'separator',
            },
            {
              type: 'item',
              payload: {
                label: 'Keyboard Shortcuts Reference',
              }
            }
          ]
        },
      ],
      tabs: {
        left:
          [
            {
              label: "Configuration",
              content: [
                <TreePane key="1" title="Properties" datas={[
                  {
                    label: "Name",
                    type: 'Input',
                    propsOfType: {
                      type: 'text'
                    }
                  }
                ]} />,
                <TreePane key="2" title="background" datas={[
                  {
                    label: "color",
                    type: 'Input',
                    propsOfType: {
                      type: 'color',
                      defaultValue: '#f6b73c'
                    }
                  },
                  {
                    label: "image",
                    type: 'Input',
                    propsOfType: {
                      type: 'file'
                    }
                  },
                  {
                    label: "opacity",
                    type: 'Input',
                    propsOfType: {
                      type: 'number'
                    }
                  }
                ]} />
              ]
            },
            {
              label: "Elements",
              content: <div>OK 2</div>
            }
          ],
        right: [
          {
            label: "Inspector",
            content: <div>OK 1</div>
          },
        ]
      }
    }
  }
  render() {
    return (
      <Container>
        <header>
          <NavMenu menus={this.state.menus} />
        </header>
        <Main>
          <section>
            <TabsBar tabs={this.state.tabs.left} />
          </section>
          <section>

          </section>
          <section>
            <TabsBar tabs={this.state.tabs.right} />
          </section>
        </Main>
      </Container>
    );
  }
}

export default App;


const Container = Styled.div`
  display: grid;
  grid-template-rows: 25px 1fr;
  height: 100vh;
`

const Main = Styled.main`
    display: grid;
    grid-template-columns: 250px 1fr 250px;
`