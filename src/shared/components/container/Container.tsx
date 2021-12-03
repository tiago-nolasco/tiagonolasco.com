import styles from "./Container.module.scss";

import { Component } from "react";
import { ContainerSizeEnum } from "./model/ContainerSizeEnum";

interface IContainerProps {
  className?: string;
  size?: ContainerSizeEnum;
  topsOffset?: boolean;
  sidesOffset?: boolean;
}

export default class Container extends Component<IContainerProps> {

  get sizeClass(): string {
    return styles[`-${this.props.size || ContainerSizeEnum.MEDIUM}`];
  }

  get topsOffsetClass(): string {
    return this.props.topsOffset && styles["-offset-tops"] || "";
  }

  get sidesOffsetClass(): string {
    return this.props.sidesOffset && styles["-offset-sides"] || "";
  }

  render() {
    return (
      <div className={`
        ${styles["container-component"]}
        ${this.sizeClass}
        ${this.topsOffsetClass}
        ${this.sidesOffsetClass}
        ${this.props.className}`}>{this.props.children}</div>
    )
  }
}
