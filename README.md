# The Privacy Protocol

A link to the live app can be found [here](https://privacy-protocol-frontend.vercel.app/)

There currently exist many decentralized options for storing files such as IPFS and Filecoin. However, storing sensitive records such as medical documents in an unencrypted format poses many risks as anyone observing the blockchain can see files being uploaded. Maintaining access to decryption keys to these files and links to their storage location for long periods of time increases the burden of work on individuals. A solution is to index these files in an encrypted format and to make it possible to generate the symmetric encryption/decryption key with just a user's iris scan and pin code. This could solve the problem of maintaining access to these files for a lifetime as long as the user remembers their pin code.

The smart contract code for the procotol can be found [here](https://github.com/DanielNugent/Privacy-Protocol-Contract)

The Iris extraction and hashing script can be found [here](https://github.com/DanielNugent/Iris-Hashing)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
