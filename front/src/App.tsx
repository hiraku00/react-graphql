import { gql } from "apollo-boost";
import "./App.css";
import { useQuery } from "@apollo/client";

type Book = {
  title: string;
  author: string;
};

type QueryResult = {
  test: Book[];
};

const BOOKS = gql`
  query {
    test {
      title
      author
    }
  }
`;

// console.log(BOOKS);

function Books() {
  const { loading, error, data } = useQuery<QueryResult>(BOOKS);
  if (loading) return <p>ロード中・・・</p>;
  if (error) return <p>エラー</p>;
  if (data) {
    return data.test.map(({ title, author }) => (
      <div key={title}>
        <p>
          {author} : {title}
        </p>
      </div>
    ));
  } else {
    return <p>データがありません</p>
  }
}

function App() {
  return (
    <>
      <div className="App">
        <h2>GraphQL Client</h2>
        <Books />
      </div>
    </>
  );
}

export default App;
