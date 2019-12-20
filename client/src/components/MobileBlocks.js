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
  useFormState
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
    listStyleType: "none"
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
  handleUpdate
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
  const description = "description";
  const vinyard = "vinyard";
  const color = "color";
  const mise = "mise";
  const coravin = "coravin";
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
  const descList = zzzz => {
    const butter = zzzz.map((result, index) => <li key={index}>{result}</li>);
    return <ul className={classes.lister}>{butter}</ul>;
  };

  //span
  let curItemId = curItem._id;

  function checkIfCurItem(id) {
    if (curItemId === id) {
      return true;
    }
  }

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={checkStatus(data.status)} key={data._id} raised>
      <CardHeader title={data.name} />

      <span>
        {checkIfCurItem(data._id) ? (
          <span>
            <ButtonBase
              className={classes.ButtonBase}
              id={data._id}
              onClick={() => handleUpdate()}
            >
              Save
            </ButtonBase>
            <p></p>
            <label>
              <font size="1">Name:</font>
              <Text
                className={classes.text}
                field="name"
                // disabled={editCard}
                initialValue={data.name}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Vinyard:</font>
              <Text
                className={classes.text}
                field="vinyard"
                // disabled={editCard}
                initialValue={data.vinyard}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Grapes:</font>
              <Text
                className={classes.text}
                field="grapes"
                // disabled={editCard}
                initialValue={data.grapes}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Indiv Grape1:</font>
              <Text
                className={classes.text}
                field="grape[0]"
                // disabled={editCard}
                initialValue={data.grape[0]}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Indiv Grape2:</font>
              <Text
                className={classes.text}
                field="grape[0]"
                // disabled={editCard}
                initialValue={data.grape[1]}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Indiv Grape3:</font>
              <Text
                className={classes.text}
                field="grape[0]"
                // disabled={editCard}
                initialValue={data.grape[2]}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              <font size="1">Indiv Grape4:</font>
              <Text
                className={classes.text}
                field="grape[0]"
                // disabled={editCard}
                initialValue={data.grape[3]}
                onChange={onChange}
              ></Text>
            </label>
            <p></p>
            <label>
              Status:
              <Select field="status" onChange={onChange}>
                <Option value="">{data.status}</Option>
                <Option value="none">None</Option>
                <Option value="added">Added</Option>
                <Option value="removed">Removed</Option>
                <Option value="hidden">Hidden</Option>
              </Select>
            </label>
          </span>
        ) : (
          <span>
            <ButtonBase
              className={classes.ButtonBase}
              id={data._id}
              onClick={event => handleSelect(event)}
            >
              Edit
            </ButtonBase>

            <Typography variant="body2" color="textSecondary" component="p">
              A {""}
              {coravinCheck(data.coravin)} {data.year} {data.grapes} from{" "}
              {data.place} {data.area} in {""}
              {data.country} served in a {data.mise} for ${data.price}
              {data.status} {data.appellation}
              Grapes:{data.grape[0]} {data.grape[1]} {data.grape[2]}{" "}
              {data.grape[3]}
              <span className={classes.lister}>
                Desc: {descList(data.description)}
              </span>
            </Typography>
          </span>
        )}
      </span>
      {/* span end */}
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
          <Typography paragraph>Fun Fact: {data.funfact}</Typography>
        </CardContent>
      </Collapse>
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
