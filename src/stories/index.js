import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import FeedItem from "../components/FeedItem";
import { CardMedia } from "@material-ui/core";
import imageFile from "./static/download.jpeg";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf("FeedItem", module).add("component", () => <FeedItem />);
storiesOf("CardMedia", module).add("component", () => (
  <CardMedia img={imageFile} />
));

storiesOf("<img />", module).add("with an image", () => (
  <img src={imageFile} />
));
