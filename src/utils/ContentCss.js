module.exports = `
    p > img {
        width: calc(100% + 40px);
        height: auto;
        margin: 0px -20px;
    }
    body, html {
        margin: 0;
        padding: 0;
        font-family: 'Poly', serif;
        font-size: 15px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
    }
    body > * {
        margin: 0px 15px 15px;
        line-height: 34px;
    }
    body p iframe,
    body iframe {
        width: 100%;
        height : 320px;
    }
    body > twittertweet {
        margin: 0px 0px 20px;
    }
    .lml-instagram-op-3 {
        display: block;
        color: #777;
        text-decoration: none;
        margin-top: 5px;
    }
    h3 {
        display: block;
        margin: 40px 20px 20px 20px;
        font-family: 'Oswald', sans-serif;
        font-weight: normal;
        font-size: 32px;
        line-height: 38px;
    }
    .lml-instagram-avatar-3 {
        display: inline-block;
        vertical-align: middle;
        border-radius: 50px;
        height: 28px;
        width: 28px;
    }
    a {
        color: #FF2634;
    }
    .lml-adplaceholder {
        display: none;
    }
`;
