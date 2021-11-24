import { Component } from 'react';

import styles from "./about.module.scss";
import { IContentMedia } from '../../shared/model/IContentMedia';
import { IContent } from '../../shared/model/IContent';
import { ApiService } from '../../shared/services/api.service';
import { ContentTagEnum } from "../../shared/model/ContentTagEnum";
import Image from '../../shared/components/Image';
import { ImageRatioEnum } from '../../shared/model/ImageRatioEnum';
import { ImageOrientationEnum } from '../../shared/model/ImageOrientationEnum';

interface IAboutContent {
  title: string;
  description: string;
  image?: IContentMedia;
}

interface IAboutProps {}
interface IAboutState extends IAboutContent {
  skills: IContent[];
}

export default class About extends Component<IAboutProps, IAboutState> {

  state = {
    title: "",
    description: "",
    image: {} as IContentMedia,
    skills: []
  }

  componentDidMount(): void {
    this.loadAbout();
    this.loadSkills();
  }

  async loadAbout(): Promise<void> {

    const data: IContent = await ApiService.getInstance().getContent(ContentTagEnum.ABOUT);
    const image: IContentMedia = data.images?.find((img: IContentMedia) => !!img.main);

    this.setState({
      title: data.title,
      description: data.description,
      image,
    });
  }

  async loadSkills(): Promise<void> {
    const skills: IContent[] = await ApiService.getInstance().getSkills();
    this.setState({ skills });
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

  getSkillsHtml(skills: IContent[]): JSX.Element[] {
    return skills && skills.map((skill: IContent, index: number) => {
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
      <div className={`container -offset-sides -offset-tops ${styles["about-component"]}`}>
        {this.getImageHtml(this.state.image)}
        <div className={styles['__info']}>
          <div className="theme-color title">{this.state.title}</div>
          <div dangerouslySetInnerHTML={{__html: this.state.description}}></div>
          <div className={styles["__skills"]}>{this.getSkillsHtml(this.state.skills)}</div>
        </div>
      </div>
    )
  }
}