import React from 'react';
import AppStore from '../../stores/AppStore.js';
import AppAction from '../../actions/AppActions.js';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import { Row, Column, Link, Callout, Colors } from 'react-foundation';
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton
} = ShareButtons;
const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount
} = ShareCounts;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');

const getDelay = () => AppStore.getDelay();

class DelayData extends React.Component {
  constructor() {
    super();
    this.state = this.getState();
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    AppStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange);
  }

  getState() {
    const state = {
      delay: getDelay(),
    };
    return state;
  }

  _onChange() {
    this.setState(this.getState());
  }

  clearDelay() {
    AppAction.clear();
  }

  render() {
    const shareUrl = 'http://nodelay.co';
    const title = 'NoDelay — Own your time!';

    if (this.state.delay) {
      return (
        <Callout color={Colors.PRIMARY}>
          <h1 className="{s.title}">Your delay is..</h1>
          <p>
          From <strong>{this.state.delay.from}</strong> to
          <strong> {this.state.delay.to}</strong> minutes
          with <strong>{this.state.delay.reliability}%</strong>

          </p>
          <Link
            color={Colors.WARNING}
            onClick={this.clearDelay}
          >Clear</Link>

          <div className="Demo__some-network">
            <FacebookShareButton
              url={shareUrl}
              title={title}
              className="Demo__some-network__share-button">
              <FacebookIcon
                size={32}
                round={true} />
            </FacebookShareButton>

            <FacebookShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </FacebookShareCount>
          </div>

          <div className="Demo__some-network">
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="Demo__some-network__share-button">
              <TwitterIcon
                size={32}
                round={true} />
            </TwitterShareButton>

            <div className="Demo__some-network__share-count">
              &nbsp;
            </div>
          </div>

          <div className="Demo__some-network">
            <GooglePlusShareButton
              url={shareUrl}
              className="Demo__some-network__share-button">
              <GooglePlusIcon
                size={32}
                round={true} />
            </GooglePlusShareButton>

            <GooglePlusShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </GooglePlusShareCount>
          </div>

          <div className="Demo__some-network">
            <LinkedinShareButton
              url={shareUrl}
              title={title}
              className="Demo__some-network__share-button">
              <LinkedinIcon
                size={32}
                round={true} />
            </LinkedinShareButton>

            <LinkedinShareCount
              url={shareUrl}
              className="Demo__some-network__share-count">
              {count => count}
            </LinkedinShareCount>
          </div>
        </Callout>
      );
    } else {
      return (false);
    }
  }
}

export default DelayData;