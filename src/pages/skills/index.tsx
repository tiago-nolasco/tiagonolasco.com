import { Component } from "react";
import Chart from 'chart.js/auto';

import styles from "./skills.module.scss";

import apiService from "../../shared/services/api/api.service";

import { ContentTagEnum } from "../../shared/services/api/model/ContentTagEnum";
import { IContentSkills } from "../../shared/services/api/model/IContentSkills";
import { IContent } from "../../shared/services/api/model/IContent";
import Container from "../../shared/components/container/Container";
import { ContainerSizeEnum } from "../../shared/components/container/model/ContainerSizeEnum";

interface ISkillsByCat {
  [cat: string]: IContentSkills[];
}

interface ISkillsProps {}
interface ISkillsState {
  title: string;
  description: string;
  skillsByCat: ISkillsByCat;
}

export default class Skills extends Component<ISkillsProps, ISkillsState> {

  chartId = "SkillsChart";
  state = {
    title: "",
    description: "",
    skillsByCat: {} as ISkillsByCat
  }

  async componentDidMount(): Promise<void> {
    this.loadSkillsContent();
    await this.loadSkills();
    this.mountCharts();
  }

  async loadSkillsContent(): Promise<void> {
    const data: IContent = await apiService.getContent(ContentTagEnum.SKILLS);
    this.setState({
      title: data.title,
      description: data.description
    });
  }

  async loadSkills(): Promise<void> {
    const skills: IContentSkills[] = await apiService.getSkills();
    if (skills.length) {
      this.buildCharts(skills);
    }
  }

  buildCharts(skills: IContentSkills[]): void {
    const skillsByCat: ISkillsByCat = skills
        ?.reduce((acc: ISkillsByCat, skill: IContentSkills) => {
        acc[skill.subCatName] = [
          ...(acc[skill.subCatName] || []),
          ...[skill]
        ];
        return acc;
      }, {});
    this.setState({ skillsByCat });
  }

  mountCharts(): void {
    Object.keys(this.state.skillsByCat).forEach((category: string) => {
      this.setChat(category, this.state.skillsByCat[category])
    });
  }

  setChat(category: string, skills: IContentSkills[]): void {
    // @ts-ignore
    const ctx = document.getElementById(category + "Chart").getContext('2d');
    new Chart(ctx, {
      type: "radar",
      // type: "polarArea",
      data: {
        labels: skills.map((technologie: IContentSkills) => technologie.title),
        datasets: [
          {
            data: skills.map((technologie: IContentSkills) => +technologie.score),
            backgroundColor: "rgba(11, 120, 160, 0.2)",
            borderColor: "rgba(11, 120, 160, 0.5)",
          },
          {
            data: [5],
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

  getChartsHtml(skillsByCat: ISkillsByCat): JSX.Element[] {
    return Object.keys(skillsByCat).map((category: string, index: number) => {
      return (
        <div key={`chart-${index}`} className={styles["__canvas"]}>
          <div className={`sub-title ${styles["__sub-title"]}`}>{category}</div>
          <canvas id={`${category}Chart`} width="400" height="400"></canvas>
        </div>
      );
    });
  }

  render() {
    return (
      <div className={styles["skills-component"]}>
        <Container
          className={styles["__container"]}
          size={ContainerSizeEnum.MEDIUM}
          topsOffset={true}
          sidesOffset={true}>
            <div className="theme-color title">{this.state.title}</div>
            <div className={styles["__chart-list"]}>
              {this.getChartsHtml(this.state.skillsByCat)}
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
