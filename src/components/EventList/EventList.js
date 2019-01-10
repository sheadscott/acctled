import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";

export default class EventList extends Component {
  state = {
    events: []
  };

  componentDidMount() {
    const sheetId = "1feRPiGXCX19MZofZ2LgLgYbvxpGJYFByhJ6ZAlOkWiM";
    Axios.get(
      `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`
    ).then(response => {
      const events = response.data.feed.entry;
      events.sort((a, b) => {
        // Take the day of the week off the front of the string and convert to Date # value
        // Probably unnecessary since the events are returned in the order in sheet
        a = new Date(a.gsx$dateforautocheck.$t.replace(/.*?,\s/, "")).valueOf();
        b = new Date(b.gsx$dateforautocheck.$t.replace(/.*?,\s/, "")).valueOf();
        return a - b;
      });
      console.log(events);
      this.setState({ events });
    });
  }

  render() {
    const listLength = this.props.length;
    return (
      <MainWrapper>
        <h2>Events & Important Dates</h2>

        <h3>This Week</h3>
        <EventWrapper>
          {this.state.events.slice(0, listLength - 1).map((event, i) => {
            return (
              <Event key={i}>
                {event.gsx$webdisplaydate.$t}
                <span>{event.gsx$eventtitle.$t}</span>
              </Event>
            );
          })}
        </EventWrapper>

        <a href="#0">More Events ></a>
      </MainWrapper>
    );
  }
}

const MainWrapper = styled.div`
  background: #ccc;
  padding: 1rem;
  padding-left: 2rem;
  height: 100%;
`;
const EventWrapper = styled.ul`
  margin: 0;
  margin-left: 1.5rem;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  span {
    color: blue;
    display: inline-block;
    margin-left: 1rem;
    font-weight: normal;
    text-decoration: none;
  }
`;

const Event = styled.li``;
