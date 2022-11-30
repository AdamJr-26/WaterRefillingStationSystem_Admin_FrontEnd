
function handleError(statusCode) {
  const usertoken = localStorage.getItem("userToken")
  if ([401, 403].includes(statusCode)) {
    console.log("removing userToken")
    localStorage.removeItem("userToken");
    location.reload()
  }
}

export default handleError;
