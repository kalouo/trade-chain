import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import trade_json from "./contracts/Trade.json";
const truffleTrade = require("truffle-contract")(trade_json);

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 425
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 425
  },
  button: {
    margin: theme.spacing.unit,
    width: 425
  },
  input: {
    display: "none"
  }
});

class ContractCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      buyer: "",
      seller: "",
      carrier: "",
      quantity: "",
      price: "",
      tradeAddresses: []
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClick = async () => {
    this.addContract();
  };

  addContract = () => {
    const { drizzle, drizzleState } = this.props;
    const provider = drizzle.web3.givenProvider;
    truffleTrade.setProvider(provider);
    truffleTrade
      .new(
        this.state.buyer,
        this.state.seller,
        this.state.carrier,
        this.state.quantity,
        this.state.price,
        { from: drizzleState.accounts[0] }
      )
      .then(res => {
        this.props.addAddress(res.address);
      })
      .then(async () => {
        const contract = await truffleTrade.at(this.props.tradeAddresses[0]);
        alert(`Contract ${contract.address} is on the blockchain`);
      });
  };
  // .then(res => {
  //   this.setState({
  //     tradeAddresses: [res.address, ...this.state.tradeAddresses]
  //   });
  // })
  // .then(async () => {
  //   const contract = await truffleTrade.at(this.state.tradeAddresses[0]);
  //   alert(`Contract ${contract.address} is on the blockchain`);
  //   return contract.address;
  // })

  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Buyer"
            className={classes.textField}
            onChange={this.handleChange("buyer")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Seller"
            className={classes.textField}
            onChange={this.handleChange("seller")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Carrier"
            className={classes.textField}
            onChange={this.handleChange("carrier")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Quantity"
            className={classes.textField}
            onChange={this.handleChange("quantity")}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Price Per Unit"
            className={classes.textField}
            onChange={this.handleChange("price")}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.handleClick}
          >
            Create
          </Button>
        </form>
      </div>
    );
  }
}

ContractCreator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractCreator);
