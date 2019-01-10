import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
import { A } from "../Elements/Elements";

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
    return (
      <Wrapper>
        {this.state.events.map((event, i) => {
          return (
            <Event key={i}>
              <Image image={event.gsx$image.$t}>
                {event.gsx$flag.$t && <Flag>{event.gsx$flag.$t}</Flag>}
              </Image>
              {event.gsx$webdisplaydate.$t}
              <h1>
                {event.gsx$linktoregister.$t ? (
                  <A href={event.gsx$linktoregister.$t}>
                    {event.gsx$eventtitle.$t}
                  </A>
                ) : (
                  <span>{event.gsx$eventtitle.$t}</span>
                )
                // : {event.gsx$eventtitle.$t}
                }
              </h1>
            </Event>
          );
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Event = styled.div`
  flex-grow: 1;
  width: 25%;
  margin-right: 1rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  &:nth-child(3n + 3) {
    margin-right: 0;
  }

  h1 {
    // color: blue;
    font-size: 1rem;
  }
`;

const Image = styled.div`
  height: 0;
  padding-bottom: 100%;
  width: 100%;
  // background: url('https://drive.google.com/thumbnail?id=1bvC4SRreXx3SKsBoj3ui6EphifhAB_dm&sz=w400') no-repeat top left;
  background: ${props => `url(${props.image + "&sz=w400"}) no-repeat top left`};
  background-size: cover;
  display: flex;
  margin-bottom: 1rem;
`;

const Flag = styled.span`
  background-color: #000;
  color: #fff;
  font-size: 0.9rem;
  display: inline-block;
  text-align: center;
  padding: 0.6rem 1rem;
  margin-left: auto;
  margin-top: 1rem;
  height: fit-content;
  text-transform: uppercase;
`;
