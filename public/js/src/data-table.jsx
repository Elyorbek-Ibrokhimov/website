var helloWorld = React.createClass({
  render: function () {
    return (
      <div> 
        <h1>Hello World</h1>
      </div>
      );
  }
});

React.render(<HelloWorld/>, document.body);