import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    minWidth: 750,
    height: 200,
    marginLeft: "20px",
    marginTop: "60px"
  },
  media: {
    objectFit: "cover"
  }
};

class ContractDisplay extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClick = name => {};

  componentDidMount() {}

  render() {
    const {
      classes,
      selectedTrade,
      buyer,
      seller,
      quantity,
      price
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="p">
            Contract Address: {selectedTrade}
          </Typography>
          <Typography component="p">Buyer: {buyer}</Typography>
          <Typography component="p">Seller: {seller}</Typography>
          <Typography component="p">
            Quantity: {this.state.quantity || ""}
          </Typography>
          <Typography component="p">
            Price per Unit: {this.state.price || ""}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Fund (Buyer)
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ContractDisplay.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractDisplay);
