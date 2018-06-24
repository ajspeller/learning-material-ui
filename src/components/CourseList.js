import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful';
import Course from '../components/Course';

const SPACE_ID = 'b4tx9el1ck0p';
const ACCESS_TOKEN =
  'be454056a64b6027cb80275ec792d557fa147b21c14f6484499fccbfd27cb892';

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

class CourseList extends Component {
  state = {
    courses: [],
    searchSting: ''
  };

  constructor() {
    super();
    this.getCourses();
  }

  getCourses = () => {
    client
      .getEntries({
        content_type: 'courses',
        query: this.state.searchSting
      })
      .then(res => {
        this.setState({
          courses: res.items
        });
      })
      .catch(err => {
        console.log('Error occured while fetching data');
        console.log(err);
      });
  };

  onSearchInputChange = event => {
    if (event.target.value) {
      this.setState({
        searchString: event.target.value
      });
    } else {
      this.setState({
        searchSting: ''
      });
    }
    this.getCourses();
  };

  render() {
    return (
      <div>
        {this.state.courses ? (
          <div>
            <TextField
              style={{ padding: 24 }}
              id="searchInput"
              placeholder="Search for Courses"
              margin="normal"
              onChange={this.onSearchInputChange}
            />
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.courses.map(currentCourse => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <Course course={currentCourse} />
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          'No courses found'
        )}
      </div>
    );
  }
}

export default CourseList;
