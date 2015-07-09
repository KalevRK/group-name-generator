// Main React component that contains all of the other components
var MainBox = React.createClass({displayName: "MainBox",
  render: function() {
    return (
      React.createElement("div", {className: "mainBox"}, 
        React.createElement("h1", null, "Group Name Generator"), 
        React.createElement("h2", {className: "groupName"}, 
          "Placeholder Name"
        ), 
        React.createElement("button", {name: "Generate"}, "Generate Group Name"), 
        React.createElement(AdjectiveBox, null), 
        React.createElement(NounBox, null)
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
        React.createElement(AdjectiveForm, null), 
        React.createElement(AdjectiveList, null)
      )
    );
  }
});

// Form for adding new adjectives to the list of adjectives
var AdjectiveForm = React.createClass({displayName: "AdjectiveForm",
  render: function() {
    return (
      React.createElement("form", {className: "adjectiveForm"}, 
        React.createElement("input", {type: "text", placeholder: "Enter a new adjective", ref: "adjective"}), 
        React.createElement("input", {type: "submit", value: "Add"})
      )
    );
  }
});

// List of all stored adjectives
var AdjectiveList = React.createClass({displayName: "AdjectiveList",
  render: function() {
    return (
      React.createElement("div", {className: "adjectiveList"}, 
        "This is an adjective list placeholder."
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
        React.createElement(NounList, null)
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
        "This is a noun list placeholder."
      )
    );
  }
});

React.render(React.createElement(MainBox, null), document.getElementById('app'));
