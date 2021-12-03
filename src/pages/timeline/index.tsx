import { Component } from "react";

import styles from "./timeline.module.scss";

import apiService from "../../shared/services/api/api.service";
import websiteStore from '../../shared/store/website.store';

import { IContentTimeline } from "../../shared/services/api/model/IContentTimeline";
import Container from "../../shared/components/container/Container";
import { ContainerSizeEnum } from "../../shared/components/container/model/ContainerSizeEnum";

const enum EventTypeEnum {
  PROFESSIONAL = "professional",
  ACADEMY = "academy",
  PERSONAL = "personal"
}

interface ITimelineEvent extends IContentTimeline {
  type: EventTypeEnum;
}

interface ITimelineProps {}
interface ITimelineState {
  personal: IContentTimeline[];
  professional: IContentTimeline[];
  academy: IContentTimeline[];
}

export default class Timeline extends Component<ITimelineProps, ITimelineState> {

  state = {
    personal: [],
    professional: [],
    academy: []
  }

  async componentDidMount(): Promise<void> {
    this.loadPersonal();
    this.loadProfessional();
    this.loadAcademy();
  }

  async loadPersonal(): Promise<void> {
    const personal: IContentTimeline[] = await apiService.getPersonal();
    this.setState({ personal });
  }

  async loadProfessional(): Promise<void> {
    const professional: IContentTimeline[] = await apiService.getProfessional();
    this.setState({ professional });
  }

  async loadAcademy(): Promise<void> {
    const academy: IContentTimeline[] = await apiService.getAcademy();
    this.setState({ academy });
  }

  getEventsHtml(state: ITimelineState): JSX.Element[] {

    const data: ITimelineEvent[] = [
      ...state.personal.map((event: IContentTimeline) => ({ ...event, type: EventTypeEnum.PERSONAL })),
      ...state.professional.map((event: IContentTimeline) => ({ ...event, type: EventTypeEnum.PROFESSIONAL })),
      ...state.academy.map((event: IContentTimeline) => ({ ...event, type: EventTypeEnum.ACADEMY })),
    ]
    .sort((a: ITimelineEvent, b: ITimelineEvent) => new Date(a.initDate).getTime() - new Date(b.initDate).getTime());

    return data.map((event: ITimelineEvent, index: number) => {
      return (
        <div
          key={`timeline-event-${index}`}
          className={`
            ${styles["__event"]}
            ${styles[`-${event.type}`]}
            ${event.isSideNote ? styles["-is-side-note"] : ""}`}>
          <div className={styles["__top-line"]}></div>
          <div className={styles["__first-line"]}>
            <div className={`sub-title ${styles["__sub-title"]}`}>{event.title}</div>
            {this.getDateHtml(event)}
          </div>
          <div className={styles["__second-line"]} dangerouslySetInnerHTML={{__html: event.description}}></div>
        </div>
      );
    });
  }

  getDateHtml(event: ITimelineEvent): JSX.Element {
    
    const initDate: Date = new Date(event.initDate);
    const endDate: Date = event.endDate && new Date(event.endDate);
    let date: string;

    if (event.type === EventTypeEnum.PERSONAL) {
      date = this.getDate(initDate);
    } else {
      date = this.getDate(initDate) + (endDate ? ` - ${this.getDate(endDate)}` : "");
    }

    return <div className={styles["__date"]}>{date}</div>;
  }

  getDate(date: Date, month: boolean = true, day = false): string {
    const rtn: string[] = [];

    if (day) { rtn.push(date.getDay().toString()); }
    if (day || month) {
      const month = this.getLabel(`month${date.getMonth()+1}`).slice(0, 3);
      rtn.push(month);
    }
    
    rtn.push(date.getFullYear().toString());

    return rtn.join(rtn.length > 2 ? "-" : ", ");
  }

  getLabel(label: string): string {
    return websiteStore.getLabel(label);
  }

  render() {
    return (
      <div className={styles["timeline-component"]}>
        <Container
          className={styles["__container"]}
          topsOffset={true}
          sidesOffset={true}>
            <div className={styles["__title-container"]}>
              <div className={`title theme-color ${styles["__sub-title"]} ${styles["-professional"]}`}>{this.getLabel("professional")}</div>
              <div className={`title theme-color ${styles["__title"]}`}>{this.getLabel("career")}</div>
              <div className={`title theme-color ${styles["__sub-title"]} ${styles["-academy"]}`}>{this.getLabel("academic")}</div>
            </div>
            <div className={styles["__timeline-container"]}>
              <div className={styles["__timeline"]}></div>
              <div className={styles["__events"]}>
                {this.getEventsHtml(this.state)}
              </div>
              <div className={styles["__keep-comming"]}>{this.getLabel("keepComing")}</div>
            </div>
          </Container>
      </div>
    )
  }
}
