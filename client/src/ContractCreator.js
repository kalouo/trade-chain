import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import JSONTrade from "./contracts/Trade.json";

const truffleTrade = require("truffle-contract")(JSONTrade);

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
      stackId: null,
      dataKey: null,
      buyer: "",
      seller: "",
      quantity: "",
      price: "",
      ctrAddresses: [],
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
    // const ctrAddresses = await TradeCreator.getTrades[this.state.dataKey];
    const provider = drizzle.web3.givenProvider;
    truffleTrade.setProvider(provider);
    truffleTrade
      .new(
        this.state.buyer,
        this.state.seller,
        this.state.quantity,
        this.state.price,
        { from: drizzleState.accounts[0] }
      )
      .then(res => {
        this.setState({
          tradeAddresses: [res.address, ...this.state.tradeAddresses]
        });
      })
      .then(async () => {
        const contract = await truffleTrade.at(this.state.tradeAddresses[0]);
        alert(`Contract ${contract.address} is on the blockchain`);
      });
  };

  componentDidMount() {
    // const { drizzle } = this.props;
    // const TradeCreator = drizzle.contracts.TradeCreator;
    // // let drizzle know we want to watch the `getTrades` method
    // const dataKey = TradeCreator.methods["getTrades"].cacheCall();
    // // save the `dataKey` to local component state for later reference
    // this.setState({ dataKey });
  }

  render() {
    const { classes } = this.props;
    // const { TradeCreator, Trade } = this.props.drizzleState.contracts;
    // const ctrAddresses = TradeCreator.getTrades[this.state.dataKey];

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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.addContract}
        >
          Testing
        </Button>
      </div>
    );
  }
}

ContractCreator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractCreator);
