const events = ({ userId, token }) => {
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/5000/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        filterTodayBirthdays(response.data);
      })
      .catch(
        (error) => {
          console.error("Error fetching users:", error);
        },
        [token]
      );

    const filterTodayBirthdays = (users) => {
      const today = new Date();
      const todayMonth = today.getMonth() + 1;
      const todayDay = today.getDate();

      const birthdaysToday = users.filter((user) => {
        const birthDate = new Date(user.birth_date);
        return (
          birthDate.getMonth() + 1 === todayMonth &&
          birthDate.getDate() === todayDay
        );
      });
      setTodaysBirthdays(birthdaysToday);
    };

    return (
      <div>
        <h2>Today's Birthdays</h2>
        {todaysBirthdays.length > 0 ? (
          todaysBirthdays.map((user) => (
            <div>
              <h3>{user.name}</h3>
              <p>Happy Birthday!</p>
            </div>
          ))
        ) : (
          <p>No Birthday Today</p>
        )}
      </div>
    );
  });
};

export default events;
