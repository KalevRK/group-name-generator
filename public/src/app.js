// Main React component that contains all of the other components
var MainBox = React.createClass({
  loadAdjectivesFromServer: function() {
    $.ajax({
      url: 'adjectives.json',
      dataType: 'json',
      cache: false,
      success: function(adjectives) {
        this.setState({
          adjectives: adjectives
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('adjectives.json', status, err.toString());
      }.bind(this)
    });
  },
  loadNounsFromServer: function() {
    $.ajax({
      url: 'nouns.json',
      dataType: 'json',
      cache: false,
      success: function(nouns) {
        this.setState({
          nouns: nouns
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('nouns.json', status, err.toString());
      }.bind(this)
    });
  },
  addAdjective: function(adjective) {
    // Current adjectives
    var adjectives = this.state.adjectives;
    // Add the new adjective to the array of current adjectives
    var newAdjective = adjectives.concat([adjective]);
    // Update the state of the component
    this.setState({adjectives: adjectives});
    // Update the data on the server
    $.ajax({
      url: 'adjectives.json',
      dataType: 'json',
      type: 'POST',
      data: adjective,
      success: function(adjectives) {
        this.setState({adjectives: adjectives});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {
      adjectives: [],
      nouns: []
    };
  },
  componentDidMount: function() {
    this.loadAdjectivesFromServer();
    this.loadNounsFromServer();
  },
  render: function() {
    return (
      <div className="mainBox">
        <h1>Group Name Generator</h1>
        <h2 className="groupName">
          Placeholder Name
        </h2>
        <button name="Generate">Generate Group Name</button>
        <AdjectiveBox adjectives={this.state.adjectives} addAdjective={this.addAdjective}/>
        <NounBox nouns={this.state.nouns} />
      </div>
    );
  }
});

// React component that contains all of the components associated with adjectives
var AdjectiveBox = React.createClass({
  render: function() {
    return (
      <div className="adjectiveBox">
        <h2>Adjectives</h2>
        <AdjectiveForm onSubmitAdjective={this.props.addAdjective}/>
        <AdjectiveList adjectives={this.props.adjectives}/>
      </div>
    );
  }
});

// Form for adding new adjectives to the list of adjectives
var AdjectiveForm = React.createClass({
  submitAdjective: function(e) {
    e.preventDefault();
    // Retrieve the adjective from the input form element
    var adjective = React.findDOMNode(this.refs.adjective).value.trim();
    // If no adjective was entered then return
    if (!adjective) {
      return;
    }
    // Invoke the function in the parent component
    // Pass in the adjective to add
    this.props.onSubmitAdjective({adjective: adjective});
    // Clear the input form element's value
    React.findDOMNode(this.refs.adjective).value = '';
  },
  render: function() {
    return (
      <form className="adjectiveForm" onSubmit={this.submitAdjective}>
        <input type="text" placeholder="Enter a new adjective" ref="adjective" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});

// List of all stored adjectives
var AdjectiveList = React.createClass({
  render: function() {
    return (
      <div className="adjectiveList">
        {this.props.adjectives}
      </div>
    );
  }
});

// React component that contains all of the components associated with nouns
var NounBox = React.createClass({
  render: function() {
    return (
      <div className="nounBox">
        <h2>Nouns</h2>
        <NounForm />
        <NounList data={this.props.nouns}/>
      </div>
    );
  }
});

// Form for adding new nouns to the list of nouns
var NounForm = React.createClass({
  render: function() {
    return (
      <form className="nounForm">
        <input type="text" placeholder="Enter a new noun" ref="noun" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});

// List of all stored nouns
var NounList = React.createClass({
  render: function() {
    return (
      <div className="nounList">
        {this.props.nouns}
      </div>
    );
  }
});

React.render(<MainBox />, document.getElementById('app'));
