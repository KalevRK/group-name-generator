// Main React component that contains all of the other components
var MainBox = React.createClass({
  render: function() {
    return (
      <div className="mainBox">
        <h1>Group Name Generator</h1>
        <h2 className="groupName">
          Placeholder Name
        </h2>
        <button name="Generate">Generate Group Name</button>
        <AdjectiveBox />
        <NounBox />
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
        <AdjectiveForm />
        <AdjectiveList />
      </div>
    );
  }
});

// Form for adding new adjectives to the list of adjectives
var AdjectiveForm = React.createClass({
  render: function() {
    return (
      <form className="adjectiveForm">
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
        This is an adjective list placeholder.
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
        <NounList />
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
        This is a noun list placeholder.
      </div>
    );
  }
});

React.render(<MainBox />, document.getElementById('app'));
