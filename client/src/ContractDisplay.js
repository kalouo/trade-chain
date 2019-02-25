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
    minWidth: 600,
    height: 250,
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
  handleClick = () => {
    this.fundContract();
  };
  fundContract = async () => {
    const {
      drizzle,
      drizzleState,
      selectedTrade,
      quantity,
      price
    } = this.props;
    await drizzle.web3.eth
      .sendTransaction({
        from: drizzleState.accounts[0],
        to: selectedTrade,
        value: drizzle.web3.utils.toWei((quantity * price).toString(), "ether")
      })
      .then(res => {
        if (res.status) alert("Contract is funded.");
      })
      .catch(err => {
        if (err.message.includes("Only buyer can call this")) {
          alert("Only buyer can seed contract.");
        }
      });
  };

  componentDidMount() {}

  render() {
    const {
      classes,
      selectedTrade,
      buyer,
      seller,
      quantity,
      price,
      balance,
      contractState
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography component="p">
            Contract Address: {selectedTrade}
          </Typography>
          <Typography component="p">Buyer: {buyer}</Typography>
          <Typography component="p">Seller: {seller}</Typography>
          <Typography component="p">Quantity: {quantity}</Typography>
          <Typography component="p">Price per Unit: {price}</Typography>
          <Typography component="p">Contract Balance: {balance}</Typography>
          <Typography component="p">Status: {contractState}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={this.handleClick}>
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
