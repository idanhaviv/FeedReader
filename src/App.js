import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { compose, withProps, withState } from "recompose";
import "./App.css";
import FeedItem from "./components/FeedItem";
import { getFeed } from "./api/feedApi";

const withSearchTerm = withState("searchTerm", "setSearchTerm", "@idanhaviv");
const withFeed = withState("feed", "setFeed", []);

const extractPreviewImageSrc = (htmlText, defaultImageSrc) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlText, "text/html");
  const images = dom.getElementsByTagName("img");
  const imageSrc =
    images && images.length > 0
      ? images[0].getAttribute("src")
      : defaultImageSrc;
  return imageSrc;
};

const withAvatar = withProps(({ feed }) => {
  const avatar =
    feed.avatar && feed.avatar.length > 0
      ? feed.avatar[0].url[0]
      : "./avatar.jpeg";
  return { avatar };
});

const extractPreviewText = htmlText => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(htmlText, "text/html");
  const paragraphs = dom.getElementsByTagName("p");
  const firstParagraph =
    paragraphs && paragraphs.length > 0 ? paragraphs[0] : "";
  const text = firstParagraph.textContent;
  return text;
};

const getPublishDate = htmlText => {
  const dateString = htmlText["pubDate"];
  const date = new Date(dateString);
  const formattedDate = date.toDateString();
  return formattedDate;
};

const fixImagesStyling = components => {
  const styledComponents = components.map(component => {
    if (component.type !== "figure") {
      return component;
    }

    const styledChildComponents = React.Children.map(
      component.props.children,
      child => {
        if (child.type !== "img") {
          return child;
        }
        const styledImageChildComponent = React.cloneElement(child, {
          style: { maxHeight: "100%", maxWidth: "100%" }
        });
        return styledImageChildComponent;
      }
    );
    return <component {...component.props}> {styledChildComponents}</component>;
  });
  return styledComponents;
};

const extractContents = htmlText => {
  const reactElements = ReactHtmlParser(htmlText);

  const withoutFirstFigureElement =
    reactElements[0].type === "figure" ? reactElements.slice(1) : reactElements;
  const styledComponents = fixImagesStyling(withoutFirstFigureElement);
  return styledComponents;
};

const App = ({ searchTerm, setSearchTerm, feed, setFeed, avatar }) => (
  <div
    className="App"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
    <TextField
      id="name"
      label="Feed Name"
      className={"abc"}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      margin="normal"
      InputLabelProps={{ required: true }}
    />
    <Button
      variant="contained"
      color="primary"
      className={"classes.button"}
      onClick={() => getFeed(searchTerm, setFeed)}
    >
      Get Feed
    </Button>
    {feed &&
      feed.feedItems &&
      feed.feedItems.map((item, index) => (
        // <div
        //   key={index}
        //   dangerouslySetInnerHTML={createMarkup(item["content:encoded"])}
        // />
        <FeedItem
          key={index}
          title={item.title[0]}
          content={extractContents(item["content:encoded"])}
          avatarSrc={avatar}
          image={extractPreviewImageSrc(
            item["content:encoded"],
            "./download.jpeg"
          )}
          subHeader={getPublishDate(item)}
        />
      ))}
  </div>
);

const enhanced = compose(
  withSearchTerm,
  withFeed,
  withAvatar
  // logProp("feed")
);
export default enhanced(App);
