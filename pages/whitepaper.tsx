import React, { Fragment } from "react";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

const Centering = styled.div`
  text-align: center;
`;

const Whitepaper: NextPage = () => {
  return (
    <Fragment>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        component="div"
        style={{ marginTop: 20, zIndex: 100 }}
      >
        Whitepaper
      </Typography>
      <Typography id="introduction" variant="h4" gutterBottom component="div">
        Introduction
      </Typography>
      <Typography variant="body1" gutterBottom>
        There currently exist many decentralized options for storing files such
        as{" "}
        <a rel="noopener noreferrer" target="_blank" href="https://ipfs.io/">
          IPFS
        </a>
        ,{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.storj.io/"
        >
          STORJ
        </a>{" "}
        and{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://filecoin.io/"
        >
          Filecoin
        </a>
        . However, storing sensitive data such as medical data in an unencrypted
        format poses many risks as anyone observing the blockchain can see files
        being uploaded. Maintaining access to decryption keys to these files and
        links to their storage location for long periods of time increases the
        burden of work on individuals. A solution to index these files in an
        encrypted format and to maintain decryption keys with just a user&apos;s
        iris scan and pin code could solve this problem as unless the user loses
        their eye or forgets their pincode they will have lifetime access to any
        sensitive files they wise to store.
      </Typography>
      <Typography id="iris" variant="h4" gutterBottom component="div">
        Iris Scans
      </Typography>
      <Typography id="about" variant="h5" gutterBottom component="div">
        About
      </Typography>
      <Typography variant="body1" gutterBottom>
        An Iris Scan is a method of biometric identification which is created by
        using mathematic patterns of one or both of a user&apos;s eyes. It has
        been shown that iris scans have a large amount of entropy; that is in a
        large population there is very little chance of having cross-detection
        between two different user&apos;s scans. Using Libor Masek&apos;s iris
        recognition system <a href="#reference_1">[1]</a> a user can obtain
        their iris scan in a binary format. We however cannot register a user
        with their raw biometric data as it would expose their identity. To
        solve this we can use the hash of their iris scan instead.
      </Typography>
      <Centering>
        <Image
          src="/irisstock.jpeg"
          alt="Picture of the author"
          width={608}
          height={360}
        />
      </Centering>
      <Typography id="LSH" variant="h5" gutterBottom component="div">
        Locality Sensitive Hashing
      </Typography>
      <Typography variant="body1" gutterBottom>
        <a
          target="_blank"
          href="https://en.wikipedia.org/wiki/Locality-sensitive_hashing"
          rel="noopener noreferrer"
        >
          Locality Sensitive Hashing
        </a>{" "}
        (LSH) is an algorithmic technique which hashes similar inputs to buckets
        with a high probability. Normally hashing possesses what is known as
        the &ldquo;avalanche effect&ldquo;, essentially meaning that a single
        bit change in the input will result half of the output bits flipping.
        This is desirable as it prevents attackers from predicting the input
        given only the output. In our protocol, we can use LSH to obtain the
        original hash of the iris scan the user used to register with the
        protocol with a new iris scan, in order to recreate their credentials.
        This is necessary as two iris scans on the same individual may result in
        a slightly different scan due to the angle, camera used, and lighting
        conditions which may be impossible to recreate.
        <SyntaxHighlighter language="javascript" style={docco}>
          {`Nilsimsa method\nString 1: The quick brown fox\nString 2: The quicker brown fox\nString 1 digest: 0a31b4be01a0808a29e0ec60e9a258545dc0526770022348380a2128708f2fdb\nString 2 digest: 1a31bc3e02a080a28b642864ea224857ddd0526f78022b48380e2269329d3fdb\nScore: 91`}
        </SyntaxHighlighter>
        In the example above, both strings are hashed using LSH, then we obtain
        the hamming distance between the two digests. The hamming distance is
        the total count of all the bit differences between the two digests,
        which can be done using the XOR operation and counting all the 1s. By
        setting a certain threshold value we can find registered scans similar
        to ours.
      </Typography>
      <Typography id="system" variant="h4" gutterBottom component="div">
        The proposed system
      </Typography>
      <Typography id="register" variant="h5" gutterBottom component="div">
        Register
      </Typography>
      <Typography variant="body1" gutterBottom>
        The <b>Register</b> section is used to add a user&apos;s Hash of Scan
        (HoS) to the smart contract internal data. For the purpose of the
        application, this is permissionless, i.e. anyone can register a 256 bit
        hash of their iris scan.{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://en.wikipedia.org/wiki/SimHash"
        >
          SimHash
        </a>{" "}
        should be used to hash it for security reasons. This could be modified
        in theory to only allow approved entities such as hospitals register
        their patient&apos;s HoS.
      </Typography>
      <Typography id="transactions" variant="h5" gutterBottom component="div">
        Transactions
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Transactions</b> are how users map their <i>PublicID</i> to the
        records are storing. The user creates a transaction which is a tuple of
        their public and the Hash of the Record (<i>HoR</i>). For all normal
        hash functions; that is any non-LSH function, the user should use a
        modern hashing algorithm such as{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://en.wikipedia.org/wiki/SHA-3"
        >
          SHA-3
        </a>{" "}
        .
        <Box sx={{ fontStyle: "italic", m: 2, textAlign: "center" }}>
          Tx = (PublicID, HoR)
        </Box>
        The <i>PublicID</i> is recreated on demand by the user by taking a hash
        of the concatenation of their <i>HoS</i>, Date of Birth (<i>DoB</i>),
        gender and Country of Birth (<i>CoB</i>).{" "}
        <Box sx={{ fontStyle: "italic", m: 2, textAlign: "center" }}>
          PublicID = H(HoS || DoB || Gender || CoB)
        </Box>
      </Typography>
      <Typography id="identifiers" variant="h5" gutterBottom component="div">
        Identifiers
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>Identifiers</b> are how users anonymise locations to records stored
        away from their <i>PublicID</i>. The identifier is generated using a
        hash of the concatenation of their <i>PublicID</i>, <i>PrivateID</i> and
        the <i>HoR</i>.
        <Box sx={{ fontStyle: "italic", m: 2, textAlign: "center" }}>
          TxID = H(PublicID || PrivateID || HoR)
        </Box>
        The <i>PrivateID</i> is generated using a hash of the concatenation of
        their HoS and a PIN.
        <Box sx={{ fontStyle: "italic", m: 2, textAlign: "center" }}>
          PrivateID = H(HoS || PIN)
        </Box>
        The user needs to remember or store their PIN securely over the course
        of their lifetime. There is no preset minimum length for the PIN and a
        lookup table is used to map from a numeric PIN to a 256 bit binary
        digit. When the user wants to retrieve an encrypted record they use the
        recreated identifier to lookup the file location.
        <Box sx={{ fontStyle: "italic", m: 2, textAlign: "center" }}>
          TxID --{">"} Enc<sub>PublicID+PrivateID</sub>(Record)
        </Box>
        Symmetric encryption is used to encrypt and decrypt the records. The
        first 128 bits of the key is the first 128 bits of the <i>PublicID</i>{" "}
        and the second 128 bits is the last 128 bits of the <i>PrivateID</i>.
        The entropy of the lookup table is 256 bits which is very large and the
        hash function has an equal chance of placing the output in each bucket,
        thus each <i>TxID</i> must be unique and the user would have to slightly
        alter the file in some way if in the extremely unlikely event that they
        generate a <i>TxID</i> of an already existing identifier.
      </Typography>
      <Typography id="custody" variant="h5" gutterBottom component="div">
        Custody of record storage
      </Typography>
      <Typography variant="body1" gutterBottom>
        The ownace is on the user to store their records in a suitable manner.
        Using a decentralized option such as IPFS is one particular solution if
        one wishes to persist data for a long time. Sensitive information should{" "}
        <b>always</b> be encrypted and should not be stored in plaintext as
        anyone on the blockchain can see where these files are stored. Using
        centralized options such as Google Drive or Dropbox is an alternative
        solution but users should be aware these are not censorship proof and
        may be have access restricted to them in certain juristictions.
      </Typography>
      <Typography id="normal_usage" variant="h5" gutterBottom component="div">
        Normal Usage
      </Typography>
      <Image
        src="/flowchart.jpg"
        alt="Picture of the author"
        width={800}
        height={678}
      />
      <Typography variant="body1" gutterBottom>
        As two transactions on the blockchain are required to store a mapping to
        the encrypted record, in best practices, these transactions should be
        executed using different accounts on the blockchain to prevent their{" "}
        <i>PublicID</i> being associated with a certain record location and
        after a random period of time.
      </Typography>
      <Typography id="references" variant="h4" gutterBottom component="div">
        References
      </Typography>
      <Typography
        id="reference_1"
        variant="body1"
        gutterBottom
        style={{ marginBottom: 20 }}
      >
        [1] Libor Masek, Peter Kovesi. MATLAB Source Code for a Biometric
        Identification System Based on Iris Patterns. The School of Computer
        Science and Software Engineering, The University of Western Australia.
        2003.
      </Typography>
    </Fragment>
  );
};
export default Whitepaper;
