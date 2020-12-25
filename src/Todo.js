import { Button, ListItem, ListItemText } from '@material-ui/core'
import React from 'react';
import { db } from './firebase_config';

export default function TodoListItem({todo, inprogress, id}) {

    function toggleInProgress(){
        db.collection("todoapp-v2")
        .doc(id).update({
            inprogress: !inprogress
        });
    }

    function deleteTodo(){
        db.collection("todoapp-v2")
        .doc(id).delete();
    }

    return (
        <div style={{ display: "flex" , padding:"2px"}}>
            <ListItem style={ {background:"#f2f2f2"}}>
                <ListItemText 
                    style={ {fontWeight: 'bold'}}
                    primary={<h4>{todo}</h4>} 
                    secondary={<i>{ inprogress ? " 🏃 In Progress 🏃" : "Completed ✅" }</i> } 
                />
            </ListItem>

            <Button 
                style={ inprogress ? {background:"#b3b3b3", margin: "10px"} : {background:"#99ff66", margin: "10px"}} 
                onClick={toggleInProgress}> {<h4>{ inprogress ? "Done " : "Undone"}</h4> } 
            </Button>
            <Button 
                style={ {background:"#30ccd1", margin: "10px" }} 
                onClick={deleteTodo}> 
                ❌
            </Button>
        </div>
    )
}


