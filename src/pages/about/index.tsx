import { Component } from 'react';

import apiService from "../../shared/services/api/api.service";

import styles from "./about.module.scss";
import { IContentMedia } from '../../shared/services/api/model/IContentMedia';
import { IContent } from '../../shared/services/api/model/IContent';
import { ContentTagEnum } from "../../shared/services/api/model/ContentTagEnum";
import Image from '../../shared/components/image/Image';
import { ImageRatioEnum } from '../../shared/components/image/model/ImageRatioEnum';
import { ImageOrientationEnum } from '../../shared/components/image/model/ImageOrientationEnum';
import Container from '../../shared/components/container/Container';
import { ContainerSizeEnum } from '../../shared/components/container/model/ContainerSizeEnum';

interface IAboutContent {
  title: string;
  description: string;
  image?: IContentMedia;
}

interface IAboutProps {}
interface IAboutState extends IAboutContent {
  foundations: IContent[];
}

export default class About extends Component<IAboutProps, IAboutState> {

  state = {
    title: "",
    description: "",
    image: {} as IContentMedia,
    foundations: []
  }

  componentDidMount(): void {
    this.loadAbout();
    this.loadFoundations();
  }

  async loadAbout(): Promise<void> {

    const data: IContent = await apiService.getContent(ContentTagEnum.ABOUT);
    const image: IContentMedia = data.images?.find((img: IContentMedia) => !!img.main);

    this.setState({
      title: data.title,
      description: data.description,
      image,
    });
  }

  async loadFoundations(): Promise<void> {
    const foundations: IContent[] = await apiService.getFoundations();
    this.setState({ foundations });
  }

  getImageHtml(image: IContentMedia): JSX.Element {
    return image ? (
      <div className={styles['__image']}>
        <Image
          src={image.file}
          showFullImage={image.showFullImage}
          position={`center ${image.align}`}
          ratio={ImageRatioEnum.RECTANGLE}
          orientation={ImageOrientationEnum.PORTRAIT}
          className={styles["__image"]} />
      </div>) : null;
  }

  getFoundationsHtml(foundations: IContent[]): JSX.Element[] {
    return foundations && foundations.map((skill: IContent, index: number) => {
      return (
        <div key={`about-skill-${index}`} className={styles["__skill"]}>
          <div className="sub-title">{skill.title}</div>
          <div dangerouslySetInnerHTML={{__html: skill.description}}></div>
        </div>
      );
    })
  }

  render() {
    return (
      <div className={styles["about-component"]}>
        <Container
          className={styles["__container"]}
          topsOffset={true}
          sidesOffset={true}>
            {this.getImageHtml(this.state.image)}
            <div className={styles['__info']}>
              <div className="theme-color title">{this.state.title}</div>
              <div dangerouslySetInnerHTML={{__html: this.state.description}}></div>
              <div className={styles["__foundations"]}>{this.getFoundationsHtml(this.state.foundations)}</div>
            </div>  
          </Container>
      </div>
    )
  }
}
