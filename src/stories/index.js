import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";
import FeedItem from "../components/FeedItem";
import { CardMedia } from "@material-ui/core";

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

storiesOf("FeedItem", module).add("withoutProps", () => <FeedItem />);
storiesOf("FeedItem", module).add("withProps", () => (
  <FeedItem
    title="this is the title"
    image="download.jpeg"
    content="some content"
    avatarSrc="avatar.jpeg"
  />
));
storiesOf("CardMedia", module).add("component", () => (
  <CardMedia style={{ height: 300 }} image="download.jpeg" />
));
