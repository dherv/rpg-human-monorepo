import './App.css';
import { useGetActivitiesQuery } from './features/api/apiSlice';

function App() {
  const {
    data: activities,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetActivitiesQuery();

  let content;

  if (isLoading) {
    content = <p>isLoading...</p>;
  } else if (isSuccess) {
    content = activities?.map((activity) => (
      <li key={activity.id}>{activity.name}</li>
    ));
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <section className="activities-list">
      <h2>activities</h2>
      {content}
      <button onClick={() => refetch()}>refetch</button>
    </section>
  );
}

export default App;
