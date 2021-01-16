import React, { Component } from "react";
import "./styles/App.css";
import WineTable from "./WineTable";
import AddEditForm from "./AddEditForm";
import AddForm from "./AddForm";
import MobileBlocksData from "./MobileBlocksData";
import FormTest from "./FormTest";
import { convertCompilerOptionsFromJson } from "typescript";
import Login from "./Login";
import HowTo from "./HowTo";
import firebase from "../firebase";
require("dotenv").config();
// var API_KEY = process.env.REACT_APP_API;
var API_KEY = "/api/";
//the key would of course be hidden in production but since
//this is a demo it is here

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glasses: [],
      glass: {},
      filter: "",
      curItem: {},
      curEditItem: {},
      filteredWines: [],
      unFilteredWines: [],
      editCard: false,
      unEditedItem: {},
      disableOtherEdits: false,
      loggedIn: true,
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onCurItemClear = this.onCurItemClear.bind(this);
    this.onCurEditItemClear = this.onCurEditItemClear.bind(this);
    this.editCardChange = this.editCardChange.bind(this);
    this.setDisableOtherEdits = this.setDisableOtherEdits.bind(this);
    this.setLogIn = this.setLogIn.bind(this);
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()

      .then((res) => {
        const glassesData = res.express;

        const order = {
          removed: 1,
          added: 2,
          none: 3,
          hidden: 4,
        };
        glassesData.sort((a, b) => order[a.status] - order[b.status]);
        this.setState({ glasses: glassesData });
        this.setState({ unFilteredWines: glassesData });
      })
      .catch((err) => console.log(err));
  }
  //Fetches data from backend set up at heroku
  callBackendAPI = async () => {
    const response = await fetch(API_KEY);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  //set state as current item in order to delete or update
  handleSelect = (e) => {
    let id = e;
    const glasses = this.state.glasses;

    glasses.map((result) => {
      if (result._id === id) {
        this.setState({ curEditItem: result });
      }
    });
  };

  //delete item
  handleDelete = (e) => {
    let id = e._id;

    fetch(`${API_KEY}delete?_id=${id}`)
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        const remainder = this.state.glasses.filter((item) => {
          return item._id !== id;
        });
        this.setState({ glasses: remainder, e: {} });
        this.setState({ curEditItem: {} });
      });
  };

  //for adding
  handleSubmit = (e) => {
    let newItem = this.state.curItem;
    let name = newItem.name;
    newItem.mise = e.mise;
    newItem.color = e.color;
    newItem.status = e.status;
    newItem.coravin = e.coravin;
    newItem.grape = e.grape;
    newItem.description = e.description;

    fetch(`${API_KEY}add?=${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })

      .then((json) => {
        let newData;
        if (!newItem._id) {
          this.setState((state) => {
            newItem._id = json._id;

            const glasses = [newItem,...state.glasses ];

            return {
              newItem: "",
              glasses,

              
            };
          });
        } else {
          newData = this.state.glasses.map((item) => {
            if (item._id === newItem._id) {
              item = newItem;
            }
            return item;
          });
          this.setState({ glasses: newData });
        }
      })

      .catch((error) => {
        console.log("this be your error brah" + error);
      });
  };
  //for updating item
  handleUpdate = (e) => {
    let newItem = this.state.curEditItem;
    let name = newItem.name;
    newItem.grape = e.grape;
    newItem.description = e.description;
    newItem.status = e.status;
    newItem.mise = e.mise;
    newItem.funfact = e.funfact;
    newItem.coravin = e.coravin;

    fetch(`${API_KEY}add?=${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })

      .then((json) => {
        let newData;
        if (!newItem._id) {
          this.setState((state) => {
            newItem._id = json._id;

            const glasses = [...state.glasses, newItem];

            return {
              glasses,

              newItem: "",
            };
          });
        } else {
          newData = this.state.glasses.map((item) => {
            if (item._id === newItem._id) {
              item = newItem;
            }
            return item;
          });
          this.setState({ glasses: newData });
        }
      })
      .catch((error) => {
        console.log("this be your error brah" + error);
      });
  };
  onChange = (event) => {
    var newItem = this.state.curItem;
    newItem[event.target.name] = event.target.value;
  };

  //changing state of current item being edited
  onBlur = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    this.setState((prevState) => ({
      curEditItem: {
        ...prevState.curEditItem,
        [name]: value,
      },
    }));
  };

  onCurItemClear = () => {
    this.setState({ curItem: {} });
  };
  onCurEditItemClear = () => {
    this.setState({ curEditItem: {} });
  };

  editCardChange = () => {
    this.setState((state) => ({ editCard: !this.state.editCard }));
  };
  setDisableOtherEdits = () => {
    this.setState((state) => ({
      disableOtherEdits: !this.state.disableOtherEdits,
    }));
  };
  setLogIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ loggedIn: true });
      })
      .catch((error) => console.log(error));
  };
  ///render portion

  //
  //
  //
  //

  render() {
    let loggedIn = this.state.loggedIn;
    return (
      <div className="App">
        {loggedIn ? (
          <span>
            <HowTo />
            <p></p>
            <AddForm
              handleSubmit={this.handleSubmit}
              curItem={this.state.curItem}
              onChange={this.onChange}
              handleDelete={this.handleDelete}
              onCurItemClear={this.onCurItemClear}
              handleNextClick={this.handleNextClick}
              handlePrevClick={this.handlePrevClick}
              glasses={this.state.glasses}
              handleUpdate={this.handleUpdate}
              setCurItemStuff={this.setCurItemStuff}
            />

            <MobileBlocksData
              glasses={this.state.glasses}
              wines={this.state.filteredWines}
              onSelect={this.onSelect}
              onClear={this.onClear}
              curItem={this.state.curItem}
              curEditItem={this.state.curEditItem}
              unEditedItem={this.unEditedItem}
              mappedGlasses={this.state.mappedGlasses}
              handleSelect={this.handleSelect}
              editCardChange={this.editCardChange}
              editCard={this.state.editCard}
              onChange={this.onChange}
              handleSubmit={this.handleSubmit}
              handleUpdate={this.handleUpdate}
              handleDelete={this.handleDelete}
              onCurEditItemClear={this.onCurEditItemClear}
              onBlur={this.onBlur}
              setDisableOtherEdits={this.setDisableOtherEdits}
              disableOtherEdits={this.state.disableOtherEdits}
            />
          </span>
        ) : (
          <Login setLogIn={this.setLogIn} />
        )}
      </div>
    );
  }
}

export default App;
