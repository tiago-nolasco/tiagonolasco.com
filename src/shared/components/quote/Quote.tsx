import styles from "./Quote.module.scss";

import { Component } from "react";

interface IQuoteProps {
  quote: string;
  author: string;
}

export default class Quote extends Component<IQuoteProps> {
  render() {
    return (
      <div className={styles["quote-component"]}>
        <div className={styles["__background"]}>
          <div className={`__website-container -xs -offset-sides -offset-tops ${styles["__container"]}`}>
            <div className={styles["__quote"]} dangerouslySetInnerHTML={{__html: this.props.quote}}></div>
            <div className={styles["__author"]}>{this.props.author}</div>
          </div>
        </div>
      </div>
    )
  }
}
