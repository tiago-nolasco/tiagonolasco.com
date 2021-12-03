import { Component } from "react";

interface IHtmlTextProps {
  text: string;
  className?: string;
}

export default class HtmlText extends Component<IHtmlTextProps> {

  get text(): string {
    return this.props.text;
  }

  render() {
    return <div
      className={this.props.className}
      dangerouslySetInnerHTML={{__html: this.text}}></div>;
  }
}
