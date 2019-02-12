import React, { Component } from "react";
import styled from "styled-components";
import { Heading } from '../Elements/Elements';
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
        <Heading as="h2" caps={true} mb={'1.5rem'} fontSize={"1.3rem"}>Events & Important Dates</Heading>

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

        <a href="/calendar">More Events ></a>
      </MainWrapper>
    );
  }
}

const MainWrapper = styled.div`
  background: #f1f1f1;
  padding: 2rem;
  height: 100%;
`;
const EventWrapper = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    margin-bottom: 1rem;
    font-weight: bold;
  }

  span {
    margin-left: 1rem;
    font-weight: normal;
    text-decoration: none;
  }
`;

const Event = styled.li``;
