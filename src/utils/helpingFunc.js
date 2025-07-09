export const formatToIndianDateTime = (isoDateString) => {
  const date = new Date(isoDateString);

  const optionsDate = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const optionsTime = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString('en-IN', optionsDate); 
  const formattedTime = date.toLocaleTimeString('en-IN', optionsTime); 

  return {
    date: formattedDate,
    time: formattedTime,
  };
};
