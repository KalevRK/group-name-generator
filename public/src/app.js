var MainBox = React.createClass({
  render: function() {
    return (
      <div className="mainBox">
        <h1>Group Name Generator</h1>
      </div>
    );
  }
});

React.render(<MainBox />, document.getElementById('app'));
