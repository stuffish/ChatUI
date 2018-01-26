# chat_ui

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
## Components
### chat-area

>Provide chatting view and the message sender of each chatting.
>### Menu props
>| props  | Introductions | type | default |
>| :------------ | :------------ | :------------ | :------------ |
>| height | Chatting area height. | Number | 300 |
>| contactAvatar | URL of other avartar, display on the left. | String | - |
>| ownerAvatar | URL of own avartar, display on the right. | String | - |
>| oriData | Chat message, once at start time. | Array | [] |
>### Menu events
>| events | Introductions | return |
>| :------------ | :------------ | :------------ |
>| on-avatar-click | Triggered when a avatar is clicked. | Which avatar was clicked (0: own, 1: other). |
>| load-more | Drag to top and get more data. | A function callback contains success status and data. |
>| on-msg-send | Triggered when the message to be sent is ready and the sending button is clicked, the event triggered. | The message of sending. |
>
>When you received a new message, use `this.$bus.emit('new-chat-data', message)`with `vue-bus` on parent to provide the new message to this component.

## chat-cell

> A cell include contact avatar, nickname, last massage and time.
>### Menu props
>| props  | Introductions | type | default |
>| :------------ | :------------ | :------------ | :------------ |
>| avatar | Avartar URL. | String | '' |
>| nickname | Nickname or display name. | String | '' |
>| msg | The last message. | String | '' |
>| time | The sent time of last message. | String | '' |
>| circle-avatar | Display the avatar in circle or not | Boolean | false |

## chat-group
> The contacts list container, each info including other's avatar, the last message of the chat, the last time. Consists of the `chat-cell` component.
>### Menu props
>| props  | Introductions | type | default |
>| :------------ | :------------ | :------------ | :------------ |
>| data | Contacts list data. | Array| [] | 
>#### Menu events
>| events | Introductions | return |
>| :------------ | :------------ | :------------ |
>| click | A item is clicked. | click index, content. |

## chat-dialog
> Alert a dialog in custom.
>### Menu props
>| props  | Introductions | type | default |
>| :------------ | :------------ | :------------ | :------------ |
>| type | Dialog type (text dialog or input dialog). | Number | 0 |
>| show | Dialog display. | Boolean | false |
>| title | Dialog title. | String | false |
>| content | Dialog content | String | '' |
>| positive-btn | Display text on positive button | String | 'Confirm'|
>| negative-btn | Display text on negative button | String | 'Cancel'|
>#### Menu events
>| events | Introductions | return |
>| :------------ | :------------ | :------------ |
>| positive-btn-click | When the positive button is pressed. | content |
>| negative-btn-click | When the nagative button is pressed. | - |

## chat-header
>The top header.
>### Menu props
>| props  | Introductions | type | default |
>| :------------ | :------------ | :------------ | :------------ |
>| height | The height occupied by the header. | Number | 50 |
>| back | Display the back option. | Boolean | true |
>| title | The content of the header. | String | '' |
>| fixed | The position of the header use fixed. | Boolean | false |


## Code Organization
```
├── build                      
├── config           
├── preview                      // project preview image
├── src                          // the source files
│   ├── assets                   // static image resource
│   ├── components        
│   │   ├── chat_area.vue   
│   │   ├── chat_cell.vue   
│   │   ├── chat_dialog.vue        
│   │   ├── chat_group.vue  
│   │   ├── chat_header.vue          
│   ├── pages 
│   │   ├── chat.vue             // view of chat each other
│   │   ├── index.vue            // contact list
│   │   ├── overview.vue         // contact profile view
│   │   ├── page_transition.vue  // page transition animate
│   │   ├── pay.vue              // pay for value-added services
│   │   └── theme.vue            // change theme
│   ├── router
│   │   └── index.js             // vue router setting
│   ├── scripts                  // scripts resource
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
