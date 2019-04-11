import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { initStore, initialCards, addItem } from '../store';
import withRedux from 'next-redux-wrapper';
import 'isomorphic-unfetch';

class Index extends Component {
  static propTypes = {
      stars: PropTypes.number,
      cards: PropTypes.array
  };

  static async getInitialProps({ store }) {
      store.dispatch(initialCards());
      const res = await fetch('https://api.github.com/repos/zeit/next.js');
      const json = await res.json();
      return { stars: json.stargazers_count };
  }

  render() {
      return (
          <div>
              <p>Next.js has {this.props.stars} ⭐️</p>
              {this.props.cards.map(card => <div key={card.id}>{card.description}</div>).slice(0, 3)}
          </div>
      );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        initialCards: bindActionCreators(initialCards, dispatch),
        addItem: bindActionCreators(addItem, dispatch)
    };
};

const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index);
