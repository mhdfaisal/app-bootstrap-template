var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

//! TODO - Add TypeScript support to API

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
	hello: () => {
		return 'Hello world!';
	},
};

var app = express();
app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.get('/', (req, res, next) => {
	res.json({ api: 'Hello world' });
});

app.listen(3001, () => {
	console.log('Running a GraphQL API server at http://localhost:3001/graphql');
});
