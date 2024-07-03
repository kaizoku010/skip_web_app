function Kingslanding() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {
          TableName: "events" // Replace with your DynamoDB table name
        };
        const data = await dynamoDB.scan(params).promise();
        const eventsData = Array.isArray(data.Items) ? data.Items : [];
        setEvents(eventsData);
        setLoading(false);
        setProgress(100);
      } catch (error) {
        console.error("Error fetching events: ", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    console.log("Events fetched from AWS: ", events);
  }, [events]);

  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom allEvents={events} />
      </div>
    </div>
  );
}

export default Kingslanding;
