import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";
import React from "react";

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
  avatar: {
    backgroundColor: red[500]
  }
});

const FeedItem = ({ classes, avatarSrc, title, image, content }) => (
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
        // title={title}
        title="September 14, 2016"
        // subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image={image}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography component="p">{content}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  </div>
);

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeedItem);
