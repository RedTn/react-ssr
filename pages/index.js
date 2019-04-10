import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-unfetch';

export default class Index extends Component {
  static propTypes = {
      stars: PropTypes.number
  };

  static async getInitialProps() {
      // eslint-disable-next-line no-undef
      const res = await fetch('https://api.github.com/repos/zeit/next.js');
      const json = await res.json();
      return { stars: json.stargazers_count };
  }

  render() {
      return (
          <div>
              <p>Next.js has {this.props.stars} ⭐️</p>
          </div>
      );
  }
}
