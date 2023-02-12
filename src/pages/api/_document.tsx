import { NextPage } from "next";
import { Html, Head, NextScript, Main } from "next/document";
import Script from "next/script";

interface Props {}

const _document: NextPage<Props> = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default _document;
