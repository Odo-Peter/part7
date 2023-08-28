import { useNotificationValue } from '../context/BlogContext';

const Notification = () => {
  const message = useNotificationValue();

  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: '#C0C0C0',
        padding: '1px',
        border: `${
          message === 'Ooops ....An ERROR occured'
            ? '1px solid red'
            : '1px solid green'
        }`,
        color: `${message === 'Ooops ....An ERROR occured' ? 'red' : 'green'}`,
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        borderRadius: '5px',
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
