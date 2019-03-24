### ARCHITECTURE

The project is being developed with the Truffle Suite.

- _Ganache_ provides the development blockchain.
- _Truffle_ provides a "one-stop shop" framework for smart contract development including functionality such as network management, automated testing and compilation of Solidity code.
- _Drizzle_ provides a collection of front-end libraries that facilitate creating dapp front-ends. It encapsulates _Web3_ functionality and your contract methods.

Otherwise, _React_ was used to create the front-end and _Metamask_ is used as the Ethereum client.

A simplified idea of the architecture can ve visualized as follows:

<div>
<img alt="Architecture" src ="./client/assets/image.png" width="800">
</div>

### SET UP

In the project directory, start by installing truffle

```
yarn global add truffle
```

Then, compile your solidity contracts and migrate them to the network:

```
truffle compile
truffle migrate
```

Then, change your working directory to the client and install yarn packages:

```
cd client
yarn install
```

Then, download [Ganache](https://truffleframework.com/ganache) (to run a test blockchain on your machine) and make sure you have [Metamask](https://metamask.io/) installed on your Chrome browser.

On Metamask, chose to connect to a local network by clicking on the top-right circle. Ensure that the localhost ports are set to the same in Ganache, Metamask and the _truffle-config.js_ file.

The interface should now be visible. You can create multiple accounts on Metamask to simulate usage by distinct nodes.

Notes for usage:

- Enter buyer, seller and carrier as **Ethereum addresses**.
- Once the contract is created, you can click on it to render it on the table on the right.
