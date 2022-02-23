export const GetArticleContent = (styles, content) => {
    return `<!DOCTYPE html>
    <html>
            <head>
                    <meta charset="utf-8">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
                    <link href="https://fonts.googleapis.com/css?family=Montserrat|Oswald|Poly|Radley" rel="stylesheet">
                    <style>
                        ${styles}
                    </style>
            </head>
            <body>
                    ${content}
                    <script>
                            var sendDim = function() {
                                    window.postMessage(JSON.stringify({ height : document.documentElement.scrollHeight }));
                            };
                            setInterval(sendDim, 1000);
                            sendDim();
                    </script>
                    <script>
                            var bindLinks = function() {
                                    Array.prototype.forEach.call(document.querySelectorAll('a:not(.bound)'), function(link) {
                                            link.classList.add('bound');
                                            link.addEventListener('click', function(ev) {
                                                    if (link.classList.contains('lilium-interlink')) {
                                                            window.postMessage(JSON.stringify({ interlink : link.getAttribute('href').toString().substring(1) }));
                                                    } else {
                                                            window.postMessage(JSON.stringify({ link : link.href }));
                                                    }
                                                    ev.preventDefault();
                                                    return false;
                                            });
                                    });
                            };
                            bindLinks();
                            setInterval(bindLinks, 5000);
                    </script>
                    <script async="" defer="" src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 
                    <script async="" defer="" src="https://platform.instagram.com/en_US/embeds.js"></script>
            </body>
    <html>`;
}