'use strict';

import React from 'react';
import Header from './Header';
import NewsFeed from './NewsFeed';

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Header />
        <NewsFeed />
      </div>
    )
  }
}

export default App;