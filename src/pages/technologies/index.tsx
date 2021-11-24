import { Component } from "react";
import Chart from 'chart.js/auto';

import styles from "./technologies.module.scss";

import { ApiService } from "../../shared/services/api.service";
import { ContentTagEnum } from "../../shared/model/ContentTagEnum";
import { IContentTechnologies } from "../../shared/model/IContentTechnologies";
import { IContent } from "../../shared/model/IContent";

interface ITechnologiesProps {}
interface ITechnologiesState {
  title: string;
  description: string;
  technologies: IContentTechnologies[];
}

export default class Technologies extends Component<ITechnologiesProps, ITechnologiesState> {

  chartId = "TechnologiesChart";
  state = {
    title: "",
    description: "",
    technologies: [] as IContentTechnologies[]
  }

  async componentDidMount(): Promise<void> {
    this.loadTechnology();
    await this.loadTechnologies();
    this.mountChart();
  }

  async loadTechnology(): Promise<void> {
    const data: IContent = await ApiService.getInstance().getContent(ContentTagEnum.TECHNOLOGY);
    this.setState({
      title: data.title,
      description: data.description
    });
  }

  async loadTechnologies(): Promise<void> {
    const technologies: IContentTechnologies[] = await ApiService.getInstance().getTechnologies();
    this.setState({ technologies });
  }

  mountChart(): void {
    // @ts-ignore
    const ctx = document.getElementById(this.chartId).getContext('2d');
    new Chart(ctx, {
      type: "radar",
      // type: "polarArea",
      data: {
        labels: this.state.technologies.map((technologie: IContentTechnologies) => technologie.title),
        datasets: [
          {
            data: this.state.technologies.map((technologie: IContentTechnologies) => +technologie.score),
            backgroundColor: "rgba(11, 120, 160, 0.2)",
            borderColor: "rgba(11, 120, 160, 0.5)",
          },
          {
            data: [0],
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        }
      }
    });
  }

  getTechnologiesHtml(tecnologies: IContentTechnologies[]): JSX.Element[] {
    return tecnologies.map((tecnology: IContentTechnologies) => (
      <span className={styles["__technology"]}>{tecnology.title}</span>
    ));
  }

  render() {
    return (
      <div className={`container -offset-sides -offset-tops ${styles["technologies-component"]}`}>
        <div className={styles['__info']}>
          <div className="theme-color title">{this.state.title}</div>
          <div className={styles["__description"]} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
          {/* <div className={styles["__technologies"]}>{this.getTechnologiesHtml(this.state.technologies)}</div> */}
        </div>
        <div className={styles["__canvas"]}>
          <canvas id={this.chartId} width="400" height="400"></canvas>
        </div>
      </div>
    )
  }
}
