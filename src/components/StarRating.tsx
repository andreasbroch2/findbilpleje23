// Generate a star rating component using Google Places API and place name as props
// Use npm dependency cors to allow cross origin requests

export default function StarRating ({ placeName }) {


  const getStarRating = async (placeName) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    var data = await fetch("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=PD Bilpleje&inputtype=textquery&fields=rating%2Cname%2Cformatted_address%2Cuser_ratings_total&key=AIzaSyBGPS-pbI1-xxJCWzEyKhwD6DFRJldwMHg", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    return data;
  };
  var name = '';
  var rating = 0;
  return (
    <div>
        <div>
          <p>{name}</p>
          <p>{rating}</p>
        </div>
    </div>
  );
}