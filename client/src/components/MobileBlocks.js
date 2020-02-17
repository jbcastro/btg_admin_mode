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
    overflow: "hidden"
    // display: "none"
  },
  ButtonBase: {
    color: "blue"
  },
  buttonHidden: {
    backgroundColor: "yellow"
  },
  // text: {
  //   // display: "none"
  // },
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
  const [editEnable, setEdit] = React.useState(false);
  // const [editEnable2, setEdit2] = React.useState(t);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelButton = () => {
    setDeleteButton(!deleteButtonEnable);
  };
  const handleEdit = () => {
    setEdit(!editEnable);
  };

  return (
    <Card className={checkStatus(data.status)} key={data._id} raised>
      <CardHeader title={data.name} />

      <span>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>

        {editEnable ? (
          <span>
            <button
              type="button"
              hidden={!deleteButtonEnable}
              onClick={handleDelButton}
            >
              Delete?
            </button>

            <button
              type="button"
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
              onSubmit={handleUpdate}
            >
              <div>
                <button type="submit">Save</button>
                <button type="button" onClick={handleEdit}>
                  Close
                </button>
                <label>
                  <br></br>
                  <font size="1">Name:</font>
                  <Text
                    className={classes.text}
                    field="name"
                    initialValue={data.name}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Vinyard:</font>
                  <Text
                    className={classes.text}
                    field="vinyard"
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
                    initialValue={data.grapes}
                  ></Text>
                </label>
                <br></br>

                {/* start of grapes */}

                <DynamicGrapes />
                <DynamicDescription />
                {/* end of grapes */}
                <label>
                  <font size="1">Year:</font>
                  <Text
                    className={classes.text}
                    field="year"
                    type="number"
                    initialValue={data.year}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Place:</font>
                  <Text
                    className={classes.text}
                    field="place"
                    initialValue={data.place}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Area:</font>
                  <Text
                    className={classes.text}
                    field="area"
                    initialValue={data.area}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Country:</font>
                  <Text
                    className={classes.text}
                    field="country"
                    initialValue={data.country}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Appellation:</font>
                  <Text
                    className={classes.text}
                    field="appellation"
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
