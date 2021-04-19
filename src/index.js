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

    const sourceList = this.state.lists
    .map(liste =>{
      if(liste.id=== source.droppableId){
        return liste;
      }
    })
    .filter(Boolean);
    const newHasCards = Array.from(sourceList[0].hasCards);
    console.log(newHasCards);

    newHasCards.splice(source.index, 1);
    newHasCards.splice(destination.index, 0, draggableId);
    console.log(newHasCards);    

    const newList = {
      ...this.state.lists.obj,
      hasCards: newHasCards,
    };
    console.log('noua lista este '); 
    console.log(newList);

    let newState = this.state;

    newState = newState.lists.map(liste=>{
      if(liste.id===newList.id){
        liste.hasCards = newHasCards;
        return liste;
      }
    });

    this.setState(newState);
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
              if (liste.id===listID){
                titlu=liste.title;
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