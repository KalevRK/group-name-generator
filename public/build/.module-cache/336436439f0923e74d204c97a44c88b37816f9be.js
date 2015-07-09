var MainBox = React.createClass({displayName: "MainBox",
  render: function() {
    return (
      React.createElement("div", {className: "mainBox"}, 
        React.createElement("h1", null, "Group Name Generator")
      )
    );
  }
});

React.render(React.createElement(MainBox, null), document.getElementById('app'));
