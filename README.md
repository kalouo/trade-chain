### IDEA

Managing risk remains a cornerstone of importing or exporting goods - and some key risks revolve around trust: will the buyer pay and will the seller deliver?

Today, managing these risks relies on an ecoysystem of intermediaries and layers of physical paperwork. Processes are manual and slow as a result.

Blockchain - as a "technology of trust" - holds the following possibilities in the context of international trade:

- The ability to digitally hold the title to assets.
- The ability to digitally track inspections and certifications.
- The ability to digitally record contractual arrangements and execute them alogrithmically.

More background on the use case can be found [here](https://www.bcg.com/publications/2018/reality-check-blockchain-commodity-trading.aspx).

With a background in international trade, I decided to try my hand at prototyping a smart contract suited for this use case.

This (d)app implements the basic flow of a blockchain-enabled trade, namely: the seller can only claim payment from buyer once a third party has validated the seller's performance on the blockchain.

Future features:

- Automated tests
- Authentication
- Adapting UI/UX and smart contract(s) to real world use case.

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

_This project was undertaken as a student at [Code Chrysalis](https://www.codechrysalis.io/)_
