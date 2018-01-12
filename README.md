# chat_ui

I didn't build the back end of this demo, the analog data at data.json. 

preview:

![image](https://github.com/stuffish/ChatUI/blob/master/preview/preview.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Code Organization

```
├── build                      
├── config           
├── preview                      // project preview image
├── src                          // the source files
│   ├── assets                   // static image resource
│   ├── components        
│   │   ├── a_dialog.vue         // alert dialog component
│   │   ├── a_header.vue         // custom page header    
│   │   ├── chat_cell.vue        // contact list cell
│   │   └── page_transition.vue  // page transition animate components
│   ├── pages                    // all of webpage
│   │   ├── chat.vue             // message sent and chat view
│   │   ├── index.vue            // contact list
│   │   ├── overview.vue         // contact profile view
│   │   ├── pay.vue              // pay for value-added services
│   │   └── theme.vue            // change theme
│   ├── router
│   │   └── index.js             // vue router setting
│   ├── scripts                  // scripts resource (empty temporarily)
│   ├── styles                   // css resource
│   ├── App.vue                  // page entry file
│   └── main.js                  // program entry file, load components
├── .babelrc
├── .gitigore
├── data.json                    // analog data of back end
├── index.html                   // entry html
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
