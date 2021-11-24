import { Component } from "react";

import styles from "./projects.module.scss";

import Image from "../../shared/components/Image";

import { ApiService } from "../../shared/services/api.service";
import { IContentMedia } from "../../shared/model/IContentMedia";
import { ImageRatioEnum } from "../../shared/model/ImageRatioEnum";
import { IContentProjects } from "../../shared/model/IContentProjects";
import websiteStore from "../../shared/store/website.store";
import { IContent } from "../../shared/model/IContent";
import { ContentTagEnum } from "../../shared/model/ContentTagEnum";

interface IProjectsProps {}
interface IProjectsState {
  title: string;
  summary: string;
  description: string;
  projects: IContentProjects[];
}

export default class Projects extends Component<IProjectsProps, IProjectsState> {

  state = {
    title: "",
    summary: "",
    description: "",
    projects: []
  }

  componentDidMount(): void {
    this.loadMainProjects();
    this.loadMoreProjects();
  }

  async loadMainProjects(): Promise<void> {
    const projects: IContentProjects[] = await ApiService.getInstance().getProjects();
    this.setState({ projects });
  }

  async loadMoreProjects(): Promise<void> {

    const data: IContent = await ApiService.getInstance().getContent(ContentTagEnum.PROJECTS);

    this.setState({
      title: data.title,
      summary: data.summary,
      description: data.description
    });
  }

  getProjectsHtml(projects: IContentProjects[]): JSX.Element[] {
    return projects && projects.map((project: IContentProjects, index: number) => {

      const image: IContentMedia = project.images?.find((img: IContentMedia) => !!img.main);

      return (
        <a key={`project-${index}`} href={project.url} target="_blank" className={styles["__project"]}>
          {this.getImageHtml(image)}
        </a>
      );
    });
  }

  getImageHtml(image: IContentMedia): JSX.Element {
    return image ? (
        <Image
          src={image.file}
          showFullImage={true}
          ratio={ImageRatioEnum.SQUARE}
          className={styles["__image"]} />) : null;
  }

  render() {
    return (
      <div className={`container -offset-sides -offset-tops ${styles["projects-component"]}`}>
        <div className="title theme-color">{websiteStore.getLabel("menu_projects")}</div>
        <div className={styles["__main-projects-list"]}>
          {this.getProjectsHtml(this.state.projects)}
        </div>
        <div className={styles["__more-projects"]}>
          <div className={styles["__summary"]} dangerouslySetInnerHTML={{__html: this.state.summary}}></div>
          <div className={styles["__description"]} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
        </div>
      </div>
    )
  }
}