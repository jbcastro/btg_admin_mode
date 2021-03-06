import React, { useState } from "react";
import useStyles from "./UseStyles";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DynamicGrapes from "./DynamicGrapes";
import DynamicDescription from "./DynamicDescription";
import { Form, Text, TextArea, Checkbox, Select, Option } from "informed";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

const MobileBlocks = ({
  data,
  onSelect,
  hideRemoved,
  handleSelect,

  handleUpdate,
  handleDelete,
  onCurEditItemClear,
  props,
  onBlur,
  disableOtherEdits,
  setDisableOtherEdits,
}) => {
  const checkStatus = (status) => {
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

  function coravinCheck(coravin) {
    if (coravin === true) {
      return "coravin";
    } else {
      return "non-coravin";
    }
  }
  let aOrAn = (mise) => {
    let upperMise = mise.toUpperCase();
    if (upperMise == "AP") {
      return "an";
    } else {
      return "a";
    }
  };

  let fullGlassName = (mise) => {
    let upperMise = mise.toUpperCase();
    if (upperMise == "BURG") {
      return "Burgundy";
    } else if (upperMise == "BDX") {
      return "Bordeaux";
    } else if (upperMise == "KRUG") {
      return "Krug Flute";
    } else {
      return mise;
    }
  };

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
    setExpanded((prevState) => true);
  };
  const handleSelect2 = (data) => {
    handleEdit();
    handleSelect(data._id);
    setDisableOtherEdits();
  };
  const handleSave = (event) => {
    handleUpdate(event);
    setDisabledSave((prevState) => true);
  };
  const closeIt = () => {
    handleEdit();
    onCurEditItemClear();
    setDisableOtherEdits();
    setDisabledSave((prevState) => true);
    setExpanded((prevState) => false);
  };
  const onBlurValidate = (event) => {
    onBlur(event);
    setDisabledSave((prevState) => false);
  };
  const dynamicBlurValidate = () => {
    setDisabledSave((prevState) => false);
  };
  const handleDelete2 = (data) => {
    handleDelete(data);
    setDisableOtherEdits();
  };
  const style = {
    fontSize: "15px",
  };

  return (
    <Card className={checkStatus(data.status)} key={data._id} raised>
      <CardHeader subheader={data.name} />

      <span>
        {disableOtherEdits ? (
          ""
        ) : (
          <button type="button" onClick={() => handleSelect2(data)}>
            Edit it
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
              onClick={(e) => handleDelete2(data)}
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
                description: data.description,
              }}
            >
              <div>
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
                    onClick={(e) => {
                      if (
                        window.confirm(
                          "Are you sure? Any edits will not be saved..."
                        )
                      )
                        closeIt();
                    }}
                  >
                    Cancel
                  </button>
                )}

                <label>
                  <p class="hidden">
                    <font size="1">id:</font>
                    <Text
                      className={classes.text}
                      field="_id"
                      disabled={true}
                      initialValue={data._id}
                    ></Text>
                  </p>
                </label>

                <label>
                  <br></br>
                  <font size="1">Name:</font>
                  <Text
                    className={classes.text}
                    field="name"
                    initialValue={data.name}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Vinyard:</font>
                  <Text
                    className={classes.text}
                    field="vinyard"
                    initialValue={data.vinyard}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>

                <label>
                  <br></br>
                  <font size="1">All Grapes:</font>
                  <Text
                    className={classes.text}
                    field="grapes"
                    initialValue={data.grapes}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>

                <p class="border">
                  Individual Grapes<br></br>
                  <DynamicGrapes onBlur={dynamicBlurValidate} data={data} />
                </p>
                <p class="border">
                  Descriptions
                  <DynamicDescription
                    onBlur={dynamicBlurValidate}
                    data={data}
                  />
                </p>
                <label>
                  <font size="1">Year:</font>
                  <Text
                    className={classes.text}
                    field="year"
                    initialValue={data.year}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Place:</font>
                  <Text
                    className={classes.text}
                    field="place"
                    initialValue={data.place}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Area:</font>
                  <Text
                    className={classes.text}
                    field="area"
                    initialValue={data.area}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Country:</font>
                  <Text
                    className={classes.text}
                    field="country"
                    initialValue={data.country}
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Appellation:</font>
                  <Text
                    className={classes.text}
                    field="appellation"
                    initialValue={data.appellation}
                    onBlur={(event) => onBlurValidate(event)}
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
                    onBlur={(event) => onBlurValidate(event)}
                  ></Text>
                </label>
                <br></br>
                <label>
                  <font size="1">Coravin:</font>
                  <Checkbox
                    field="coravin"
                    initialValue={data.coravin}
                    onChange={(event) => onBlurValidate(event)}
                  ></Checkbox>
                </label>
                <br></br>
                <label>
                  <font size="1">Status:</font>
                  <Select
                    field="status"
                    initialValue={data.status}
                    onChange={(event) => onBlurValidate(event)}
                  >
                    <Option value="none">None</Option>
                    <Option value="added">Added</Option>
                    <Option value="removed">Removed</Option>
                    <Option value="hidden">Hidden</Option>
                  </Select>
                </label>
                <br></br>
                <label>
                  <font size="1">Mise:</font>
                  <Select
                    field="mise"
                    initialValue={data.mise}
                    onChange={(event) => onBlurValidate(event)}
                  >
                    <Option value="AP">AP</Option>
                    <Option value="BURG">Burgundy</Option>
                    <Option value="BDX">Bordeaux</Option>
                    <Option value="Flute">Flute</Option>
                    <Option value="DW">DW</Option>
                    <Option value="KRUG">Krug Flute</Option>
                  </Select>
                </label>
                <br></br>
                <label>
                  <font size="1">Color:</font>

                  <Select
                    field="color"
                    initialValue={data.color}
                    onChange={(event) => onBlurValidate(event)}
                  >
                    <Option value="red">Red</Option>
                    <Option value="white">White</Option>
                    <Option value="dessert">Dessert</Option>
                    <Option value="sparkling">Sparkling</Option>
                  </Select>
                </label>
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
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
                        onBlur={(event) => onBlurValidate(event)}
                      ></TextArea>
                    </label>
                  </CardContent>
                </Collapse>
              </div>
            </Form>
          </span>
        ) : (
          <span>
            <Typography style={style}>
              A {""}
              {coravinCheck(data.coravin)} {data.year} {data.grapes} by{" "}
              {data.vinyard} from {data.place} {data.area} in {""}
              {data.country} served in {aOrAn(data.mise)}{" "}
              {fullGlassName(data.mise)} for ${data.price}
              <br></br>
            Status: {data.status} <br></br>Appellation: {data.appellation}{" "}
              <br></br>
              Color: {data.color}
              <br></br>
              {data.grape.map((result, index) => (
                <li key={index}>
                  {" "}
                  Grape {index + 1}: {result}
                </li>
              ))}
              {data.description.map((result, index) => (
                <li key={index}>
                  {" "}
                  Desc {index + 1}: {result}
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
                  [classes.expandOpen]: expanded,
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
                <Typography style={style}>Fun Fact: {data.funfact}</Typography>
              </CardContent>
            </Collapse>
          </span>
        )}
      </span>
    </Card>
  );
};

export default MobileBlocks;
