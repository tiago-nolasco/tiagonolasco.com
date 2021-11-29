import { Component } from "react";

import styles from "./homepage.module.scss";

import Image from "../../shared/components/image/Image";

import apiService from "../../shared/services/api/api.service";
import websiteStore from '../../shared/store/website.store';

import { ContentTagEnum } from "../../shared/services/api/model/ContentTagEnum";
import { IContentMedia } from "../../shared/services/api/model/IContentMedia";
import { ImageRatioEnum } from "../../shared/components/image/model/ImageRatioEnum";
import { IContent } from "../../shared/services/api/model/IContent";
import { ISocial } from "../../shared/services/api/model/ISocial";

interface IButton {
  text: string;
  href: string;
  key?: string;
  class?: string;
  target?: "_blanc" | "_self"
}

interface IHomepageProps {}
interface IHomepageState {
  title: string;
  summary: string;
  description: string;
  image: IContentMedia;
  cv: IContentMedia;
}

export default class Homepage extends Component<IHomepageProps, IHomepageState> {

  state = {
    title: "",
    summary: "",
    description: "",
    image: {} as IContentMedia,
    cv: {} as IContentMedia
  }

  componentDidMount(): void {
    this.loadHomepage();
    this.loadSocial();
  }

  async loadHomepage(): Promise<void> {

    const data: IContent = await apiService.getContent(ContentTagEnum.HOMEPAGE);
    const image: IContentMedia = data.images?.find((img: IContentMedia) => !!img.main);
    const cv: IContentMedia = data.documents?.find((doc: IContentMedia) => !!doc.title);

    this.setState({
      title: data.title,
      summary: data.summary,
      description: data.description,
      image,
      cv
    });
  }

  async loadSocial(): Promise<void> {
    const social: ISocial[] = await apiService.getSocial();
    websiteStore.social = social;
  }

  getImageHtml(image: IContentMedia): JSX.Element {
    return image ? (
      <Image
        src={image.file}
        showFullImage={image.showFullImage}
        position={`center ${image.align}`}
        ratio={ImageRatioEnum.RECTANGLE}
        className={styles["__image"]} />) : null;
  }

  getCvHtml(doc: IContentMedia): JSX.Element {
    return doc && this.getButtonHtml({
      text: websiteStore.getLabel("button_downloadCv"),
      href: doc.file
    });
  }

  getSocialHtml(socialList: ISocial[]): JSX.Element {
    if (socialList?.length > 0) {
      const social = socialList[0];
      return this.getButtonHtml({
        text: social.name,
        href: social.url,
        class: "dark-button"
      })
    }
  }

  getButtonHtml(button: IButton): JSX.Element {
    return <a
      key={button.key}
      className={`button ${button.class} ${styles["__button"]}`}
      href={button.href}
      target={button.target || "_blanc"}>{button.text}</a>;
  }

  render() {
    return (
      <div className={styles["homepage-component"]}>
        {this.getImageHtml(this.state.image)}
        <div className={styles["__info"]}>
          <div className={`__website-container -offset-sides ${styles["__container"]}`}>
            <div className={styles["__role"]}>{this.state.title}</div>
            <div className={styles["__summary"]} dangerouslySetInnerHTML={{__html: this.state.summary}}></div>
            <div className={styles["__description"]} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
            <div className={styles["__media"]}>
              {this.getCvHtml(this.state.cv)}
              {this.getSocialHtml(websiteStore.social)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
