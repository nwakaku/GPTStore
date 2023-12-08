# GPTStore

## Overview
GPTStore is a platform that empowers users to easily create and train GPTs models by leveraging information from any source. Users can earn tokens by renting out their created GPTs, providing others with time-based access to the GPTs.

## Inspiration
Our inspiration for GPTStore stems from a shared desire to empower individuals, particularly developers, with seamless access to accurate and real-time domain-specific information. We envision a platform where users can engage in insightful conversations and queries with a model, fostering an enjoyable and effective way to learn new concepts.

The motivation behind GPTStore also arises from the limitations of current generalized models. Existing language models often face challenges with knowledge cutoffs, hindering their ability to provide timely and precise information, especially in rapidly evolving domains. GPTStore seeks to address these issues by offering a solution that goes beyond generic knowledge and embraces the dynamism required in today's information landscape.

## Functionality
GPTStore facilitates the creation of GPTs by allowing users to provide a knowledge URL, define number of pages for crawling and indexing, and customize details such as name, description, price, and logo. The created GPTs are then listed on the marketplace for others to rent. Renters gain access to the GPTs based on their rented time, and when the rental period expires, Chainlink automation triggers access revocation.

## Technology Stack
- Next.js
- Express
- Solidity
- OpenAI
- Chainlink Automation
- Chainlink Price Feeds

## Implementation Details

- **Chainlink CCIP Integration**: GPTStore seamlessly communicates and transfers data across different blockchains using Chainlink's Cross-Chain Interoperability Protocol (CCIP).

- **Chainlink Automation**: GPTStore automates predefined tasks at regular intervals using Chainlink Automation, ensuring timely and efficient execution without manual intervention.

- **Chainlink Price Feeds**: GPTStore utilizes Chainlink Price Feeds to dynamically calculate rent fees in AVAX and LINK to USD on-chain. This integration provides accurate and real-time conversion rates, allowing for fair and transparent fee adjustments based on market fluctuations.

## Accomplishments

GPTStore boasts successful implementation of all core functionalities, including assistant creation, GPT renting, Chainlink automation, price feed integration for dynamic pricing, and CCIP for cross-chain operations.

## Learning Experience

Building with Chainlink CCIP for the first time was a valuable learning experience, enriching the team with insights into seamless cross-chain communication.

## Future Roadmap
As GPTStore evolves, our vision extends beyond the current capabilities. We aim to diversify by incorporating additional web3 protocols, creating a vibrant ecosystem where users can craft specialized GPTs tailored to distinct knowledge domains. The roadmap envisions a dynamic platform, fostering a community-driven marketplace for knowledge-sharing through rented GPTs.

## Try It Out

- [GitHub](https://github.com/nwakaku/GPTStore)
- [Website](https://github.com/nwakaku/GPTStore)
