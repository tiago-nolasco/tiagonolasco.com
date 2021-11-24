import { Component } from 'react';

import styles from "./contacts.module.scss";

import websiteStore from "../../shared/store/website.store";
import { ISocial } from '../../shared/model/ISocial';
import { ISeo } from '../../shared/model/ISeo';
import { IContent } from '../../shared/model/IContent';
import { ContentTagEnum } from '../../shared/model/ContentTagEnum';
import { ApiService } from '../../shared/services/api.service';

interface IContactsProps {}
interface IContactsState {
  title: string;
  summary: string
  description: string;
}

export default class Contacts extends Component<IContactsProps, IContactsState> {

  state = {
    title: "",
    summary: "",
    description: ""
  };

  componentDidMount(): void {
    this.loadContacts();
  }

  async loadContacts(): Promise<void> {
    const data: IContent = await ApiService.getInstance().getContent(ContentTagEnum.CONTACTS);
    this.setState({
      title: data.title,
      summary: data.summary,
      description: data.description
    });
  }

  getSignature(): string {
    const seo: ISeo = websiteStore.seo;
    const signature: string = websiteStore.getLabel("developedBy")
      .replace("<author>", seo.author)
      .replace("<tncreate>", "<a target='blanc' href='https://www.tncreate.pt/'>tnCreate</a>")
    return `${seo.year} | ${signature}`;
  }

  getSocialHtml(socialList: ISocial[]): JSX.Element[] {
    return socialList && socialList.map((social: ISocial, index: number) => (
      <a
        key={`social-${index}`}
        href={social.url}
        className={styles["__link"]}
        target="_blanc">{social.name}</a>
    ));
  }

  render() {
    return (
      <div className={styles["contacts-component"]}>
        <div className={styles["__contacts"]}>
          <div className={`container -offset-sides -offset-tops ${styles["__container"]}`}>
            <div className={`title ${styles["__text"]} ${styles["-title"]}`}>{this.state.title}</div>
            <div className={`${styles["__text"]} ${styles["-summary"]}`} dangerouslySetInnerHTML={{__html: this.state.summary}}></div>
            <div className={`${styles["__text"]} ${styles["-description"]}`} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
          </div>
        </div>
        <div className={styles["__signature"]}>
          <div className={`container -offset-sides ${styles["__container"]}`}>
            <div className={styles['__author']} dangerouslySetInnerHTML={{__html: this.getSignature()}}></div>
            <div className={styles['__social']}>{this.getSocialHtml(websiteStore.social)}</div>
          </div>
        </div>
      </div>
    )
  }
}
