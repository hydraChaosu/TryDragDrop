import React from "react";
import "./App.css";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: blue;
`;
const Column = styled.div`
  height: 100%;
  flex-basis: 20%;
  background: pink;
  ${props =>
    props.right &&
    css`
      background: palevioletred;
    `};
  ${props =>
    props.middle &&
    css`
      background: green;
      flex-grow: 1;
    `};
`;

const Element = styled.div`
  height: 50px;
  width: 100px;
  background: black;
  :hover {
    background: white;
  }
`;

class App extends React.Component {
  state = {
    left: 0,
    middle: 0,
    rigth: 0,
    elements: [
      { name: "cat", bgcolor: "pink", where: "left" },
      { name: "dog", bgcolor: "blue", where: "mid" },
      { name: "chicken", bgcolor: "purple", where: "mid" }
    ]
  };

  handleEvent = ({ type }) => {
    console.log(type);
    switch (type) {
      case "onDrag":
        return console.log("dragged");
      case "onDrop":
        return console.log("dropped");
      case "mouseleave":
        return console.log("abbadon");
      default:
        return console.warn(`No case for event type "${type}"`);
    }
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDragStart = (e, id) => {
    console.log("drag start", id);
    //daje wartosc id ogolno dostepna
    e.dataTransfer.setData("id", id);
  };

  onDrop = (e, where) => {
    let id = e.dataTransfer.getData("id");

    let elements = this.state.elements.filter(element => {
      if (element.name === id) {
        element.where = where;
      }
      return element;
    });
    this.setState({
      elements
    });
  };

  render() {
    let elements = {
      left: [],
      mid: [],
      right: []
    };

    this.state.elements.forEach(t => {
      elements[t.where].push(
        <Element
          draggable
          key={t.name}
          onDragStart={e => {
            this.onDragStart(e, t.name);
          }}
        >
          {t.name}
        </Element>
      );
    });

    return (
      <Wrapper>
        <Column
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, "left");
          }}
        >
          {elements.left}
        </Column>
        <Column
          middle
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, "mid");
          }}
        >
          {/* <Element
            draggable
            onDrag={this.handleEvent}
            onDrop={this.handleEvent}
          /> */}
          {elements.mid}
        </Column>
        <Column
          right
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, "right");
          }}
        >
          {elements.right}
        </Column>
      </Wrapper>
    );
  }
}

export default App;
