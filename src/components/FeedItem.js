import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import { withState } from "recompose";

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginTop: 10,
    marginBottom: 10
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginRight: 5,
    marginLeft: 5
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

const handleExpandClick = (expanded, setExpanded) => {
  setExpanded(!expanded);
};

const FeedItem = ({
  classes,
  avatarSrc,
  title,
  image,
  preview,
  content,
  subHeader,
  expanded,
  setExpanded
}) => (
  <div>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            className={classes.avatar}
            src={avatarSrc}
            imgProps={{ objectfit: "scale-down" }}
          />
        }
        title={title}
        subheader={subHeader}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography component="div">{expanded ? content : preview}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={() => handleExpandClick(expanded, setExpanded)}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
  </div>
);

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const withExpanded = withState("expanded", "setExpanded", false);

export default withExpanded(withStyles(styles)(FeedItem));
