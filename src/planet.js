import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const styles = theme => ({
  bigIndicator: {
    height: 5
  }
});

export class Planet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planets: [],
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.planetsDetails = this.planetsDetails.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  favorite(planet) {
    const planets = this.state.planets.map(i => {
      if (i.id === planet.id) {
        i.isFavourite = !i.isFavourite;
      }
      return i;
    });

    this.setState({
      planets
    });
  }

  planetsDetails() {
    const config = {
      url: `https://assignment-machstatz.herokuapp.com/planet`,
      method: "GET",
      withCredentials: false
    };
    axios(config).then(res => {
      this.setState(
        {
          planets: res.data
        },
        () => {
          console.log(this.state.planets, "plants");
        }
      );
    });
  }

  componentDidMount() {
    this.planetsDetails();
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="off"
            aria-label="scrollable prevent tabs example"
          >
            <Tab label="Planets" aria-label="phone"></Tab>
            <Tab label="Favorite" aria-label="favorite"></Tab>
          </Tabs>
        </AppBar>
        <div key="tab-content">
          {value === 0 && (
            <Typography>
              {" "}
              <div>
                {this.state.planets.map(planet => (
                  <Card
                    variant="outlined"
                    style={{
                      width: "200px",
                      display: "inline-block",
                      marginLeft: "13px"
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {planet.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          this.favorite(planet);
                        }}
                      >
                        {planet.isFavourite ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </Typography>
          )}
          {value === 1 && (
            <Typography>
              {this.state.planets
                .filter(i => i.isFavourite)
                .map(planet => (
                  <Card
                    variant="outlined"
                    style={{
                      width: "200px",
                      display: "inline-block",
                      marginLeft: "13px"
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {planet.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        onClick={() => {
                          this.favorite(planet);
                        }}
                      >
                        {planet.isFavourite ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
            </Typography>
          )}
        </div>
      </div>
    );
  }
}

Planet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Planet);
