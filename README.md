# JavaScript Everywhere API

<img src="cover.png" width="200" align="right"/>

This repository contains code examples for the API chapters of [_JavaScript Everywhere_](https://www.jseverywhere.io/) by Adam D. Scott, published by O'Reilly Media

## Getting Help

The best place to get help is our Spectrum channel, [spectrum.chat/jseverywhere](https://spectrum.chat/jseverywhere).

## Directory Structure

- `/src` If you are following along with the book, this is the directory where you should perform your development.
- `/solutions` This directory contains the solutions for each chapter. If you get stuck, these are available for you to consult.
- `/final` This directory contains the final working project

## To Use the Final Project Files

If you're developing a UI and would like to use the completed project, copy the files to the completed files to the `src` as follows:

```sh
cp -rf ./final/* ./src/
```

## Seed Data

To seed data for local development: `npm run seed`. The password for all of the seeded users is `password`.

Each time this command is run, it will generate 10 users and 25 notes.

## Related Repositories

- [Web 💻](https://github.com/javascripteverywhere/web)
- [Mobile 🤳](https://github.com/javascripteverywhere/mobile)
- [Desktop 🖥️](https://github.com/javascripteverywhere/desktop)

## Code of Conduct

In the interest of fostering an open and welcoming environment, I pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation..

This project pledges to follow the [Contributor's Covenant](http://contributor-covenant.org/version/1/4/).

## License

Copyright 2019 Adam D. Scott

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

# NOTES ON BUILDING A WEB APP WITH GRAPHQL

> in order to be able to search for the API data I have to create a specific query in the GraphQL Playground:

First I have to setup my code:

```javascript
// ================================================================= //
// Create Notes:
// ================================================================= //
let notes = [
  {
    id: "1",
    content: "This is a note",
    author: "Adam Scott",
  },
  {
    id: "2",
    content: "This is another note",
    author: "Harlow Everly",
  },
  {
    id: "3",
    content: "Oh hey look, another note!",
    author: "Riley Harrison",
  },
];

// =============================================================== //
// Create a Schema using GraphQL Schema language:
// =============================================================== //
const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    hello: String!
    notes: [Note!]!
    note(id: ID): Note
  }

  type Mutation {
    newNote(content: String!): Note
  }
`;

// =============================================================== //
// Create a resolver function for the schema language
// =============================================================== //
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    notes: () => notes,
    note: (parent, args) => {
      return notes.find((note) => note.id === args.id);
    },
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: "Adam Scott",
      };
      notes.push(noteValue);
      return noteValue;
    },
  },
};
```

Now in order to search for those notes in the graphql playground online in the browser, I have to run a query using the keywords in the prebuilt schema:

```graphql
query {
  notes {
    id
    content
    author
  }
}
```

> That will allow for all of the notes to be rendered. But if I just wanted the content of the notes, I could remove the id and author from that query.

### Updating the GraphQL Query:

> Its time to be able to query specfic notes that the users need. So in order to do that I willl add an argument to the schema. This will allow the user to pass specfic values to the resolvers functions.

- Below I added a note query that takes an argument of id with the type ID. We'll update our `Query` object within our `typeDefs` to the following, which includes the new `note` query:

```javascript
type Query{
    hello: String
    notes: [Note!]!
    note(id:ID!): Note!
}
```

> And this is how you query for a specific ID

```javascript
query {
  note(id:"1") {
    id
    content
    author
  }
}
```

---

#### Creating a new Note using GraphQL Mutations:

To start I will wrap the initial API code by introducing the ability to create a new note using GraphQL's mutations. In that mutation the user will pass in the `notes contents` and for now the `author` will be hard coded.

```javascript
type Mutation {
    newNote(content: String!): Note!
}
```

> Now I need a mutation resolver that will do the following:

1. Take in the note content as an argument
2. store the note as an object; and
3. add it in memory to our notes array

So to do this I will add a mutation object to our resolvers. Within the mutation object I will add a function called newNote() with `parent` and `args` parameters. Within this function, we'll take the argument content and create an object with ID, content, and author keys.

This would match the current schema of a note. NEXT I will then push the object to our notes array and return the object. Returning the object allows GraphQL mutation to receive a response in the intended format.

```javascript
Mutation: {
  newNote: (parent, args) => {
    let noteValue = {
      id: String(notes.length + 1),
      content: args.content,
      author: "CMWolfe",
    };
    notes.push(noteValue);
    return noteValue;
  };
}
```

#### Connecting MongoDB to my App:

Now that we have some decent functionality we can connect to an actual database. So Create a file in `src/` called `db.js`
