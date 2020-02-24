import React, { useState } from "react";
import useStyles from "./UseStyles";
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
import EditForm from "./EditForm";

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
  useArrayField,
  ArrayField,
  useFormApi
} from "informed";
import { Button, createMuiTheme, Hidden } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

// import MobileBar from "./MobileBar";

const MobileBlocks = ({
  data,
  onSelect,
  hideRemoved,
  handleSelect,
  editCardChange,
  editCard,
  curItem,
  curEditItem,
  unEditedItem,
  onChange,
  handleSubmit,
  handleUpdate,
  handleDelete,
  onCurItemClear,
  props,
  onBlur,
  disableOtherEdits,
  setDisableOtherEdits
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

  function checkIfNull(data) {
    if (data != null) {
      return data;
    } else {
      return;
    }
  }
  //span
  let curEditItemId = curEditItem._id;

  function checkIfcurEditItem(id) {
    if (curEditItemId === id) {
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
  const [disableSave, setDisabledSave] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDelButton = () => {
    setDeleteButton(!deleteButtonEnable);
  };
  const handleEdit = () => {
    setEdit(!editEnable);
  };
  const handleSelect2 = data => {
    handleEdit();
    handleSelect(data._id);
    setDisableOtherEdits();
  };

  // const touchedLength = obj => {
  //   if (Object.keys(obj).length > 0) {
  //     setDisabledSave(!disableSave);
  //   }
  // };
  const handleSave = event => {
    handleUpdate(event);
    setDisabledSave(prevState => true);
  };

  const closeIt = () => {
    handleEdit();
    onCurItemClear();
    setDisableOtherEdits();
  };
  const cancelIt = () => {
    handleEdit();
    onCurItemClear();
    setDisableOtherEdits();
  };

  const onBlurValidate = event => {
    onBlur(event);
    setDisabledSave(prevState => false);
    console.log(event.target);
  };
  const dynamicBlurValidate = () => {
    setDisabledSave(prevState => false);
  };

  return (
    <Card className={checkStatus(data.status)} key={data._id} raised>
      <CardHeader title={data.name} />

      <span>
        {disableOtherEdits ? (
          ""
        ) : (
          <button type="button" onClick={() => handleSelect2(data)}>
            Edit it brah
          </button>
        )}

        {editEnable ? (
          <span>
            <button
              type="button"
              hidden={!deleteButtonEnable}
              onClick={handleDelButton}
            >
              Delete?
            </button>
            <br></br>

            <button
              type="button"
              id="button2"
              hidden={deleteButtonEnable}
              onClick={e => handleDelete(data)}
            >
              Are you Sure You Want to Delete?
            </button>
            <br></br>
            {disableSave ? "" : "DATA IS UNSAVED"}
            <br></br>
            <Form
              id="form-api-form"
              onSubmit={handleSave}
              initialValues={{
                grape: data.grape,
                description: data.description
              }}
              // onChange={formState => touchedLength(formState.touched)}
            >
              <div>
                {/* <code>{JSON.stringify(formState.touched)}</code> */}
                <button type="submit" disabled={disableSave}>
                  Save
                </button>
                {disableSave ? (
                  <button type="button" onClick={closeIt}>
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={e => {
                      if (
                        window.confirm(
                          "Are you sure you wish to not save this item?"
                        )
                      )
                        closeIt();
                    }}
                  >
                    Cancel
                  </button>
                )}

                <label>
                  <br></br>
                  <font size="1">Name:</font>
                  <Text
                    className={classes.text}
                    field="name"
                    initialValue={data.name}
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Vinyard:</font>
                  <Text
                    className={classes.text}
                    field="vinyard"
                    initialValue={data.vinyard}
                    onBlur={event => onBlurValidate(event)}
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
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                {/* start of grapes */}
                <DynamicGrapes onBlur={dynamicBlurValidate} data={data} />
                {/* {DynamicDescription} */}
                <DynamicDescription onBlur={dynamicBlurValidate} data={data} />
                {/* end of grapes */}
                <label>
                  <font size="1">Year:</font>
                  <Text
                    className={classes.text}
                    field="year"
                    type="number"
                    initialValue={data.year}
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Place:</font>
                  <Text
                    className={classes.text}
                    field="place"
                    initialValue={data.place}
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Area:</font>
                  <Text
                    className={classes.text}
                    field="area"
                    initialValue={data.area}
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Country:</font>
                  <Text
                    className={classes.text}
                    field="country"
                    initialValue={data.country}
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Appellation:</font>
                  <Text
                    className={classes.text}
                    field="appellation"
                    initialValue={data.appellation}
                    onBlur={event => onBlurValidate(event)}
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
                    onBlur={event => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  Status:
                  <Select
                    field="status"
                    initialValue={data.status}
                    onBlur={event => onBlurValidate(event)}
                  >
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
                  <Select
                    field="mise"
                    initialValue={data.mise}
                    onBlur={event => onBlurValidate(event)}
                  >
                    <Option value="">{data.mise}</Option>
                    <Option value="ap">AP</Option>
                    <Option value="burg">BURG</Option>
                    <Option value="dbx">BDX</Option>
                    <Option value="flute">Flute</Option>
                    <Option value="dw ">DW</Option>
                    <Option value="krug">Krug Flute</Option>
                  </Select>
                </label>
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
                        onBlur={event => onBlurValidate(event)}
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
              {data.description.map((result, index) => (
                <li key={index}>
                  {" "}
                  Desc{index + 1}: {result} ||
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
