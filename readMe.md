## GPTStore
Create and train GPTS from any information source and earn tokens by renting your created GPTs to others on a time-based access  

### Inspiration
Chat GPT and other chat LLMs are generalized in knowledge and are often times, behind in knowledge (knowledge cutoffs). New protocols and informations are not captured in their knowledge base and even captured informations are most times very shallow since there is a lot of informations to index. We saw this limitation firsthand when trying to use chatGpt to build on a new protocol and most times it provided inaccurate informations or was of very little help, this challenge got us thinking of a solution to this problem and this what birthed GPTStore.

### What it does
GPTStore allows anyone to easily create GPTs by provide a knowledge URL, define the pages to crawl and index, and some customizations such as name, description, price and logo. the GPT is created and trained on the information from the URL and listed on the marketplace.
Anyone can rent this GPTs and is granted access to the GPT based on their rented time, the holder can interact with the GPT for as long time as he has rented and when this time elapses (rent expired), chainlink automation triggers and access is revoked.

### How we built it

- #### Usage of Chainlink CCIP
GPTStore leverages Chainlink's Cross-Chain Interoperability Protocol (CCIP) to enable seamless communication and data transfer across different blockchains. The utilization of CCIP is fundamental to.

- #### Usage of Chainlink Automation
GPTStore leverages Chainlink Automation to automate and streamline ? at predefined intervals. Chainlink Automation ensures the timely and efficient execution of ?. This automation eliminates the need for manual intervention, reducing the risk of delays and enhancing the overall reliability of ?.

- #### Usage of Chainlink Price Feeds
GPTStore employs Chainlink Price Feeds to dynamically calculate the rent fee in ETH and LINK on-chain. By leveraging Chainlink's reliable and decentralized price oracle network, GPTStore ensures accurate and up-to-date conversion rates between ETH and LINK. This integration allows for real-time fee adjustments based on market fluctuations, providing a fair and transparent mechanism for determining proposal creation costs.

### Technology Stack
- Nextjs
- Express
- Solidity
- OpenAI
- chainlink automation
- chainlink price feed


### Challenges we ran into


### Accomplishments that we're proud of
All core functions, creation of assistant, GPT renting,  chainlink automation implementation, price feed for dynamically setting prices and CCIP for cross chain operation. 

### What we learned
This our first time building with chainlink CCIP, and we learned a lot in the process 

### What's next for GPTStore
- Extend to incorporate other web3 protocols,
- Create a platform where anyone can create Knowledge specific GPTs and rent out this GPTs to earn 

### Try out links
- (Github Repo)[]
- (website)[]
