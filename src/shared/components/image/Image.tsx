import styles from "./Image.module.scss";

import { Component } from "react";
import { ImageRatioEnum } from "./model/ImageRatioEnum";
import { ImageOrientationEnum } from "./model/ImageOrientationEnum";

interface IImageProps {
  src: string;
  ratio?: ImageRatioEnum;
  orientation?: ImageOrientationEnum;
  className?: string;
  showFullImage?: boolean;
  position?: string;
}

export default class Image extends Component<IImageProps> {

  ratio() {
    const ratio: ImageRatioEnum = this.props.ratio;
    if (ratio) {
      const isRectangle: boolean = ratio === ImageRatioEnum.RECTANGLE;
      const orientation: ImageOrientationEnum = this.props.orientation || ImageOrientationEnum.LANDSCAPE;
      const proportion: string = isRectangle ? `${ratio}-${orientation}` : ratio;

      return (
        <img
          className={styles["__ratio"]}
          alt={proportion}
          src={`./images/ratio-${proportion}.png`} />);
    }
  }

  render(){
    return (
      <>
      <div
        className={`
          ${this.props.className || ""}
          ${styles["image-component"]}
          ${this.props.showFullImage ? styles["-contain"] : ""}
        `}
        style={{
          backgroundImage: `url(${this.props.src})`,
          backgroundPosition: `${this.props.position || "center center"}`
        }}>{this.ratio()}</div>
      </>
    )
  }
}
