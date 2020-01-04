import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ButtonBase from "@material-ui/core/ButtonBase";
import CardMedia from "@material-ui/core/CardMedia";
import { string } from "prop-types";
import { PromiseProvider } from "mongoose";
import DynamicGrapes from "./DynamicGrapes";
import DynamicDescription from "./DynamicDescription";
import {
  Form,
  Text,
  TextArea,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  Option,
  Scope,
  useFormState,
  useArrayField
} from "informed";
import { Button, createMuiTheme, Hidden } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

// import MobileBar from "./MobileBar";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },

  input: {
    display: "none"
  },
  card: {
    maxWidth: 345,
    display: "inline-block",
    minHeight: 436,
    overflow: "hidden"
  },
  cardAdded: {
    maxWidth: 345,
    backgroundColor: "#E6E6FA",
    display: "inline-block",
    minHeight: 436,
    overflow: "hidden"
  },
  cardRemoved: {
    maxWidth: 345,
    backgroundColor: "#FFA07A",
    display: "inline-block",
    minHeight: 436,
    overflow: "hidden"
  },

  cardHidden: {
    maxWidth: 345,
    backgroundColor: "yellow",
    display: "inline-block",
    minHeight: 436,
    overflow: "hidden",
    display: "none"
  },
  ButtonBase: {
    color: "blue"
  },
  buttonHidden: {
    backgroundColor: "yellow"
  },
  text: {
    // display: "none"
  },
  AvatarButton: {
    fontSize: "1em"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatarRed: {
    backgroundColor: red[500]
  },
  avatarWhite: {
    backgroundColor: "black"
  },
  avatarDessert: {
    backgroundColor: "yellow",
    color: "black"
  },
  avatarCorovan: {
    backgroundColor: "green"
  },
  avatarSparkling: {
    backgroundColor: "blue"
  },

  lister: {
    display: "inline"
    // list-style-type: "circle"
  },
  paragraph: {
    clear: "both"
  }
}));

const MobileBlocks = ({
  data,
  onSelect,
  hideRemoved,
  handleSelect,
  editCardChange,
  editCard,
  curItem,
  onChange,
  handleSubmit,
  handleUpdate,
  handleDelete,
  onCurItemClear
}) => {
  // butt = data;
  // const onSelect = props.onSelect;

  const grapes = "grapes";
  const year = "year";
  const place = "place";
  const area = "area";
  const country = "country";
  const appellation = "appellation";
  const grape = "grape";
  // const description = "description";
  const vinyard = "vinyard";
  const color = "color";
  const mise = "mise";
  const coravin = "coravin";
  const grapezz = "grape";
  const [disabled, setDisabled] = useState(true);

  const upperCaseFirstLetter = str =>
    str.replace(/\b[a-z]/g, char => char.toUpperCase());

  const upperCaseFirstLetterForColor = color => {
    if (color == !null) {
      var str = color.charAt(0);

      return str.toUpperCase();
    }

    //check to see if needed in admin mode
  };

  const checkStatus = status => {
    if (status === "added") {
      return classes.cardAdded;
    } else if (status === "removed" && !hideRemoved) {
      return classes.cardRemoved;
    } else if (status === "removed" && hideRemoved) {
      return classes.cardHidden;
    } else if (status === "hidden") {
      return classes.cardHidden;
    } else {
      return classes.card;
    }
  };
  const colorz = color => {
    if (color === "red") {
      return classes.avatarRed;
    } else if (color === "white") {
      return classes.avatarWhite;
    } else if (color === "dessert") {
      return classes.avatarDessert;
    } else if (color === "corovan") {
      return classes.avatarCorovan;
    } else {
      return classes.avatarSparkling;
    }
  };

  function changeCardStuff() {
    if (!editCard) {
      return classes.ButtonBase;
    } else {
      return classes.buttonHidden;
    }
  }

  // function descGrapeList(list) {
  //   const listResult = list.map((result, index) => (
  //     <li key={index}>{result}</li>
  //   ));
  //   return <ul>{listResult}</ul>;
  // }

  function checkIfNull(data) {
    if (data != null) {
      return data;
    } else {
      return;
    }
  }
  //span
  let curItemId = curItem._id;

  function checkIfCurItem(id) {
    if (curItemId === id) {
      return true;
    }
  }
  // const grapeArray1 = result => {
  //   result.map(res => {
  //     return res[0];
  //   });
  // };

  // function grapeArray(data, num) {
  //   data.map(num => {
  //     return data[num];
  //   });
  // }
  //to get the subheader as a button
  let vinyard2;
  function vinny(vinyard1) {
    if (vinyard1 === string) {
      vinyard2 = vinyard1.toUpperCase();
    }
    return (
      <ButtonBase
        className={classes.ButtonBase}
        id={vinyard}
        value={vinyard2}
        onClick={event => onSelect(event)}
      >
        {vinyard1}
      </ButtonBase>
    );
  }
  // function editStuff() {
  //   if (!editCard) {
  //     {
  //       ButtonBase;
  //     }
  //   } else {
  //     console.log("hey");
  //   }
  // }

  function coravinCheck(coravin) {
    if (coravin === true) {
      return "coravin";
    } else {
      return "non-coravin";
    }
  }

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [deleteButtonEnable, setDeleteButton] = React.useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelButton = () => {
    setDeleteButton(!deleteButtonEnable);
  };
  // const Grapes = () => {
  //   const { add, fields } = useArrayField({ field: "grape" });
  //   return (
  //     <React.Fragment>
  //       <button onClick={add} type="button">
  //         Add Grape
  //       </button>
  //       {fields.map(({ field, key, remove }, i) => (
  //         <label key={key}>
  //           <p></p>
  //           Grape {i}:
  //           <Text field={field} />
  //           <button type="button" onClick={remove}>
  //             Remove
  //           </button>
  //         </label>
  //       ))}
  //     </React.Fragment>
  //   );
  // };
  // const ComponentUsingFormState = () => {
  //   const formState = useFormState();

  //   return (
  //     <div>
  //       <ButtonBase
  //         className={classes.ButtonBase}
  //         onClick={e => handleUpdate(formState.values)}
  //       >
  //         Save
  //       </ButtonBase>
  //     </div>
  //   );
  // };

  return (
    <Card className={checkStatus(data.status)} key={data._id} raised>
      <CardHeader title={data.name} />

      <span>
        {checkIfCurItem(data._id) ? (
          //   <span>
          //     <form>
          //       Name:<input type="text" name="name"  value={data.name}></input>
          //       Grape1:<input type="text" name="grape[0]"  value={data.grape[0]}></input>
          //       Grape2:<input type="text" name="grape[1]"  value={data.grape[1]}></input>
          //       Grape3:<input type="text" name="grape[2]"  value={data.grape[2]}></input>
          //       Grape4:<input type="text" name="grape[3]"  value={data.grape[3]}></input>
          //       </form>
          //       <button onClick={e=>handleSubmit(e)}></button>
          //  </span>
          <span>
            <button hidden={!deleteButtonEnable} onClick={handleDelButton}>
              Delete?
            </button>
            <button
              id="button2"
              hidden={deleteButtonEnable}
              onClick={e => handleDelete(data)}
            >
              Are you Sure You Want to Delete?
            </button>
            <br></br>
            <br></br>

            <Form
              id="form-api-form"
              initialValues={{
                grape: data.grape,
                description: data.description
              }}
              onSubmit={values => {
                handleUpdate(values);
              }}
            >
              <div>
                <button type="submit">submit</button>
                <label>
                  <font size="1">Name:</font>
                  <Text
                    className={classes.text}
                    field="name"
                    // disabled={editCard}
                    initialValue={data.name}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Vinyard:</font>
                  <Text
                    className={classes.text}
                    field="vinyard"
                    // disabled={editCard}
                    initialValue={data.vinyard}
                  ></Text>
                </label>

                <label>
                  <font size="1">id:</font>
                  <Text
                    className={classes.text}
                    field="_id"
                    disabled={true}
                    initialValue={data._id}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Grapes:</font>
                  <Text
                    className={classes.text}
                    field="grapes"
                    // disabled={editCard}
                    initialValue={checkIfNull(data.grapes)}
                  ></Text>
                </label>
                <br></br>

                {/* start of grapes */}

                <DynamicGrapes />

                {/* {data.grape.map(({ field, key }, i, result) => (
                    <label key={key}>
                      <br></br> Grape {i}:
                      <Text
                        multiple={true}
                        field={grapezz[i]}
                        className={classes.text}
                        initialValue={result[i]}
                      />
                    </label>
                  ))} */}

                {/* <label>
                    <font size="1">Indiv Grape1:</font>
                    <Text
                      className={classes.text}
                      field="grape[0]"
                      // disabled={editCard}
                      initialValue={checkIfNull(data.grape[0])}
                      //
                    ></Text>
                  </label>

                  <br></br>
                  <label>
                    <font size="1">Indiv Grape2:</font>
                    <Text
                      className={classes.text}
                      field="grape[1]"
                      // disabled={editCard}
                      initialValue={checkIfNull(data.grape[1])}
                    ></Text>
                  </label>
                  <br></br>
                  <label>
                    <font size="1">Indiv Grape3:</font>
                    <Text
                      className={classes.text}
                      field="grape[2]"
                      // disabled={editCard}
                      initialValue={checkIfNull(data.grape[2])}
                    ></Text>
                  </label>
                  <br></br>
                  <label>
                    <font size="1">Indiv Grape4:</font>
                    <Text
                      className={classes.text}
                      field="grape[3]"
                      // disabled={editCard}
                      initialValue={checkIfNull(data.grape[3])}
                    ></Text>
                  </label>
                  <br></br> */}

                {/* end of grapes */}
                <label>
                  <font size="1">Year:</font>
                  <Text
                    className={classes.text}
                    field="year"
                    type="number"
                    // disabled={editCard}
                    initialValue={data.year}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Place:</font>
                  <Text
                    className={classes.text}
                    field="place"
                    // disabled={editCard}
                    initialValue={data.place}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Area:</font>
                  <Text
                    className={classes.text}
                    field="area"
                    // disabled={editCard}
                    initialValue={data.area}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Country:</font>
                  <Text
                    className={classes.text}
                    field="country"
                    // disabled={editCard}
                    initialValue={data.country}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Appellation:</font>
                  <Text
                    className={classes.text}
                    field="appellation"
                    // disabled={editCard}
                    initialValue={data.appellation}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Price:</font>
                  <Text
                    className={classes.text}
                    field="price"
                    type="number"
                    // disabled={editCard}
                    initialValue={data.price}
                  ></Text>
                </label>

                <br></br>
                <label>
                  Status:
                  <Select field="status">
                    <Option value="">{data.status}</Option>
                    <Option value="none">None</Option>
                    <Option value="added">Added</Option>
                    <Option value="removed">Removed</Option>
                    <Option value="hidden">Hidden</Option>
                  </Select>
                </label>
                <br></br>
                <label>
                  Mise:
                  <Select field="mise">
                    <Option value="">{data.mise}</Option>
                    <Option value="ap">AP</Option>
                    <Option value="burg">BURG</Option>
                    <Option value="dbx">BDX</Option>
                    <Option value="flute">Flute</Option>
                    <Option value="dw ">DW</Option>
                    <Option value="krug">Krug Flute</Option>
                  </Select>
                </label>
                <DynamicDescription />
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <br></br>
                    <label>
                      <font size="1">Fun Fact:</font>
                      <TextArea
                        className={classes.text}
                        field="funfact"
                        // disabled={editCard}
                        initialValue={data.funfact}
                      ></TextArea>
                    </label>
                  </CardContent>
                </Collapse>
              </div>
            </Form>
          </span>
        ) : (
          <span>
            <button id={data._id} onClick={event => handleSelect(event)}>
              Edit
            </button>

            <Typography variant="body2" color="textSecondary" component="p">
              A {""}
              {coravinCheck(data.coravin)} {data.year} {data.grapes} by{" "}
              {data.vinyard} from {data.place} {data.area} in {""}
              {data.country} served in a {data.mise} for ${data.price}
              <br></br>
              Status: {data.status} <br></br>Appellation: {data.appellation}{" "}
              <br></br>
              {data.grape.map((result, index) => (
                <li key={index}>
                  {" "}
                  Grape{index + 1}: {result}
                </li>
              ))}
            </Typography>
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {data.description.map((result, index) => (
                  <li key={index}>
                    {" "}
                    Desc{index + 1}: {result} ||
                  </li>
                ))}

                <Typography paragraph className={classes.paragraph}>
                  Fun Fact: {data.funfact}
                </Typography>
              </CardContent>
            </Collapse>
          </span>
        )}
      </span>
    </Card>
  );
};

export default MobileBlocks;

// {/*
//       for images */}
//       {/* {/* <CardMedia
//         className={classes.media}
//         image={`https://josephbeckcastro.com/site4/images/${data.picture}.jpg`}
//         title={data.name} */}
//       /> */}

// A {""}
// <ButtonBase
//   className={changeCardStuff()}
//   id={coravin}
//   onClick={event => onSelect(event)}
//   value={data.coravin}
// >
//   {coravinCheck(data.coravin)}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.year}
//   id={year}
//   onClick={event => onSelect(event)}
// >
//   {data.year}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   component="button"
//   value={data.grapes}
//   id={grapes}
//   onClick={event => onSelect(event)}
// >
//   {data.grapes}
// </ButtonBase>{" "}
// from{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.place}
//   id={place}
//   onClick={event => onSelect(event)}
// >
//   {data.place}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.area}
//   id={area}
//   onClick={event => onSelect(event)}
// >
//   {data.area}
// </ButtonBase>{" "}
// in {""}
// {/* <TextField
//   multiline
//   label="Country"
//   type="text"
//   name="country"
//   placeholder="Country"
//   onBlur={onChange}
//   defaultValue={data.country}
//   margin="normal"
// />{" "} */}
// served in a{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.mise}
//   id={mise}
//   onClick={event => onSelect(event)}
// >
//   {data.mise}
// </ButtonBase>{" "}
// for ${data.price}
// </Typography>
// {/* start grapes */}
// <Typography paragraph>
// Grapes:{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.grape[0]}
//   id={grape}
//   onClick={event => onSelect(event)}
// >
//   {data.grape[0]}
// </ButtonBase>
// {"  "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.grape[1]}
//   id={grape}
//   onClick={event => onSelect(event)}
// >
//   {data.grape[1]}
// </ButtonBase>
// {"  "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.grape[2]}
//   id={grape}
//   onClick={event => onSelect(event)}
// >
//   {data.grape[2]}
// </ButtonBase>
// </Typography>

// {/* end grapes */}
// <Typography paragraph>
// description:{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description[2]}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description[2]}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description[3]}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description[3]}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description2}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description2}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description3}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description3}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description4}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description4}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description5}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description5}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description6}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description6}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description7}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description7}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description8}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description8}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description9}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description9}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description10}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description10}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description11}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description11}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description12}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description12}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description13}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description13}
// </ButtonBase>{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.description14}
//   id={description}
//   onClick={event => onSelect(event)}
// >
//   {data.description14}
// </ButtonBase>
// </Typography>
// <Typography paragraph>
// Appellation:{" "}
// <ButtonBase
//   className={classes.ButtonBase}
//   value={data.appellation}
//   id={appellation}
//   onClick={event => onSelect(event)}
// >
//   {data.appellation}
// </ButtonBase>
