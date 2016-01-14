function filterCompleted(val) {
  return val.completed;
}

function filterIncompleted(val) {
  return !val.completed; 
}

export default function(value,status) {
  if(status === "completed") {
    return value.filter(filterCompleted);
  } else if( status === "incompleted" ) {
    return value.filter(filterIncompleted);
  } else {
    return value;
  }
}
