import FeedItem from "./FeedItem";
import React from "react";
import {
  extractPreviewImageSrc,
  getPublishDate,
  extractContents
} from "../htmlUtils/parser";

export default ({ feed, avatar }) =>
  feed && feed.feedItems
    ? feed.feedItems.map((item, index) => (
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
      ))
    : null;
