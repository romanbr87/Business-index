import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import { Document, Head, Main } from "@react-ssr/express";
import List from './List';
import "../../styles/style.css";



export default function HomePage(props) {
    const [error1, setError1] = useState(null)
    const [error2, setError2] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)
    const [list, setList] = useState([]);
    const [types, setTypes] = useState([]);
    const [k, setK] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [search, setSearch] = useState ('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchText: searchText })
        };
        fetch('getBusinessesBySearch', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log (data);
                setList(soryByAtrr(data, "gsx$name"))
                setError1(null)
                setIsLoaded(true)
                setSearch (searchText);
            },
                (currError) => {
                    setTypes(null)
                    setError1(currError)
                    setIsLoaded(false)
                    setSearch ('');
                });
    }

    const refresh = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch('/', requestOptions)
            .then(response => response.json())
            .then(data => {
                setList(soryByAtrr(data.businesses, "gsx$name"));
                setTypes(soryByAtrr(data.types, "gsx$type"))
                setIsLoaded(true)
                setError1(null)
                setError2(null)
                setSearch ('')
                setSearchText ('')
            },
                (currError) => {
                    setTypes(null)
                    setError1(currError)
                    setIsLoaded(false)
                    setSearch ('');
                });
    }

    const soryByAtrr = (arr, attr) => {
        arr = arr.sort((a, b) => {
            let res = a[attr].localeCompare(b[attr])
            return res;
        })
        return arr;
    }

    const filterAlphabeticaly = (l, arr) => { return arr.filter(item => item.gsx$name.charAt(0) === l) }
    const filterByType = (type, arr) => { return arr.filter(item => item.gsx$type === type) }

    const text = "ברוכים הבאים לפיילוט של אינדקס העסקים של נוף הגליל. כאן תוכלו למצוא מידע עדכני ומפורט ככל האפשר על העסקים השונים בנוף הגליל"

    useEffect(() => {
        if (props.err1 || props.err2) {
            setIsLoaded (false);
            setError1 (props.err1);
            setError2 (props.err2);
        }

        else {
            setList(soryByAtrr(props.businesses, "gsx$name"));
            setTypes(soryByAtrr(props.types, "gsx$type"))
            setIsLoaded(true)
        }
    }, [])


    if (error1 || error2) {
        return <div>Error: {error1.message + error2.message } </div>;
    }

    else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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

            <meta name="description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
            <meta name="author" content="https://www.facebook.com/RonenBr60/" />

            <meta property="og:description" content="אינדקס עסקים של נוף הגליל לטובת פרסום עסקים" />
            <meta property="og:url" content="https://romanbr87.github.io/index/index.html" />
            <meta property="og:title" content="אינדקס עסקים" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="אינדקס עסקים" />

            <title>"אינדקס עסקים"</title>
            </Head>
            <nav className="navbar navbar-inverse navbar-fixed-top" style={{ textAlign: 'left' }}>
            <div className="container-fluid pull-right">
                <form className="navbar-form navbar-left" role="search" onSubmit={handleSubmit}>
                    <div className="form-group input-group input-group-sm" style={{ direction: "ltr"}}>
                        <input type="text" className="form-control" placeholder="חיפוש" name="חיפוש" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <div className="input-group-btn" style={{ direction: 'ltr'}}>
                            <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                            <button onClick={refresh} title="רענון הדף" className="btn btn-default" type="button" style={{ margin: "0% 2% 0% 2%" }}><i className="glyphicon glyphicon-refresh"></i></button>
                        </div>
                    </div>
                </form>
            </div>
            </nav>
            
            <div className="container" style={{ marginTop: '0', paddingTop: '0', textAlign: 'right', direction: 'rtl' }}>
                <div className="jumbotron" style={{ padding: '0', borderRadius: '0' }}>
                    <h1 className="title" id="title" style={{ textAlign: 'center', textDecoration: 'underline' }}>אינדקס עסקים</h1>
                    <p>{text}</p>
                </div>

                {
                    (list.length == 0) ? <h1 className="pageTitle">לא נמצאו עסקים</h1> : 
                    <div id="searchUI">
                    חיפוש לפי <select onChange={(e) => setK(e.target.value)}>
                        <option value="0">הצג את כל העסקים ביחד</option>
                        <option value="1">לפי סדר אלפבתי</option>
                        <option value="2">לפי קטגוריות</option>
                    </select>
                    </div>
                }
                <br/>
                {
                    (list.length == 0) ? '' :
                    (k == 0) ? <List key={0} list={list} filterBy={undefined} ua={props.ua} search={search}></List> :
                    (k == 1) ? <List key={1} list={list} filterBy={("אבגדהוזחטיכלמנסעפצקרשת").split('')} filterFunc={filterAlphabeticaly} ua={props.ua} search={search}></List> :
                    (k == 2) ? <List key={2} list={list} filterBy={types.map(t => t.gsx$type)} filterFunc={filterByType} ua={props.ua} search={search}></List> : ''
                }
            </div>
        </React.Fragment>
        )
    }
}
