import React from 'react';
import Styled from 'styled-components';

const NavMenu = ({ menus = [] }) => (
  <NavMenuContainer>
    {
      menus.map(({ label, items = [] }, index) => (
        <DropDown key={index}>
          <Btn><span>{label}</span></Btn>
          <List className="dropdown-list">
            {
              items.map(({ type, payload }, index) => {
                switch (type) {
                  case 'separator':
                    return <Separator key={index} />;
                  case 'item':
                    const { label, shortcut, handleClick = () => { } } = payload;
                    return (
                      <Item onClick={handleClick} key={index}>
                        <span>{label}</span>
                        {shortcut && <KeyboardShortcuts>{shortcut}</KeyboardShortcuts>}
                      </Item>
                    )
                  default:
                    return null;
                }
              })
            }
          </List>
        </DropDown>
      ))
    }
  </NavMenuContainer>
);

const menuBgColor = "#eee";
const menuSelectColor = "#336699";
const menuSelectTextColor = "#FFF";
const menuContainerHeight = "25px";
const dropdownBorderColor = "#9E9E9E";


const NavMenuContainer = Styled.nav`
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(60px, min-content) );
  grid-template-rows: ${menuContainerHeight};
  background-color: ${menuBgColor};
  padding: 0 5px;
`;

const DropDown = Styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: #000;

  &:hover {
    background-color: ${menuSelectColor};
    color: #FFF;
    .dropdown-list {
      display: flex;
    }
  }
`;

const Btn = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: ${menuSelectTextColor};
  }
`

const List = Styled.ul`
  margin: 0;
  display: none;
  position: absolute;
  background-color: ${menuBgColor};
  top: ${menuContainerHeight};
  padding: 0;
  width: max-content;
  border: 1px solid ${dropdownBorderColor};
  z-index: 100;
  flex-flow: column nowrap;
`;

const Item = Styled.li`
  padding: 5px 10px;
  display: flex;
  justify-content: spaceBetween;
  color: #000;

  &:hover {
    background-color: ${menuSelectColor};
    color: ${menuSelectTextColor};
  }
`

const Separator = Styled.hr`
  margin: 0;
  width: 100%;
  border-top: 1px solid ${dropdownBorderColor};
`

const KeyboardShortcuts = Styled.span`
  margin-left: auto;
  padding-left: 25px;
`

export default NavMenu;