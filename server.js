const {
    OAuth
} = Package['oauth'];

OAuth._checkRedirectUrlOrigin = () => false;
module.exports = {
    setApplicationPrefix(prefix) {
        OAuth._endOfPopupResponseTemplate =
            `
            <html>
                <body>
                    <p id="completedText">
                        Login completed.
                        You will be redirected to Frisbee!
                    </p>
                    <script>
                        var config = JSON.parse(\`##CONFIG##\`);
                        setTimeout(() => {
                            var win = window.open('','_self'); 
                            win.close(); 
                        }, 5000);
                        location.href=\`${prefix}://oauthHandler?credentialToken=\${config.credentialToken}&credentialSecret=\${config.credentialSecret}\`;
                        
                    </script>
                </body>
            </html>
        `
    }
}