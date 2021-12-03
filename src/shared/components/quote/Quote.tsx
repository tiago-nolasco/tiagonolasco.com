import styles from "./Quote.module.scss";

import { Component } from "react";
import Container from "../container/Container";
import { ContainerSizeEnum } from "../container/model/ContainerSizeEnum";
import HtmlText from "../htmlText/HtmlText";

interface IQuoteProps {
  quote: string;
  author: string;
}

export default class Quote extends Component<IQuoteProps> {
  render() {
    return (
      <div className={styles["quote-component"]}>
        <div className={styles["__background"]}>
          <Container
            className={styles["__container"]}
            size={ContainerSizeEnum.SMALL}
            topsOffset
            sidesOffset>
              <HtmlText className={styles["__quote"]} text={this.props.quote}></HtmlText>
              <div className={styles["__author"]}>{this.props.author}</div>
            </Container>
        </div>
      </div>
    )
  }
}
