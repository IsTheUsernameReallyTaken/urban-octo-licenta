import React from 'react';
import ReactDOM from 'react-dom';
import List from "./components/List";
import WelcomeCard from "./components/WelcomeCard"
import {DragDropContext} from "react-beautiful-dnd";
import initialData from "./initialData";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

class App extends React.Component{
  state = initialData;

  onDragEnd = result => {
    const {source, destination, draggableId} = result;

    if(!destination){
      return;
    }

    if(destination.droppableId === source.droppableId){
      if(destination.index === source.index){
        return;
      }
    }

    if(destination.droppableId === source.droppableId){
      let stateCopy = this.state;
      stateCopy.lists.forEach(listele =>{
        if(listele.id === source.droppableId){
          listele.hasCards.splice(source.index, 1);
          listele.hasCards.splice(destination.index, 0, draggableId);
        }
      })
      this.setState(stateCopy);
    } else {
      let stateCopy = this.state;
      stateCopy.lists.forEach(listele =>{
        if(listele.id === source.droppableId){
          listele.hasCards.splice(source.index, 1);
        }
        if(listele.id === destination.droppableId){
          listele.hasCards.splice(destination.index, 0, draggableId);
        }
      })
      this.setState(stateCopy);
    }
  }

  render(){
    return(
      <DragDropContext
        onDragEnd = {this.onDragEnd}
      >
        <WelcomeCard/>
        <AppContainer>
          {this.state.order.map(listID =>{
            let titlu, cardIDs;
            this.state.lists.forEach(liste=>{
              if (liste.id === listID){
                titlu = liste.title;
                cardIDs = liste.hasCards;
              }
            })
            return <List key={listID} id={listID} title={titlu} state={this.state} cardIDs={cardIDs}/>
          })}
        </AppContainer>
    </DragDropContext>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('root'));