import { Component } from 'react';

import styles from "./contacts.module.scss";

import apiService from "../../shared/services/api/api.service";
import websiteStore from "../../shared/store/website.store";

import { ISocial } from '../../shared/services/api/model/ISocial';
import { ISeo } from '../../shared/services/api/model/ISeo';
import { IContent } from '../../shared/services/api/model/IContent';
import { ContentTagEnum } from '../../shared/services/api/model/ContentTagEnum';
import Container from '../../shared/components/container/Container';
import { ContainerSizeEnum } from '../../shared/components/container/model/ContainerSizeEnum';

interface IContactSection {
  title?: string;
  summary?: string
  description?: string;
}

interface IContactsProps {}
interface IContactsState {
  contacts: IContactSection;
  follow: IContactSection;
}

export default class Contacts extends Component<IContactsProps, IContactsState> {

  state = {
    contacts: {} as IContactSection,
    follow: {} as IContactSection
  };

  componentDidMount(): void {
    this.loadContacts();
    this.loadFollow();
  }

  async loadContacts(): Promise<void> {
    const contacts: IContactSection = await this.getContactsSection(ContentTagEnum.CONTACTS);
    this.setState({ contacts });
  }

  async loadFollow(): Promise<void> {
    const follow: IContactSection = await this.getContactsSection(ContentTagEnum.FOLLOW);
    this.setState({ follow });
  }

  async getContactsSection(section: ContentTagEnum): Promise<IContactSection> {
    const data: IContent = await apiService.getContent(section);
    return {
      title: data?.title || "",
      summary: data?.summary || "",
      description: data?.description || ""
    };
  }

  getContactsSectionHtml(section: IContactSection): JSX.Element {
    return section ? (
      <div className={styles["__section"]}>
        <div className={`title ${styles["__text"]} ${styles["-title"]}`}>{section.title}</div>
        {section.summary && <div className={styles["__text"]} dangerouslySetInnerHTML={{__html: section.summary}}></div>}
        {section.description && <div className={styles["__text"]} dangerouslySetInnerHTML={{__html: section.description}}></div>}
      </div>
    ) : null;
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
        <Container
          className={styles["__contacts"]}
          topsOffset
          sidesOffset>
            {this.getContactsSectionHtml(this.state.contacts)}
            {this.getContactsSectionHtml(this.state.follow)}
          </Container>
        <div className={styles["__signature"]}>
          <Container
            className={styles["__container"]}
            sidesOffset>
              <div className={styles['__author']} dangerouslySetInnerHTML={{__html: this.getSignature()}}></div>
              {/* <div className={styles['__social']}>{this.getSocialHtml(websiteStore.social)}</div> */}
            </Container>
        </div>
      </div>
    )
  }
}
