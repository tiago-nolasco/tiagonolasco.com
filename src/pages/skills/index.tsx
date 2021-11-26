import { Component } from "react";
import Chart from 'chart.js/auto';

import styles from "./skills.module.scss";

import apiService from "../../shared/services/api.service";

import { ContentTagEnum } from "../../shared/model/ContentTagEnum";
import { IContentSkills } from "../../shared/model/IContentSkills";
import { IContent } from "../../shared/model/IContent";

interface ISkillsProps {}
interface ISkillsState {
  title: string;
  description: string;
  skills: IContentSkills[];
}

export default class Skills extends Component<ISkillsProps, ISkillsState> {

  chartId = "SkillsChart";
  state = {
    title: "",
    description: "",
    skills: [] as IContentSkills[]
  }

  async componentDidMount(): Promise<void> {
    this.loadTechnology();
    await this.loadSkills();
    this.mountChart();
  }

  async loadTechnology(): Promise<void> {
    const data: IContent = await apiService.getContent(ContentTagEnum.SKILLS);
    this.setState({
      title: data.title,
      description: data.description
    });
  }

  async loadSkills(): Promise<void> {
    const skills: IContentSkills[] = await apiService.getSkills();
    this.setState({ skills });
  }

  mountChart(): void {
    // @ts-ignore
    const ctx = document.getElementById(this.chartId).getContext('2d');
    new Chart(ctx, {
      type: "radar",
      // type: "polarArea",
      data: {
        labels: this.state.skills.map((technologie: IContentSkills) => technologie.title),
        datasets: [
          {
            data: this.state.skills.map((technologie: IContentSkills) => +technologie.score),
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

  getSkillsHtml(tecnologies: IContentSkills[]): JSX.Element[] {
    return tecnologies.map((tecnology: IContentSkills) => (
      <span className={styles["__technology"]}>{tecnology.title}</span>
    ));
  }

  render() {
    return (
      <div className={`container -offset-sides -offset-tops ${styles["skills-component"]}`}>
        <div className={styles['__info']}>
          <div className="theme-color title">{this.state.title}</div>
          <div className={styles["__description"]} dangerouslySetInnerHTML={{__html: this.state.description}}></div>
          {/* <div className={styles["__skills"]}>{this.getSkillsHtml(this.state.skills)}</div> */}
        </div>
        <div className={styles["__canvas"]}>
          <canvas id={this.chartId} width="400" height="400"></canvas>
        </div>
      </div>
    )
  }
}
