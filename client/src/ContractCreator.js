import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
      currentTrades: []
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClick = async () => {
    const { drizzle, drizzleState } = this.props;
    const TradeCreator = drizzle.contracts.TradeCreator;

    const stackId = await TradeCreator.methods["addTrade"].cacheSend(
      this.state.buyer,
      this.state.seller,
      this.state.quantity,
      this.state.price,
      {
        from: drizzleState.accounts[0]
      }
    );
  };
  showContracts = () => {
    const { Trade } = this.props.drizzleState.contracts;
    const currentTrades = this.state.ctrAddresses.map(address =>
      Trade.at(address)
    );
    this.setState({ currentTrades });
  };

  componentDidMount() {
    const { drizzle } = this.props;
    const TradeCreator = drizzle.contracts.TradeCreator;
    // let drizzle know we want to watch the `myString` method
    const dataKey = TradeCreator.methods["getTrades"].cacheCall();
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }

  render() {
    const { classes } = this.props;
    // const { TradeCreator } = this.props.drizzleState.contracts;
    // const ctrAddresses = Array.from(TradeCreator.getTrades[this.state.dataKey]);
    // // this.setState({ ctrAddresses });
    // // // this.showContracts();

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
      </div>
    );
  }
}

ContractCreator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContractCreator);
