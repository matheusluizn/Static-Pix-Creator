
# Static Pix Generator Class

This is a Typescript class made to create custom Pix codes.

## Creating a static Pix

To create a static Pix, just import the Pix class from ./Pix.ts and insert the pix properties.

```javascript
  new Pix({
    pixKey: "123e4567-e12b-12d1-a456-426655440000",
    descriptionPayload: "Teste",
    merchantName: "Fulano de Tal",
    merchantCity: "BRASILIA",
    txid: "123",
    amount: 5
  })
```
## Installation

Build the project with npm and tsc

```bash
  npm install 
  npm run build
```
    
## Tech Stack

Typescript and the Node.js native test module
