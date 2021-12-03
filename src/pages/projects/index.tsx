import { Component } from "react";

import styles from "./projects.module.scss";

import apiService from "../../shared/services/api/api.service";
import websiteStore from "../../shared/store/website.store";

import Image from "../../shared/components/image/Image";
import { IContentMedia } from "../../shared/services/api/model/IContentMedia";
import { ImageRatioEnum } from "../../shared/components/image/model/ImageRatioEnum";
import { IContentProjects } from "../../shared/services/api/model/IContentProjects";
import { IContent } from "../../shared/services/api/model/IContent";
import { ContentTagEnum } from "../../shared/services/api/model/ContentTagEnum";
import Container from "../../shared/components/container/Container";
import { ContainerSizeEnum } from "../../shared/components/container/model/ContainerSizeEnum";

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
    const projects: IContentProjects[] = await apiService.getProjects();
    this.setState({ projects });
  }

  async loadMoreProjects(): Promise<void> {

    const data: IContent = await apiService.getContent(ContentTagEnum.PROJECTS);

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
      <div className={styles["projects-component"]}>
        <Container
          className={styles["__container"]}
          topsOffset={true}
          sidesOffset={true}>
            <div className="title theme-color">{websiteStore.getLabel("menu_projects")}</div>
            <div className={styles["__main-projects-list"]}>
              {this.getProjectsHtml(this.state.projects)}
            </div>
            <Container
              className={styles["__description"]}
              size={ContainerSizeEnum.SMALL}>
                <div className={styles["__html-text"]} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
              </Container>
          </Container>
      </div>
    )
  }
}
