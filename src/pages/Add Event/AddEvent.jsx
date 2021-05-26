import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import cardImage from "../../assets/image/Event.jpg";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

export default class AddEvent extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: "",
      title: "",
      location: "",
      date: "",
      participant: "",
      note: "",
    };
    this.baseState = this.state;
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleInputChange(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }
  submit(e) {
    e.preventDefault();
    if (this.validator.allValid()) {
      const { selectedFile, title, location, date, participant, note } =
        this.state;
      const data = new FormData();
      data.append("image", selectedFile);
      data.append("title", title);
      data.append("location", location);
      data.append("date", date);
      data.append("participant", participant);
      data.append("note", note);
      if (!selectedFile) {
        alert("Please input an image for the card");
      } else {
        let apiURL = "http://localhost:3000/event";
        axios
          .post(apiURL, data)
          .then((res) => {
            alert("Adding an event successful!");
            localStorage.removeItem("event");
            this.setState(this.baseState);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      this.forceUpdate();
    }
  }
  componentDidMount() {
    this.eventData = JSON.parse(localStorage.getItem("event"));

    if (localStorage.getItem("event")) {
      this.setState({
        title: this.eventData.title,
        location: this.eventData.location,
        date: this.eventData.date,
        participant: this.eventData.participant,
        note: this.eventData.note,
      });
    } else {
      this.setState({
        title: "",
        location: "",
        date: "",
        participant: "",
        note: "",
      });
    }
  }
  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("event", JSON.stringify(nextState));
  }
  render() {
    const { title, location, date, participant, note } = this.state;
    return (
      <React.Fragment>
        <div className="card-container">
          <Row>
            <Col md="12" lg="6">
              <div className="px-4 py-4">
                <h4>+ Add Event</h4>
                <br />

                <Form>
                  <div className="d-flex justify-content-between">
                    <Input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Title"
                      value={title}
                      onChange={this.onChange}
                      required
                    />
                    <Input
                      className="ml-3"
                      type="text"
                      name="location"
                      id="location"
                      placeholder="Location"
                      required
                      value={location}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="d-flex justify-content-between">
                    <Input
                      type="text"
                      name="participant"
                      id="participant"
                      placeholder="Participant"
                      required
                      value={participant}
                      onChange={this.onChange}
                    />
                    <Input
                      className="ml-3"
                      type="text"
                      name="date"
                      id="date"
                      onFocus={(e) => {
                        e.currentTarget.type = "date";
                        e.currentTarget.focus();
                      }}
                      placeholder="Date"
                      required
                      value={date}
                      onChange={this.onChange}
                    />
                  </div>
                  <Input
                    type="textarea"
                    rows="4"
                    name="note"
                    id="exampleText"
                    placeholder="Note"
                    required
                    value={note}
                    onChange={this.onChange}
                  />
                  <div className="validator">
                    {this.validator.message("note", this.state.note, "min:20")}
                  </div>

                  <FormGroup className="mt-2">
                    <Label for="upload_file">Upload Picture</Label>
                    <Input
                      color="primary"
                      type="file"
                      name="file"
                      id="upload_file"
                      onChange={this.handleInputChange.bind(this)}
                    />
                  </FormGroup>
                  <div className="d-flex justify-content-end">
                    <Button
                      onClick={this.submit.bind(this)}
                      type="submit"
                      color="primary"
                    >
                      Add Event
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
            <Col lg="6">
              <img className="image-dashboard" src={cardImage} alt="" />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
