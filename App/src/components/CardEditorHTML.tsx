export const CardEditorHTML = (header='', front='', back='') => {
return `
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable: 1.0, minimum-scale: 0.8, maximum-scale: 2.0" />
    <style>
        html {
            height: 100%
        }

        * {
            outline: 0px;
        }

        ::-webkit-scrollbar {
            display: none;
        }


        #front {
            flex-grow: 1;
        }

        body {
            padding: 10px;
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            height: 100%;
            margin: 0;
        }

    </style>
</head>

<body>
    <div id="header" contenteditable="true" spellcheck="false">${header}</div>
    <div id="front" contenteditable="true" spellcheck="false">${front}</div>
    <div id="back" contenteditable="true" spellcheck="false">${back}</div>
</body>

<script>
    
    const front = document.getElementById('front')
    const back = document.getElementById('back')


    front.addEventListener('input', () => {
        window.ReactNativeWebView.postMessage(front.innerHTML)
        
    })

    back.addEventListener('input', () => {
        window.ReactNativeWebView.postMessage(back.innerHTML)
        
    })

</script>

</html>
`
}

/*

    <div id="back" contenteditable="true" spellcheck="false">Sup</div>



<script>
    
    const observer = new MutationObserver(mutations => {
        window.ReactNativeWebView.postMessage(textEditor.innerHTML)
    })
    observer.observe(textEditor, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
    })
</script>




 */