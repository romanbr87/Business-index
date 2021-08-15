import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch} from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import Item from "./Item";
import "../../styles/style.css";

export default function Itemdata(props) {
  return (
    <React.Fragment>
      <Head>
        <meta charset="utf-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width" />
        <meta name="generator" content="slidify" />
        <meta name="google" content="notranslate" />
        <meta name="robots" content="follow, index" />
        <link rel="canonical" href="https://romanbr87.github.io/index/index.html" />

        <meta name="description" content={props.data.gsx$desc + props.data.gsx$desc2} />
        <meta name="author" content="https://www.facebook.com/RonenBr60/" />

        <meta property="og:description" content={props.data.gsx$desc + props.data.gsx$desc2} />
        <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
        <meta property="og:title" content={props.data.gsx$name} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="אינדקס עסקים" />
        <meta property="og:image" content={props.data.gsx$logo} />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
        <title>{props.data.gsx$name}</title>
      </Head>
      <nav className="navbar navbar-inverse" style={{ textAlign: 'left' }}>
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            <li title="דף הבית"><a href="/"><i className="glyphicon glyphicon-home active"></i> דף הבית</a></li>
          </ul>
        </div>
      </nav>

      <div className="container" style={{ marginTop: '-6%', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
        <Item className="col-lg-4 col-md-4 col-sm-12 col-xs-12 col-lg-offset-4 col-md-offset-4" data={props.data[0] } ua={props.ua} isLinkable={false} />
      </div>
    </React.Fragment>
  );
}
