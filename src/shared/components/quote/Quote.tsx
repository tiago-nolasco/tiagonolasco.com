import styles from "./Quote.module.scss";

import { Component } from "react";
import Container from "../container/Container";
import { ContainerSizeEnum } from "../container/model/ContainerSizeEnum";

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
              <div className={styles["__quote"]} dangerouslySetInnerHTML={{__html: this.props.quote}}></div>
              <div className={styles["__author"]}>{this.props.author}</div>
            </Container>
        </div>
      </div>
    )
  }
}
