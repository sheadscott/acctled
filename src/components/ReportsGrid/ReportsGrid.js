import React, { Component } from "react";
import styled from "styled-components";
import Axios from "axios";
import Reports from "../Reports/Reports";

export default class ReportsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      tags: [],
      activeTags: [],
      activeReports: [],
      searchResults: []
    };
  }

  componentDidMount() {
    const sheetId = "1VD4KvNmgoBBoVo2ukDLtD_CNFiYnrWcw2CPRIb2Ba3M";
    Axios.get(
      `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`
    ).then(response => {
      const reports = response.data.feed.entry;
      console.log(reports);
      this.setState({ reports, activeReports: reports }, () => {
        this.setState({ tags: this.getUniqueTags() });
      });
    });
  }

  filterSessions = (allSessions, sessionTag) => {
    return allSessions.filter(session => session.gsx$session.$t === sessionTag);
  };

  filterReportsByTag = activeTags => {
    return this.state.reports.filter(report => {
      const reportTags = report.gsx$hashtags.$t.trim().split(/\s+/);
      return (
        // return true if report has at least one active tag
        activeTags.some(tag => reportTags.indexOf(tag) > -1)
      );
    });
  };

  activateSessions = key => {
    console.log("activateSessions state:", this.state);
    // Clear activeTags if any
    // this.setState({ activeTags: [] });
    const activeSessions = this.filterSessions(this.state.reports, key);
    this.setState({ activeSessions }, this.filterTagsBySession);
  };

  getUniqueTags = () => {
    // Get a unique array of tags
    let tags = [];
    this.state.reports.forEach(function(item) {
      const tagArray = item.gsx$hashtags.$t.trim().split(/\s+/);
      tags = [...tags, ...tagArray];
    });
    // Convert the array to unique values
    return [...new Set(tags)];
  };

  toggleTag = tag => {
    console.log(tag);
    // Make a copy of current state activeTags
    let activeTags = [...this.state.activeTags];
    console.log(activeTags);
    // Add or remove tag from activeTags
    activeTags.includes(tag)
      ? activeTags.splice(activeTags.indexOf(tag), 1)
      : activeTags.push(tag);

    // this.filterSessionsByTag(activeTags);
    activeTags.length > 0
      ? this.setState({ activeReports: this.filterReportsByTag(activeTags) })
      : this.setState({ activeReports: this.state.reports });

    this.setState({ activeTags }, () => {
      // Cause tags to Re-Render
      const tags = [...this.state.tags];
      console.log(tags);
      this.setState({ tags });
    });
  };

  handleSearchFormSubmit = e => {
    console.log(e.target);
    e.preventDefault();
  };

  handleSearch = e => {
    console.log(e.target.value);
    const searchResults = e.target.value
      ? this.state.tags
          .filter(tag => {
            // Here we need to find cities that match
            const regex = new RegExp(e.target.value, "gi");
            return tag.match(regex);
          })
          .sort()
      : [];
    this.setState({ searchResults });
    // e.preventDefault();
  };

  handleClose = e => {
    this.setState({ searchResults: [] });
    // e.preventDefault();
  };

  render() {
    return (
      <ReportsWrapper>
        {this.state.tags.length > 0 && (
          <TagWrapper>
            <Tags>
              {this.state.tags.map((tag, i) => (
                <Tag
                  key={i}
                  onClick={() => this.toggleTag(tag)}
                  active={this.state.activeTags.includes(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </Tags>
            <SearchForm onSubmit={this.handleSearchFormSubmit}>
              <input
                type="text"
                placeholder="Search for Tag"
                onChange={this.handleSearch}
              />
              <div>
                {this.state.searchResults.length > 0 && (
                  <ul>
                    <button className="close" onClick={this.handleClose}>
                      &times;
                    </button>
                    {this.state.searchResults.map((result, i) => (
                      <li key={i}>
                        <Tag
                          onClick={() => this.toggleTag(result)}
                          active={this.state.activeTags.includes(result)}
                        >
                          {result}
                        </Tag>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </SearchForm>
          </TagWrapper>
        )}
        <Reports elements={this.state.activeReports} tags={this.state.tags} />
      </ReportsWrapper>
    );
  }
}

const ReportsWrapper = styled.div``;

const TagWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 955px) {
    display: block;
  }
`;

const Tags = styled.div`
  flex: 3;
  margin-bottom: 10px;
`;

const SearchForm = styled.form`
  flex: 1;
  input {
    margin-bottom: 2px;
  }
  div {
    position: relative;
    ul {
      background: rgba(255, 255, 255, 0.95);
      padding: 0.4rem;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      list-style: none;
      margin-left: 0;
      z-index: 9999;

      li {
        // border-bottom: 1px solid #ccc;
      }

      .close {
        margin: 0;
        padding: 0;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: #666;
        color: #fff;
        font-size: 1.2rem;
        width: 1rem;
        height: 1.15rem;
        text-align: center;
        line-height: 1rem;
        cursor: pointer;
        &:hover {
          background: #ccc;
        }
      }
    }
  }
`;

const Tag = styled.button`
  display: inline-block;
  padding: 6px;
  margin: 4px;
  background: ${props =>
    props.active ? "rgb(40, 62, 85)" : "rgb(193, 196, 197)"};
  color: ${props => (props.active ? "white" : "#424242")};
  border-radius: 4px;
  font-size: 0.8em;
  cursor: pointer;
  transition: background 0.25s ease-out;

  &:hover {
    background: ${props => (props.active ? "#4e79a6" : "#efefef")};
  }
`;
