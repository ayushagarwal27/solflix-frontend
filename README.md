# Solflix dApp

Live Url: https://solflix-v.vercel.app/

On-Chain video rental platform. The dApp lets user to rent videos, where authentication and authorization is done via smart program deployed on Solana Devnet


### Frontend Setup


```shell 
    pnpm i
```
```shell 
    npm run dev
```

For cloudinary integration, create an account here https://cloudinary.com/ and define  keys in .env

```
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
 ```

### Libraries and Frontend Flow

- Next.js (UI Framework)
- Daisy UI, TawilindCss (Styling)
- Cloudinary (Video Storage, Video Player)
- Vercel (Deployment)
- Solana Wallet Adapter, Anchor, web3
    - (connecting with solana cluster, connecting wallet, sending transactions)

### 3 pages
1. All Videos page
    - get all the videos uploaded by creators
    - send getAllAccount transaction, with specific PDA data size of `create_account`
    - display the data in cards

2. Upload page
    - enable creator to upload video on cloudinary
    - post endpoint for same is defined under api/upload directory
    - once uploaded, creator can enter information in form to create PDA for same

3. Access page
    - Once user click on play now button of Video Card
    - We check whether `access_account` PDA is there
    - If PDA exists, user is redirected from homepage to access page
    - If not, `access_account` PDA is created, deducting balance from user account and redirecting user to access page.