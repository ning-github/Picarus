var React = require("react");
var RequestStore = require("../../stores/app-requestStore");
var RequestHeader = require("./request-header");
var Photo = require("./request-photo");
var PhotoUpload = require("./request-photoUpload");

var getData = function(){
  return {
    id: RequestStore.getId(),
    photos: RequestStore.getPhotos(),
    username: RequestStore.getUsername(),
    tags: RequestStore.getTags()
  };
};

var Request = React.createClass({
  getInitialState: function(){
    return getData();
  },

  _onChange: function () {
    console.log('change triggered');
    this.setState(getData());
  },

  componentDidMount: function() {
    console.log('mounted');
    RequestStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    RequestStore.removeChangeListener(this._onChange);
  },
  render: function(){
    var photosList = [];
    var photos = this.state.photos;
    for (var key in photos) {
      photosList.push(<Photo key={key} data={photos[key]} />);
    }
    return (
      <div className = "request col-xs-6">
        <RequestHeader />
        <ul>
          {photosList}
        </ul>
        <PhotoUpload />
      </div>
    );
  }
});

module.exports = Request;