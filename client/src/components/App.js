import React, { Component } from "react";
import "./styles/App.css";
import WineTable from "./WineTable";
import AddEditForm from "./AddEditForm";
import AddForm from "./AddForm";
import MobileBlocksData from "./MobileBlocksData";
import FormTest from "./FormTest";
import { convertCompilerOptionsFromJson } from "typescript";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      glasses: [],
      glass: {},
      filter: "",
      curItem: {},
      filteredWines: [],
      unFilteredWines: [],
      count: 0,
      showMyComponent: false,
      addFormHidden: false,
      editCard: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.setCurItemStuff = this.setCurItemStuff.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onSelect = this.onSelect.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onCurItemClear = this.onCurItemClear.bind(this);
    this.showAddForm = this.showAddForm.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.editCardChange = this.editCardChange.bind(this);
    this.input = React.createRef();
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()

      .then(res => {
        const glassesData = res.express;
        glassesData.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });

        this.setState({ glasses: glassesData });
        this.setState({ unFilteredWines: glassesData });
      })
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };
  // componentDidUpdate(prevProps,prevState,snapshot){
  //   if(this.props.glasses !==prevProps.glasses){
  //     this.callBackendAPI()
  //   }
  // }
  //set state as current item in order to delete or update
  handleSelect = e => {
    let id = e;
    console.log("bro");
    const glasses = this.state.glasses;

    glasses.map(result => {
      if (result._id === id) {
        this.setState({ curItem: result });
      }
    });
  };

  //delete item
  handleDelete = e => {
    let id = e._id;

    fetch(`http://localhost:5000/express_backend/delete?_id=${id}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        const remainder = this.state.glasses.filter(item => {
          return item._id !== id;
        });
        this.setState({ glasses: remainder, e: {} });
      });
  };

  //for adding and updating
  handleSubmit = e => {
    let newItem = this.state.curItem;
    let name = newItem.name;
    newItem.mise = e.mise;
    newItem.color = e.color;
    newItem.status = e.status;
    newItem.coravin = e.coravin;
    newItem.grape = e.grape;
    newItem.description = e.description;

    fetch(`http://localhost:5000/express_backend/add?=${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => {
        if (res.ok) {
          console.log(newItem);
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })

      .then(json => {
        let newData;
        if (!newItem._id) {
          this.setState(state => {
            newItem._id = json._id;
            console.log(newItem._id);
            const glasses = [...state.glasses, newItem];

            return {
              glasses,

              newItem: ""
            };
          });
        } else {
          newData = this.state.glasses.map(item => {
            if (item._id === newItem._id) {
              item = newItem;
            }
            return item;
          });
          this.setState({ glasses: newData });
        }
      })

      .catch(error => {
        console.log("this be your error brah" + error);
      });
    // console.log(e.name);
  };
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.curItem !== prevState.curItem) {
  //     let newData = this.state.glasses.map(item => {
  //       if ((item._id = this.state.curItem._id)) {
  //         item = this.state.curItem;
  //       }
  //       return item;
  //     });
  //     this.setState({ glasses: newData });
  //   }
  // }
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.count !== this.state.count) {
  //     const newWine = this.state.curItem;
  //     const name = newWine.name;
  //     fetch(`http://localhost:5000/express_backend/add?=${name}`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(newWine)
  //     })
  //       .then(res => {
  //         if (res.ok) {
  //           return res.json();
  //         } else {
  //           throw Error(`Request rejected with status ${res.status}`);
  //         }
  //       })

  //       .then((json, newData) => {
  //         if (!newWine._id) {
  //           newData = this.state.glasses;
  //           newWine._id = json._id;

  //           newData.unshift(newWine);
  //           console.log("dude");
  //         } else {
  //           newData = this.state.glasses.map(item => {
  //             if (item._id === newWine._id) {
  //               item = newWine;
  //             }
  //             console.log("brto");
  //             return item;
  //           });
  //         }
  //         this.setState({ glasses: newData });
  //       })

  //       .catch(error => {
  //         console.log("this be your error brah" + error);
  //       });

  //     // console.log(e.name);
  //     // this.setState({ glasses: glasses1 });
  //   }
  // }

  setCurItemStuff = e => {
    // this.setState({ curItem: e });

    this.setState(({ count }) => ({
      count: count + 1
    }));
  };
  handleUpdate = e => {
    let newItem = this.state.curItem;
    let name = newItem.name;
    newItem.grape = e.grape;
    newItem.description = e.description;
    // let oldWine = initialValue

    // console.log(oldWine)
    fetch(`http://localhost:5000/express_backend/add?=${name}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
      .then(res => {
        if (res.ok) {
          console.log(newItem);
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })

      .then(json => {
        let newData;
        if (!newItem._id) {
          this.setState(state => {
            newItem._id = json._id;
            console.log(newItem._id);
            const glasses = [...state.glasses, newItem];

            return {
              glasses,

              newItem: ""
            };
          });
        } else {
          newData = this.state.glasses.map(item => {
            if (item._id === newItem._id) {
              item = newItem;
            }
            return item;
          });
          this.setState({ glasses: newData });
        }
      })
      .catch(error => {
        console.log("this be your error brah" + error);
      });
  };

  //making whatever is typed in as current item
  onChange = event => {
    var newItem = this.state.curItem;
    newItem[event.target.name] = event.target.value;
    console.log(event.target);

    this.setState({ curItem: newItem });
  };
  onBlur = event => {
    var newItem = this.state.curItem;
    newItem[event.target.id] = event.target.value;
    console.log(event.target.id);

    this.setState({ curItem: newItem });
  };

  //filter to just wines that have the features ie certain grapes, area, etc
  // onSelect = event => {
  //   let value = event.target.value.toLowerCase();
  //   const id = event.target.id;

  //   // if(value==!null){
  //   //   return value.toLowerCase()
  //   // }
  //   const glasses = this.state.glasses;

  //   var grapes = glasses.filter(result => {
  //     if (value === "grapes") {
  //       return result.grapes === id;
  //     } else if (value === "grape") {
  //       return (
  //         result.grape1 === id || result.grape2 === id || result.grape3 === id
  //       );
  //     } else if (value === "vinyard") {
  //       return result.vinyard === id;
  //     } else if (value === "year") {
  //       return result.year === id;
  //     } else if (value === "place") {
  //       return result.place === id;
  //     } else if (value === "area") {
  //       return result.area === id;
  //     } else if (value === "country") {
  //       return result.country === id;
  //     } else if (value === "appellation") {
  //       return result.appellation === id;
  //     } else if (value === "place") {
  //       return result.place === id;
  //     } else if (value === "description") {
  //       return (
  //         result.description1 === id ||
  //         result.description2 === id ||
  //         result.description3 === id ||
  //         result.description4 === id ||
  //         result.description5 === id ||
  //         result.description6 === id ||
  //         result.description7 === id ||
  //         result.description8 === id ||
  //         result.description9 === id ||
  //         result.description10 === id
  //       );
  //     } else {
  //       return result.color === id;
  //     }
  //   });

  //   this.setState({ glasses: grapes });
  // };

  onClick = () => {
    this.setState(state => ({ showMyComponent: !this.state.showMyComponent }));
  };

  onClear = () => {
    const unFilteredWines1 = this.state.unFilteredWines;
    this.setState({ glasses: unFilteredWines1 });
  };
  onCurItemClear = () => {
    this.setState({ curItem: {} });
  };
  showAddForm = () => {
    this.setState(state => ({ addFormHidden: !this.state.addFormHidden }));
  };
  handleNextClick = () => {
    let curItem = this.state.curItem;
    const glasses = this.state.unFilteredWines;
    let index = glasses.indexOf(curItem);
    let nextIndex = index + 1;

    this.setState({ curItem: glasses[nextIndex] });
  };
  handlePrevClick = () => {
    let curItem = this.state.curItem;
    const glasses = this.state.unFilteredWines;
    let index = glasses.indexOf(curItem);
    let nextIndex = index - 1;
    this.setState({ curItem: glasses[nextIndex] });
  };
  editCardChange = () => {
    this.setState(state => ({ editCard: !this.state.editCard }));
  };

  ///render portion

  //
  //
  //
  //

  render() {
    return (
      <div className="App">
        <h1>Admin Mode</h1>
        {/* <FormTest handleSubmit={this.handleSubmit} /> */}
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
          onChange={this.onChange}
        />

        {/* 
          <AddEditForm
            handleSubmit={this.handleSubmit}
            curItem={this.state.curItem}
            onChange={this.onChange}
            handleDelete={this.handleDelete}
            onCurItemClear={this.onCurItemClear}
            handleNextClick={this.handleNextClick}
            handlePrevClick={this.handlePrevClick}
            glasses={this.state.glasses}
          /> */}
        <MobileBlocksData
          glasses={this.state.glasses}
          wines={this.state.filteredWines}
          onSelect={this.onSelect}
          onClear={this.onClear}
          curItem={this.state.curItem}
          mappedGlasses={this.state.mappedGlasses}
          handleSelect={this.handleSelect}
          editCardChange={this.editCardChange}
          editCard={this.state.editCard}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete}
          onCurItemClear={this.onCurItemClear}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

export default App;
