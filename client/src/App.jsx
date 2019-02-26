import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ContractDisplay from "./ContractDisplay.jsx";
// import ReadString from "./ReadString";
// import SetString from "./SetString";
import ContractCreator from "./ContractCreator.jsx";

import Button from "@material-ui/core/Button";

import trade_json from "./contracts/Trade.json";
const truffleTrade = require("truffle-contract")(trade_json);

const styles = theme => ({
  app: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    margin: theme.spacing.unit
  },
  root: {
    width: "100%",
    maxWidth: 500,
    marginTop: "15px",
    backgroundColor: theme.palette.background.primary
  }
});

class App extends Component {
  state = {
    loading: true,
    drizzleState: null,
    tradeAddresses: [],
    selectedTrade: "",
    buyer: "",
    seller: "",
    quantity: "",
    price: "",
    balance: "",
    contractState: ""
  };
  stateEnumMap = {
    0: "created",
    1: "funded",
    2: "in transit",
    3: "completed"
  };

  addAddress = address => {
    this.setState({ tradeAddresses: [address, ...this.state.tradeAddresses] });
  };

  handleClick = async input => {
    await this.setState({ selectedTrade: input });
    this.renderContract(input);
  };

  renderContract = async address => {
    const { drizzle } = this.props;
    const provider = drizzle.web3.givenProvider;
    truffleTrade.setProvider(provider);
    const contract = await truffleTrade.at(address);
    const tradeSummary = await contract.tradeSummary.call();
    const balance = await contract.getBalance();
    this.setState({
      buyer: tradeSummary.buyer,
      seller: tradeSummary.seller,
      quantity: tradeSummary.quantity.toNumber(),
      price: tradeSummary.price.toNumber(),
      balance: drizzle.web3.utils.fromWei(balance.toString(), "ether"),
      contractState: this.stateEnumMap[tradeSummary.state.toString()]
    });
  };

  componentDidMount() {
    const { drizzle } = this.props;
    console.log(drizzle);

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const {
      selectedTrade,
      buyer,
      seller,
      quantity,
      price,
      balance,
      contractState
    } = this.state;
    const contractButtons = this.state.tradeAddresses.map(address => {
      return (
        <Button
          onClick={() => this.handleClick(address)}
          variant="outlined"
          color="primary"
          className={classes.button}
          key={address}
          id={address}
        >
          {address}
        </Button>
      );
    });
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className={classes.app}>
        {/* <ReadString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        />
        <SetString
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
        /> */}
        <Grid>
          <ContractCreator
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            addAddress={this.addAddress}
            tradeAddresses={this.state.tradeAddresses}
          />
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">Deployed Contracts</ListSubheader>
            }
            className={classes.root}
          >
            {contractButtons}
          </List>
        </Grid>
        <ContractDisplay
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          selectedTrade={selectedTrade}
          buyer={buyer}
          seller={seller}
          price={price}
          quantity={quantity}
          balance={balance}
          contractState={contractState}
        />
        <Grid />
      </div>
    );
  }
}

export default withStyles(styles)(App);
