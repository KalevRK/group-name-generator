// Main React component that contains all of the other components
var MainBox = React.createClass({displayName: "MainBox",
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
      React.createElement("div", {className: "mainBox"}, 
        React.createElement("h1", null, "Group Name Generator"), 
        React.createElement("h2", {className: "groupName"}, 
          "Placeholder Name"
        ), 
        React.createElement("button", {name: "Generate"}, "Generate Group Name"), 
        React.createElement(AdjectiveBox, {adjectives: this.state.adjectives, addAdjective: this.addAdjective}), 
        React.createElement(NounBox, {nouns: this.state.nouns})
      )
    );
  }
});

// React component that contains all of the components associated with adjectives
var AdjectiveBox = React.createClass({displayName: "AdjectiveBox",
  render: function() {
    return (
      React.createElement("div", {className: "adjectiveBox"}, 
        React.createElement("h2", null, "Adjectives"), 
        React.createElement(AdjectiveForm, {onSubmitAdjective: this.props.addAdjective}), 
        React.createElement(AdjectiveList, {adjectives: this.props.adjectives})
      )
    );
  }
});

// Form for adding new adjectives to the list of adjectives
var AdjectiveForm = React.createClass({displayName: "AdjectiveForm",
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
      React.createElement("form", {className: "adjectiveForm", onSubmit: this.submitAdjective}, 
        React.createElement("input", {type: "text", placeholder: "Enter a new adjective", ref: "adjective"}), 
        React.createElement("input", {type: "submit", value: "Add"})
      )
    );
  }
});

// List of all stored adjectives
var AdjectiveList = React.createClass({displayName: "AdjectiveList",
  render: function() {
    var adjectives = this.props.adjectives.map(function(adjective) {
      return (
        React.createElement("div", {class: "adjective"}, 
          adjective
        )
      );
    });
    return (
      React.createElement("div", {className: "adjectiveList"}, 
        adjectives
      )
    );
  }
});

// React component that contains all of the components associated with nouns
var NounBox = React.createClass({displayName: "NounBox",
  render: function() {
    return (
      React.createElement("div", {className: "nounBox"}, 
        React.createElement("h2", null, "Nouns"), 
        React.createElement(NounForm, null), 
        React.createElement(NounList, {data: this.props.nouns})
      )
    );
  }
});

// Form for adding new nouns to the list of nouns
var NounForm = React.createClass({displayName: "NounForm",
  render: function() {
    return (
      React.createElement("form", {className: "nounForm"}, 
        React.createElement("input", {type: "text", placeholder: "Enter a new noun", ref: "noun"}), 
        React.createElement("input", {type: "submit", value: "Add"})
      )
    );
  }
});

// List of all stored nouns
var NounList = React.createClass({displayName: "NounList",
  render: function() {
    return (
      React.createElement("div", {className: "nounList"}, 
        this.props.nouns
      )
    );
  }
});

React.render(React.createElement(MainBox, null), document.getElementById('app'));
