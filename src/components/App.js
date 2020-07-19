import React, { useReducer, useEffect } from 'react';
import EventIndex from "./EventIndex"
import EventForm from "./EventForm"
import AppContext from "../contexts/AppContext"
import reducer from "../reducers/"
import { INITIAL_QUERY} from "../actions";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listTodos } from '../graphql/queries';
// import { createTodo } from "../graphql/mutations";

Amplify.configure(awsmobile);

const App = () => {
  // combineReducerによりstateは配列からオブジェクトになる。
  // const initialState = {
  //   events: []
  // }
  const [state, dispatch] = useReducer(reducer, [])

  //アイテムをGETする
  const getEvents = async (type) => {
    const appState =  await API.graphql(graphqlOperation(listTodos))
    dispatch({ type: INITIAL_QUERY, event: appState.data.listTodos.items })
  }
  useEffect(() => {
    getEvents(INITIAL_QUERY)
  })

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={EventIndex} />
            <Route exact path="/new" component={EventForm} />
          </Switch>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ['phone_number']
  }
});