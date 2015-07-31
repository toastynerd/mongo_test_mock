* MongoDB wire protocol unnoficial doc

** MsgHeader
|offset dec| size    |      purpose        |
|----------|---------|---------------------|
| 0        |4 bytes  |Size of Message(int) |
| 4        |4 bytes  |request ID (int)     |
| 8        |4 bytes  |response ID (int)    |
| 12       |4 bytes  | Op Code (int)       |

** Query
|offset dec           | size              |      purpose         |
| 16                  | 4 bytes           | flags                |
| 20                  | csrting (variable)|  db.collectionName   |
| 20 + cstring size   | 4 bytes           | number to skip       |
| 24 + cstring size   | 4 bytes           | number to return     |
| 28 + cstring size   | document          | query object         |
| optional            | document          | return field selector|


** Reply
|offset dec| size    |      purpose        |
| 16       | 4 bytes |response flags       |
| 20       | 8 bytes | cursor id           |
| 24       | 4 bytes |cursor position      |
| 28       | 4 bytes | number of docs      |
| 32       | the rest| documents           |


* example request/response
client request:
```
```
server response:
```
```