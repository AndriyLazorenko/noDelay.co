/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feedback.scss';

function Feedback() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <a
          className={s.link}
          href="https://github.com/Futurealms/noDelay.co"
        >Ask a question</a>
        <span className={s.spacer}>|</span>
        <a
          className={s.link}
          href="https://github.com/Futurealms/noDelay.coissues/new"
        >Report an issue</a>
      </div>
    </div>
  );
}

export default withStyles(Feedback, s);
