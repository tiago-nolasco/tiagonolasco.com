import { Component } from "react";

import Head from "next/head";

import Homepage from "./homepage/";
import About from "./about/";
import Skills from "./skills";
import Timeline from "./timeline";
import Projects from "./projects/";
import Contacts from "./contacts/";

import apiService from "../shared/services/api/api.service";
import websiteStore from "../shared/store/website.store";

import { ISeo } from "../shared/services/api/model/ISeo";
import { ISocial } from "../shared/services/api/model/ISocial";

export default class Index extends Component {

  state = {
    loading: true
  }

  async componentDidMount() {
    await this.loadStore();
    this.setState({loading: false});
  }

  async loadStore(): Promise<void[]> {
    return await Promise.all([
      await this.loadSocial(),
      await this.loadSeo(),
      await this.loadI18n()
    ]);
  }

  async loadSocial(): Promise<void> {
    const social: ISocial[] = await apiService.getSocial();
    websiteStore.social = social;
  }

  async loadSeo(): Promise<void> {
    const seo: ISeo = await apiService.getSeo();
    websiteStore.seo = seo;
  }

  async loadI18n(): Promise<void> {
    const i18n = await apiService.getI18n();
    websiteStore.i18n = i18n;
  }

  get seo(): ISeo {
    return websiteStore.seo;
  }

  render() {
    return this.state.loading ? null : (
      <>
        <Head>
          <title>{this.seo.title}</title>
          <meta name="description" content={this.seo.description} />
          <meta name="keywords" content={this.seo.keywords} />
          <meta name="author" content={this.seo.author} />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Homepage />
          <About />
          <Skills />
          <Timeline />
          <Projects />
          <Contacts />
        </main>

        <footer>

        </footer>
      </>
    )
  }
}
