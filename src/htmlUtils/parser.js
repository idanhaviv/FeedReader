import React from "react";
import ReactHtmlParser from "react-html-parser";

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
    reactElements[0] && reactElements[0].type === "figure" ? reactElements.slice(1) : reactElements;
  const styledComponents = fixImagesStyling(withoutFirstFigureElement);
  return styledComponents;
};

export {
  extractPreviewImageSrc,
  extractPreviewText,
  getPublishDate,
  extractContents
};
